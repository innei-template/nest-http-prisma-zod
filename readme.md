# Nest Http Template

A best practice for using Prisma + Postgres, Socket.IO (Guest or authentication required) and Zod data validation. And it covers unit testing and integration testing.

![](https://github.com/Innei/nest-http-prisma-zod/assets/41265413/beb9fac0-19c8-448f-ac28-9299765ed899)

## Which Tech Stack In Use

- Framework: NestJS (Based on Fastify)
- Language: TypeScript (Best practices, Not AnyScript)
- Database ODM: Prisma (Fully type-safe schema and query)
- Data Validation: Zod
- Testing: Vitest
- Package Manager: pnpm
- DevOps: Docker
- Other: Monorepo, Prettier, ESLint, Husky, Bump Version, etc.

## Run in docker compose

```sh
docker build . -t innei/nest-http-prisma-zod
docker compose up
```

## How to start development

```bash
pnpm run init # first time
npm run dev
```

**Before you start dev, do not forget copy `.env.template` to `.env`**

## Using this template for your own project

Just tap the `Fork` button.

### Write an service unit test

### Write an route integration test

## TODO

- [ ] Custom Logger without consola
- [x] Prisma pagination implementation
- [x] Fully testing unit and e2e
- [ ] Data caching and API caching without cache-manager

## License

2023 © Innei, Released under the MIT License.

> [Personal Website](https://innei.in/) · GitHub [@Innei](https://github.com/innei/)
