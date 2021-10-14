import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { CacheModule } from './processors/cache/cache.module'
import { DbModule } from './processors/database/database.module'
import { HelperModule } from './processors/helper/helper.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env.development.local',
        '.env.development',
        '.env.production.local',
        '.env.production',
        '.env',
      ],
      isGlobal: true,
    }),
    CacheModule,
    DbModule,
    HelperModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
