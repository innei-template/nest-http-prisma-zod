import SocketIO from 'socket.io'

import {
  GatewayMetadata,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets'

import { createAuthGateway } from '../shared/auth.gateway'

const AuthGateway = createAuthGateway({ namespace: 'admin', authway: 'jwt' })
@WebSocketGateway<GatewayMetadata>({ namespace: 'admin' })
export class AdminEventsGateway
  extends AuthGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  handleDisconnect(client: SocketIO.Socket) {
    super.handleDisconnect(client)
  }
}
