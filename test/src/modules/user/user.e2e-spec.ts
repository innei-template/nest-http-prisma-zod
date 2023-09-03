import { createE2EApp } from 'test/helper/create-e2e-app'

import { UserModule } from '~/modules/user/user.module'

describe('ROUTE /user', () => {
  const proxy = createE2EApp({
    imports: [UserModule],
  })

  it('GET /register', async () => {
    const data = await proxy.app.inject({
      method: 'POST',
      url: '/user/register',
    })
  })
})
