export const parseBooleanishValue = (value: string | boolean | undefined) => {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') {
    if (value === 'true') return true
    if (value === 'false') return false
  }
  return false
}
