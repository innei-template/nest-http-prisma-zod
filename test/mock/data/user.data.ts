import { UserRegisterDto } from '@core/modules/user/dtos/register.dto'
import { snowflake } from '@core/processors/database/snowflake.util'

export const generateMockUser = (): UserRegisterDto => {
  return {
    username: `mockUser_${snowflake.nextId()}`,
    name: `Mock User${snowflake.nextId()}`,
    introduce: 'Hello, I am a mock user for testing.',
    avatar: 'https://example.com/avatar.jpg',
    password: 'mockPassword123',
    mail: 'mockuser@example.com',
    url: 'https://example.com/mockuser',
    socialIds: {
      facebook: 'mockFbId',
      twitter: 'mockTwitterId',
    },
  }
}

const mockUserInputData1 = generateMockUser()

export { mockUserInputData1 }
