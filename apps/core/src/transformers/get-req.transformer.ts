import { FastifyRequest } from 'fastify'

import { ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/client'

export function getNestExecutionContextRequest(
  context: ExecutionContext,
): FastifyRequest & { owner?: User } & Record<string, any> {
  return context.switchToHttp().getRequest<FastifyRequest>()
}
