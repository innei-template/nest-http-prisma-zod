import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { CacheModule } from './processors/cache/cache.module'
import { DatabaseModule } from './processors/database/database.module'
import { HelperModule } from './processors/helper/helper.module'
import { LoggerModule } from './processors/logger/logger.module'

@Module({
  imports: [CacheModule, DatabaseModule, HelperModule, LoggerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
