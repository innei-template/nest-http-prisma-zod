import { Global, Module, Provider } from '@nestjs/common'

const providers: Provider<any>[] = []

@Module({
  imports: [],
  providers: providers,
  exports: providers,
})
@Global()
export class HelperModule {}
