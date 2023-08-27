import { RedisKeys } from '~/constants/cache.constant'

export const getRedisKey = <T extends string = RedisKeys | '*'>(
  key: T,
  ...concatKeys: string[]
): `${'nest'}:${T}${string | ''}` => {
  return `${'nest'}:${key}${
    concatKeys && concatKeys.length ? `:${concatKeys.join('_')}` : ''
  }`
}
