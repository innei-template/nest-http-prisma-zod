import { z } from 'zod'

export function makeOptionalPropsNullable<Schema extends z.AnyZodObject>(
  schema: Schema,
) {
  const entries = Object.entries(schema.shape) as [
    keyof Schema['shape'],
    z.ZodTypeAny,
  ][]
  const newProps = entries.reduce(
    (acc, [key, value]) => {
      acc[key] =
        value instanceof z.ZodOptional ? value.unwrap().nullable() : value
      return acc
    },
    {} as {
      [key in keyof Schema['shape']]: Schema['shape'][key] extends z.ZodOptional<
        infer T
      >
        ? z.ZodOptional<T>
        : Schema['shape'][key]
    },
  )
  return z.object(newProps)
}
