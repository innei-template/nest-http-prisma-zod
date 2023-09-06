export enum ErrorCodeEnum {
  NoContentCanBeModified = 1000,

  PostNotFound = 10000,
  PostExist = 10001,
  CategoryNotFound = 10002,
  CategoryCannotDeleted = 10003,
  CategoryAlreadyExists = 10004,

  AuthFailUserNotExist = 20000,
  AuthFail = 20001,

  UserNotFound = 30000,
  UserExist = 30001,
}

export const ErrorCode = Object.freeze<
  Record<ErrorCodeEnum, [string, string, number]>
>({
  [ErrorCodeEnum.NoContentCanBeModified]: [
    'no content can be modified',
    '没有内容可以被修改',
    400,
  ],
  [ErrorCodeEnum.PostNotFound]: ['post not found', '文章不存在', 404],
  [ErrorCodeEnum.PostExist]: ['post already exist', '文章已存在', 400],
  [ErrorCodeEnum.CategoryNotFound]: ['category not found', '分类不存在', 404],
  [ErrorCodeEnum.CategoryCannotDeleted]: [
    'there are other posts in this category, cannot be deleted',
    '该分类中有其他文章，无法被删除',
    400,
  ],
  [ErrorCodeEnum.CategoryAlreadyExists]: [
    'category already exists',
    '分类已存在',
    400,
  ],
  [ErrorCodeEnum.AuthFailUserNotExist]: [
    'auth failed, user not exist',
    '认证失败，用户不存在',
    400,
  ],
  [ErrorCodeEnum.AuthFail]: [
    'auth failed, please check your username and password',
    '认证失败，请检查用户名和密码',
    400,
  ],
  [ErrorCodeEnum.UserNotFound]: ['user not found', '用户不存在', 404],
  [ErrorCodeEnum.UserExist]: ['user already exist', '用户已存在', 400],
})
