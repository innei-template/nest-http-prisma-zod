import { beforeEach, describe, expect, it } from 'vitest'

import { Test } from '@nestjs/testing'

import { AuthService } from '~/modules/auth/auth.service'
import { UserService } from '~/modules/user/user.service'
import { CacheService } from '~/processors/cache/cache.service'

describe('/modules/user/user.service', () => {
  let service: UserService
  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: AuthService,
          useValue: {},
        },
        {
          provide: CacheService,
          useValue: {},
        },
      ],
    }).compile()
    await app.init()
    service = app.get(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
