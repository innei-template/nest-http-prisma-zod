import { Global, Module, Provider } from '@nestjs/common'
import { ThrottlerModule } from '@nestjs/throttler'

import { HttpService } from './helper.http.service'

const providers: Provider<any>[] = [HttpService]

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
