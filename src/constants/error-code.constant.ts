export enum ErrorCodeEnum {
  PostNotFoundError = 10000,

  AuthFailUserNotExist = 20000,

  UserNotFoundError = 30000,
}

export const ErrorCode = Object.freeze<
  Record<ErrorCodeEnum, [string, string, number]>
>({
  [ErrorCodeEnum.PostNotFoundError]: ['post not found', '文章不存在', 404],
  [ErrorCodeEnum.AuthFailUserNotExist]: [
    'auth failed, user not exist',
    '认证失败，用户不存在',
    400,
  ],
  [ErrorCodeEnum.UserNotFoundError]: ['user not found', '用户不存在', 404],
})
