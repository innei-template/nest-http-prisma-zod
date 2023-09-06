import { Global, Module } from '@nestjs/common'

import { AuthModule } from '../../modules/auth/auth.module'
import { AdminEventsGateway } from './admin/event.gateway'
import { SharedGateway } from './shared/events.gateway'
import { SystemEventsGateway } from './system/event.gateway'
import { WebEventsGateway } from './web/events.gateway'

@Global()
@Module({
  imports: [AuthModule],
  providers: [
    AdminEventsGateway,
    WebEventsGateway,
    SharedGateway,
    SystemEventsGateway,
  ],
  exports: [
    AdminEventsGateway,
    WebEventsGateway,
    SharedGateway,
    SystemEventsGateway,
  ],
})
export class GatewayModule {}
