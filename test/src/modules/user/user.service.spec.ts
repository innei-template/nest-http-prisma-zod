import { UserService } from '@core/modules/user/user.service'
import { createServiceUnitTestApp } from '@test/helper/create-service-unit'
import { prisma } from '@test/lib/prisma'
import { mockUserInputData1 } from '@test/mock/data/user.data'
import { authProvider } from '@test/mock/modules/auth.mock'

describe('/modules/user/user.service', () => {
  const proxy = createServiceUnitTestApp(UserService, {
    providers: [authProvider],
  })

  it('should register user successfully', async () => {
    const userModel = mockUserInputData1
    await proxy.service.register(userModel)

    const user = await prisma.user.findUnique({
      where: {
        username: userModel.username,
      },
    })

    expect(user).toBeDefined()
    expect(user?.username).toBe(userModel.username)
  })

  it('should throw if existed', async () => {
    const userModel = mockUserInputData1
    await proxy.service.register(userModel)

    await expect(proxy.service.register(userModel)).rejects.toThrowError()
  })

  it('should patch user successfully', async () => {
    const userModel = mockUserInputData1
    await proxy.service.register(userModel)
    const user = await prisma.user.findFirstOrThrow()
    await proxy.service.patchUserData(user.id, {
      name: 'test',
    })

    const updatedUser = await prisma.user.findFirstOrThrow()
    expect(updatedUser.name).toBe('test')
    expect(updatedUser.id).toBe(user.id)
  })
})
