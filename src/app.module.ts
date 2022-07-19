import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'

import { AppController } from './app.controller'
import { AllExceptionsFilter } from './common/filters/any-exception.filter'
import { HttpCacheInterceptor } from './common/interceptors/cache.interceptor'
import { JSONTransformerInterceptor } from './common/interceptors/json-transformer.interceptor'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { PostModule } from './modules/post/post.module'
import { CacheModule } from './processors/cache/cache.module'
import { DatabaseModule } from './processors/database/database.module'
import { HelperModule } from './processors/helper/helper.module'
import { LoggerModule } from './processors/logger/logger.module'

@Module({
  imports: [
    CacheModule,
    DatabaseModule,
    HelperModule,
    LoggerModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor, // 3
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: JSONTransformerInterceptor, // 2
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor, // 1
    },

    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
