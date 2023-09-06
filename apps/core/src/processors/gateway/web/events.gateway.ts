/* eslint-disable @typescript-eslint/no-non-null-assertion */
import SocketIO from 'socket.io'

import { BusinessEvents } from '@core/constants/business-event.constant'
import { RedisKeys } from '@core/constants/cache.constant'
import { CacheService } from '@core/processors/cache/cache.service'
import { getRedisKey } from '@core/shared/utils/redis.util'
import { scheduleManager } from '@core/shared/utils/schedule.util'
import { getShortDate } from '@core/shared/utils/time.util'
import {
  GatewayMetadata,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'

import { BroadcastBaseGateway } from '../base.gateway'

const namespace = 'web'
@WebSocketGateway<GatewayMetadata>({
  namespace,
})
export class WebEventsGateway
  extends BroadcastBaseGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly cacheService: CacheService) {
    super()
  }

  @WebSocketServer()
  private namespace: SocketIO.Namespace

  async sendOnlineNumber() {
    return {
      online: await this.getCurrentClientCount(),
      timestamp: new Date().toISOString(),
    }
  }

  async getCurrentClientCount() {
    const server = this.namespace.server
    const sockets = await server.of(`/${namespace}`).adapter.sockets(new Set())
    return sockets.size
  }
  async handleConnection(socket: SocketIO.Socket) {
    this.broadcast(BusinessEvents.VISITOR_ONLINE, await this.sendOnlineNumber())

    scheduleManager.schedule(async () => {
      const redisClient = this.cacheService.getClient()
      const dateFormat = getShortDate(new Date())

      // get and store max_online_count
      const maxOnlineCount =
        +(await redisClient.hget(
          getRedisKey(RedisKeys.MaxOnlineCount),
          dateFormat,
        ))! || 0
      await redisClient.hset(
        getRedisKey(RedisKeys.MaxOnlineCount),
        dateFormat,
        Math.max(maxOnlineCount, await this.getCurrentClientCount()),
      )
      const key = getRedisKey(RedisKeys.MaxOnlineCount, 'total')

      const totalCount = +(await redisClient.hget(key, dateFormat))! || 0
      await redisClient.hset(key, dateFormat, totalCount + 1)
    })

    super.handleConnect(socket)
  }
  async handleDisconnect(client: SocketIO.Socket) {
    super.handleDisconnect(client)
    this.broadcast(
      BusinessEvents.VISITOR_OFFLINE,
      await this.sendOnlineNumber(),
    )
  }

  override broadcast(event: BusinessEvents, data: any) {
    // TODO
    // const emitter = this.cacheService.emitter
    //
    // emitter
    //   .of(`/${namespace}`)
    //   .emit('message', this.gatewayMessageFormat(event, data))
  }
}
