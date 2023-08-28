import { Global, Module, Provider } from '@nestjs/common'
import { ThrottlerModule } from '@nestjs/throttler'

import { EventManagerService } from './helper.event.service'
import { HttpService } from './helper.http.service'
import { JWTService } from './helper.jwt.service'

const providers: Provider<any>[] = [
  HttpService,
  JWTService,
  EventManagerService,
]

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
  ],
  providers,
  exports: providers,
})
@Global()
export class HelperModule {}
