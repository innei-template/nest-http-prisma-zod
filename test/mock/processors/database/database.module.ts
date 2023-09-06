import { DatabaseService } from '@core/processors/database/database.service'
import { Global, Module } from '@nestjs/common'

import { MockedDatabaseService } from './database.service'

const mockDatabaseService = {
  provide: DatabaseService,
  useClass: MockedDatabaseService,
}
@Module({
  providers: [mockDatabaseService],
  exports: [mockDatabaseService],
})
@Global()
export class MockedDatabaseModule {}
