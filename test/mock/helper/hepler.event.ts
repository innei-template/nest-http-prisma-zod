import { defineProvider } from 'test/helper/defineProvider'

import { EventManagerService } from '~/processors/helper/helper.event.service'

export class MockedEventManagerService {
  constructor() {}

  emit = jest.fn().mockResolvedValue(null)

  event = jest.fn().mockResolvedValue(null)

  get broadcast() {
    return this.emit
  }
}

export const mockedEventManagerServiceProvider = defineProvider({
  provide: EventManagerService,
  useValue: new MockedEventManagerService(),
})
