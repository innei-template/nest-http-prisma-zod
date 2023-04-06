import { IConfig } from './configs.interface'

export const generateDefaultConfig: () => IConfig = () => ({
  userSetting: {
    canSignUp: true,
  },
})
