import { AxiosRequestConfig } from 'axios'
import { argv } from 'zx-cjs'

import { parseBooleanishValue } from './constants/parser.utilt'
import { isDev } from './shared/utils/environment.util'
import { machineIdSync } from './shared/utils/machine.util'

export const API_VERSION = 1

console.log(argv)

const { PORT: ENV_PORT, MX_ENCRYPT_KEY } = process.env

export const PORT = argv.port || ENV_PORT || 3333

export const CROSS_DOMAIN = {
  allowedOrigins: [
    'innei.ren',
    'shizuri.net',
    'localhost:9528',
    'localhost:2323',
    '127.0.0.1',
    'mbp.cc',
    'local.innei.test',
    '22333322.xyz',
  ],
  allowedReferer: 'innei.ren',
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

export const CLUSTER = {
  enable: argv.cluster ?? false,
  workers: argv.cluster_workers,
}

const ENCRYPT_KEY = argv.encrypt_key || MX_ENCRYPT_KEY

export const ENCRYPT = {
  key: ENCRYPT_KEY || machineIdSync(),
  enable: parseBooleanishValue(argv.encrypt_enable) ? !!ENCRYPT_KEY : false,
  algorithm: argv.encrypt_algorithm || 'aes-256-ecb',
}
