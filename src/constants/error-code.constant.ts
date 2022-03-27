export enum ErrorCodeEnum {
  PostNotFoundError = 10000,

  MasterLostError = 20000,
}

export const ErrorCode = Object.freeze<
  Record<ErrorCodeEnum, [string, string, number]>
>({
  [ErrorCodeEnum.PostNotFoundError]: ['post not found', '文章不存在', 404],
  [ErrorCodeEnum.MasterLostError]: ['master lost', '主人不存在', 500],
})
