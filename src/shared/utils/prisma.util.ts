import { Prisma } from '@prisma/client'

export function resourceNotFoundWrapper(desiredErr: Error) {
  return (err: any) => {
    if (err instanceof Prisma.NotFoundError) throw desiredErr
    if (err.code === 'P2025') throw desiredErr

    throw err
  }
}
