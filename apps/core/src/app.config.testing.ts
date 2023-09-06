import { AxiosRequestConfig } from 'axios'
import { argv } from 'zx-cjs'

import { isDev } from './shared/utils/environment.util'

console.log(argv)
export const PORT = argv.port || 3333
export const CROSS_DOMAIN = {
  allowedOrigins: [
    'innei.in',
    'shizuri.net',
    'localhost:9528',
    'localhost:2323',
    '127.0.0.1',
    'mbp.cc',
    'local.innei.test',
    '22333322.xyz',
  ],
  allowedReferer: 'innei.in',
}

export const REDIS = {
  host: argv.redis_host || 'localhost',
  port: argv.redis_port || 6379,
  password: argv.redis_password || null,
  ttl: null,
  httpCacheTTL: 5,
  max: 5,
  disableApiCache:
    (isDev || argv.disable_cache) && !process.env['ENABLE_CACHE_DEBUG'],
}
export const SECURITY = {
  jwtSecret: argv.jwtSecret || 'asjhczxiucipoiopiqm2376',
  jwtExpire: '7d',
}

export const AXIOS_CONFIG: AxiosRequestConfig = {
  timeout: 10000,
}
