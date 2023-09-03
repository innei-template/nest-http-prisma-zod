import { omit } from 'lodash'
import snakecaseKeys from 'snakecase-keys'
import { createE2EApp } from 'test/helper/create-e2e-app'
import { mockUserInputData1 } from 'test/mock/data/user.data'

import { UserModule } from '~/modules/user/user.module'
import { UserSchemaSerializeProjection } from '~/modules/user/user.protect'

describe('ROUTE /user', () => {
  const proxy = createE2EApp({
    imports: [UserModule],
  })

  it('GET /register', async () => {
    const data = await proxy.app.inject({
      method: 'POST',
      url: '/user/register',
      body: mockUserInputData1,
    })

    expect(data.statusCode).toBe(201)
    const res = data.json()
    expect(res.password).toBeUndefined()
    expect(res).toMatchObject(
      snakecaseKeys(
        omit(mockUserInputData1, UserSchemaSerializeProjection.keys),
        { deep: true },
      ),
    )
  })
})
