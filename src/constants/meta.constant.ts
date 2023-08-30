import {
  CACHE_KEY_METADATA,
  CACHE_TTL_METADATA,
} from '@nestjs/common/cache/cache.constants'

export const HTTP_CACHE_KEY_METADATA = CACHE_KEY_METADATA
export const HTTP_CACHE_TTL_METADATA = CACHE_TTL_METADATA
export const HTTP_CACHE_DISABLE = 'cache_module:cache_disable'
export const HTTP_REQUEST_TIME = 'http:req_time'

export const HTTP_IDEMPOTENCE_KEY = '__idempotence_key__'
export const HTTP_IDEMPOTENCE_OPTIONS = '__idempotence_options__'
