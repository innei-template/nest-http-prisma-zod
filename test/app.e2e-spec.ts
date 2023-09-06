import { AppController } from '@core/app.controller'
import { fastifyApp } from '@core/common/adapter/fastify.adapter'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile()

    app = moduleFixture.createNestApplication(fastifyApp)
    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  it('/ (GET)', () => {
    return app.inject('/').then((res) => {
      expect(res.statusCode).toBe(200)
    })
  })
})
