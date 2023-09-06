import { PostModule } from '@core/modules/post/post.module'
import { createE2EApp } from '@test/helper/create-e2e-app'

describe('ROUTE /posts', () => {
  const proxy = createE2EApp({
    imports: [PostModule],
  })

  it('GET /posts when nothing', async () => {
    const res = await proxy.app.inject('/posts')
    expect(res.statusCode).toBe(200)
    expect(res.json()).toMatchInlineSnapshot(`
{
  "data": [],
  "pagination": {
    "current_page": 1,
    "has_next_page": false,
    "has_prev_page": false,
    "size": 10,
    "total": 0,
    "total_page": 0,
  },
}
`)
  })
})
