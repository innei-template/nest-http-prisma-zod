import { JWTService } from '@core/processors/helper/helper.jwt.service'
import { Global, Module } from '@nestjs/common'

import { mockedEventManagerServiceProvider } from './helper.event'

@Module({
  providers: [mockedEventManagerServiceProvider, JWTService],
  exports: [mockedEventManagerServiceProvider, JWTService],
})
@Global()
export class MockedHelperModule {}
