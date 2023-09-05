import { defineProvider } from 'test/helper/defineProvider'
import { Mock, vi } from 'vitest'

import { EventManagerService } from '~/processors/helper/helper.event.service'

export class MockedEventManagerService {
  constructor() {}

  emit = vi.fn().mockResolvedValue(null) as Mock

  event = vi.fn().mockResolvedValue(null) as Mock

  get broadcast() {
    return this.emit
  }
}

export const mockedEventManagerService = new MockedEventManagerService()

export const mockedEventManagerServiceProvider = defineProvider({
  provide: EventManagerService,
  useValue: mockedEventManagerService,
})
