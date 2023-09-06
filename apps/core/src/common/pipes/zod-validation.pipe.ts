import { createZodValidationPipe } from 'nestjs-zod'
import { ZodError } from 'zod'

import { UnprocessableEntityException } from '@nestjs/common'

export const ZodValidationPipe = createZodValidationPipe({
  createValidationException: (error: ZodError) => {
    const firstError = error.errors[0]
    if ('expected' in firstError) {
      const formatedErrorMessage: string = `Path \`${firstError.path}\` should be \`${firstError.expected}\`, but got \`${firstError.received}\``
      return new UnprocessableEntityException(formatedErrorMessage)
    }

    return new UnprocessableEntityException(
      `\`${firstError.path}\`: ${firstError.message}`,
    )
  },
})
