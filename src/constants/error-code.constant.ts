export enum ErrorCodeEnum {
  PostNotFoundError = 10000,
}

export const ErrorCode = Object.freeze({
  [ErrorCodeEnum.PostNotFoundError]: [
    'post not found',
    '文章不存在',
    404,
  ] as const,
} as const)
