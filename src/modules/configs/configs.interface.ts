import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'

import { UserSettingDto } from './configs.dto'

@JSONSchema({
  title: '设置',
})
export abstract class IConfig {
  @ValidateNested()
  @Type(() => UserSettingDto)
  userSetting: UserSettingDto
}

export type IConfigKeys = keyof IConfig
