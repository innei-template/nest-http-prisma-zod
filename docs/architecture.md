## NestJS Architecture

This is project build with [NestJS](https://nestjs.com/), NestJS is high-performance, scalable server framework, it is also an abstract presentation layer on top of the server framework, implementing specific interfaces through adapters, independent of any underlying server framework(e.g. Express, Koa, Fastify, etc.).

In this project, the server framework underlying uses Fastify.

To see other information, or guides, please visit <https://docs.nestjs.com>.

### In File Structure

#### Folder `common`

This directory holds NestJS related components. Such as decorators, filters, guard, etc.

- adaptor: NestJS underlying adapter implementation.
- decorators: hoding decorators.
  - http.decorator.ts: this decorators handles HTTP request, reflect metadata on `handler`, and handle it in interceptors.
- exceptions: hoding custom exceptions.
  - business.exception.ts: business exception, this exception will be serialized in the ResponseInterceptor.
- filters: hoding filters.
  - any-exception.filter.ts: this is a global filter, will catch all exception which throw in NestJS Application lifecycle, and handle exception or serialized send back to user, record error log, or others.
- guards: hoding guards.
- interceptors: hoding interceptors. In NestJS, Interceptor like Koa middleware, you can access and handle incoming request and rearward response. (The onion model)
  - json-serialized.interceptor.ts: serialized final response data structure, will delete `__v` which is mongoose version key. ~~And snakecaseKeys object.(JSON specification)~~
  - logging.interceptor.ts: Logging request and response time and path.
  - response.interceptor.ts: handle response data, based on HTTPDecorators.
- middlewares: hoding middlewares, because of NestJS architecture, generally not used.
- pipes: hoding pipes, for data validation.

#### Folder `constants`

This directory holds constants.

- error-code.constants.ts: define some error code and error message for business exception, these errors are thrown using BusinessException.
- meta.constants.ts: define some meta key.
- path.constants.ts: define path constants.
- system.constants.ts: define NestJS constants, re-export it, help to ts-autocompletion.

#### Folder `global`

This directory holds globals.

What is global, in NodeJS, `global` is a global context object, with the recent advent of zx and unplugin-auto-import, low import is becoming more and more popular.

So we can define some methods or constants on `global`.

Currently, zx/globals, consola, etc. is already defined directly on the `global`, no need to import.

#### Folder `modules`

This directory holds business modules.

#### Folder `processors`

This directory holds other processing modules, e.g. mongodb, redis, logger, etc.

- database: processing mongoose, model register.
- helper: some helper modules. e.g. HTTPService.
- logger: override NestJS built-in logger.

#### Folder `shared`

This directory holds shared data models or interfaces or other. Generally the base data definition. `base.model.ts` `base.xxx.ts`

- dto: Data validation
- interface
- model

#### Folder `utils`

This directory holds utils.
