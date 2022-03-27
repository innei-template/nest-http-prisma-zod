import { ApiHideProperty } from '@nestjs/swagger'
import { modelOptions, plugin } from '@typegoose/typegoose'
// import LeanId from 'mongoose-lean-id'
// import { default as mongooseLeanVirtuals } from 'mongoose-lean-virtuals'
import Paginate from 'mongoose-paginate-v2'

// @plugin(mongooseLeanVirtuals)
// @plugin(LeanId)
@plugin(Paginate)
@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: {
      createdAt: 'created',
      updatedAt: false,
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
