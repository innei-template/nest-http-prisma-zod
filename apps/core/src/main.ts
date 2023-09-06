#!env node
import { name } from '../package.json'
import { register } from './global/index.global'

process.title = `${name}(${process.env.NODE_ENV || 'unknown'})`
async function main() {
  register()
  const [{ bootstrap }] = await Promise.all([import('./bootstrap')])
  bootstrap()
}

main()
