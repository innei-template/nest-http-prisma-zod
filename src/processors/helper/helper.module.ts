import { Provider , Global, Module } from '@nestjs/common'

import { HttpService } from './helper.http.service'

const providers: Provider<any>[] = [HttpService]

@Module({
  imports: [],
  providers,
  exports: providers,
})
@Global()
export class HelperModule {}
