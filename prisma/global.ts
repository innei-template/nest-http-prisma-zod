/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace PrismaJson {
    type ArticleCount = {
      read: number
      like: number
    }
  }
}

export {}
