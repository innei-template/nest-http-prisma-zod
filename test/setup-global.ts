import { beforeEach } from 'vitest'

import resetDb from './lib/reset-db'

beforeEach(async () => {
  await resetDb()
})
