import { Prisma } from '@prisma/client'

import { snowflake } from '../snowflake.util'

export const snowflakeGeneratorMiddleware: Prisma.Middleware = async (
  params,
  next,
) => {
  if (params.action === 'create') {
    // const modelName = params.model
    // 如果模型的名字需要一个 Snowflake ID
    // if (modelName === 'YourModelName') {
    const id = snowflake.nextId()
    // 假设 'id' 是你模型中的 ID 字段
    params.args.data.id = id
    // }
  }
  return next(params)
}
