import { Global, Module } from '@nestjs/common'

import { mockedEventManagerServiceProvider } from './helper.event'

@Module({
  providers: [mockedEventManagerServiceProvider],
  exports: [mockedEventManagerServiceProvider],
})
@Global()
export class MockedHelperModule {}
