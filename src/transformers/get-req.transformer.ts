import { FastifyRequest } from 'fastify'

import { ExecutionContext } from '@nestjs/common'
import { Prisma } from '@prisma/client'

export function getNestExecutionContextRequest(
  context: ExecutionContext,
): FastifyRequest & { user?: Prisma.UserCreateInput } & Record<string, any> {
  return context.switchToHttp().getRequest<FastifyRequest>()
}
