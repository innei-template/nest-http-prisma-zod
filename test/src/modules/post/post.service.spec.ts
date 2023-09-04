import { MockedDatabaseModule } from 'test/mock/processors/database/database.module'

import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

import { PostService } from '~/modules/post/post.service'
import { CacheService } from '~/processors/cache/cache.service'
import { EventManagerService } from '~/processors/helper/helper.event.service'

describe('/modules/post/post.service', () => {
  let service: PostService
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: EventManagerService,
          useValue: {
            emit() {},
            event() {},
          },
        },
        {
          provide: CacheService,
          useValue: {},
        },
      ],
      imports: [
        MockedDatabaseModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.test', '.env'],
        }),
      ],
    }).compile()
    await app.init()

    service = app.get<PostService>(PostService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
