import { PrismaClientExceptionFilter } from 'nestjs-prisma'
import { ZodSerializerInterceptor } from 'nestjs-zod'

import { Module, Type } from '@nestjs/common'
import {
  APP_FILTER,
  APP_GUARD,
  APP_INTERCEPTOR,
  APP_PIPE,
  HttpAdapterHost,
} from '@nestjs/core'
import { ThrottlerGuard } from '@nestjs/throttler'

import { AppController } from './app.controller'
import { AllExceptionsFilter } from './common/filters/all-exception.filter'
import { HttpCacheInterceptor } from './common/interceptors/cache.interceptor'
import { JSONTransformerInterceptor } from './common/interceptors/json-transformer.interceptor'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { ZodValidationPipe } from './common/pipes/zod-validation.pipe'
import { ConfigsModule } from './modules/configs/configs.module'
import { PostModule } from './modules/post/post.module'
import { CacheModule } from './processors/cache/cache.module'
import { DatabaseModule } from './processors/database/database.module'
import { HelperModule } from './processors/helper/helper.module'
import { LoggerModule } from './processors/logger/logger.module'

// Request ----->
// Response <-----
const appInterceptors: Type<any>[] = [
  HttpCacheInterceptor,
  JSONTransformerInterceptor,

  ResponseInterceptor,
  ZodSerializerInterceptor,
]
@Module({
  imports: [
    CacheModule,
    DatabaseModule,
    HelperModule,
    ConfigsModule,
    LoggerModule,

    PostModule,
  ],
  controllers: [AppController],
  providers: [
    ...appInterceptors.map((interceptor) => ({
      provide: APP_INTERCEPTOR,
      useClass: interceptor,
    })),

    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },

    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },

    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter)
      },
      inject: [HttpAdapterHost],
    },

    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
