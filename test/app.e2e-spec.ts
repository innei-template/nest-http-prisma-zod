import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import { fastifyApp } from '~/common/adapt/fastify.adapt'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication(fastifyApp)
    await app.init()
  })

  it('/ (GET)', () => {
    return app.inject('/').then((res) => {
      expect(res.statusCode).toBe(200)
    })
  })
})
