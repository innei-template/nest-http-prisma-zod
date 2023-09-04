import { Global, Module } from '@nestjs/common'

import { DatabaseService } from '~/processors/database/database.service'

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
