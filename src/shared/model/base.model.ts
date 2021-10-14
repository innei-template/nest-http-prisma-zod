import { ApiHideProperty } from '@nestjs/swagger'
import { modelOptions } from '@typegoose/typegoose'
// import LeanId from 'mongoose-lean-id'
// import { default as mongooseLeanVirtuals } from 'mongoose-lean-virtuals'
// import Paginate from 'mongoose-paginate-v2'

// @plugin(mongooseLeanVirtuals)
// @plugin(Paginate)
// @plugin(LeanId)
@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: {
      createdAt: 'created',
      updatedAt: null,
    },
  },
})
export class BaseModel {
  @ApiHideProperty()
  created?: Date

  id?: string

  static get protectedKeys() {
    return ['created', 'id', '_id']
  }
}

export class Paginator {
  /**
   * 总条数
   */
  readonly total: number
  /**
   * 一页多少条
   */
  readonly size: number
  /**
   * 当前页
   */
  readonly currentPage: number
  /**
   * 总页数
   */
  readonly totalPage: number
  readonly hasNextPage: boolean
  readonly hasPrevPage: boolean
}
