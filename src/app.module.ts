import { PrismaClientExceptionFilter } from 'nestjs-prisma'

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
import { IdempotenceInterceptor } from './common/interceptors/idempotence.interceptor'
import { JSONTransformerInterceptor } from './common/interceptors/json-transformer.interceptor'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { ZodValidationPipe } from './common/pipes/zod-validation.pipe'
import { CategoryModule } from './modules/category/category.module'
import { PostModule } from './modules/post/post.module'
import { UserModule } from './modules/user/user.module'
import { CacheModule } from './processors/cache/cache.module'
import { DatabaseModule } from './processors/database/database.module'
import { GatewayModule } from './processors/gateway/gateway.module'
import { HelperModule } from './processors/helper/helper.module'
import { LoggerModule } from './processors/logger/logger.module'

// Request ----->
// Response <-----
const appInterceptors: Type<any>[] = [
  IdempotenceInterceptor,
  HttpCacheInterceptor,
  JSONTransformerInterceptor,

  ResponseInterceptor,
]
@Module({
  imports: [
    // processors
    CacheModule,
    DatabaseModule,
    HelperModule,
    LoggerModule,
    GatewayModule,

    // BIZ
    PostModule,
    UserModule,
    CategoryModule,
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
