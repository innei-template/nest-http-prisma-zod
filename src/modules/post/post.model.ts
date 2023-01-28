import { IsNotEmpty, IsString } from 'class-validator'

import { Severity, index, modelOptions, prop } from '@typegoose/typegoose'

import { BaseModel } from '~/shared/model/base.model'

@index({ slug: 1 })
@index({ modified: -1 })
@index({ text: 'text' })
@modelOptions({ options: { customName: 'Post', allowMixed: Severity.ALLOW } })
export class PostModel extends BaseModel {
  @prop({ trim: true, unique: true, required: true })
  @IsString()
  @IsNotEmpty()
  slug: string

  @prop({ trim: true, required: true })
  @IsString()
  text: string

  @prop({ trim: true, required: true })
  @IsString()
  title: string
}
