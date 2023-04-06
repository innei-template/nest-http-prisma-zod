import { IsBoolean, IsOptional } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'

import { JSONSchemaToggleField } from './configs.jsonschema.decorator'

@JSONSchema({ title: '用户设定' })
export class UserSettingDto {
  @IsOptional()
  @IsBoolean()
  @JSONSchemaToggleField('开放注册')
  canSignUp: boolean
}
