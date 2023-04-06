import { Schema } from 'mongoose'

import { Severity, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({
  options: { allowMixed: Severity.ALLOW, customName: 'config' },
  schemaOptions: {
    timestamps: {
      createdAt: false,
      updatedAt: false,
    },
  },
})
export class ConfigModel {
  @prop({ unique: true, required: true })
  name: string

  @prop({ type: Schema.Types.Mixed })
  value: any
}
