import { API_VERSION } from '@core/app.config'
import { isDev, isTest } from '@core/global/env.global'
import { Controller, ControllerOptions } from '@nestjs/common'

export const apiRoutePrefix = isDev || isTest ? '' : `/api/v${API_VERSION}`
export const ApiController: (
  optionOrString?: string | string[] | undefined | ControllerOptions,
) => ReturnType<typeof Controller> = (...rest) => {
  const [controller, ...args] = rest
  if (!controller) {
    return Controller(apiRoutePrefix)
  }

  const transformPath = (path: string) =>
    `${apiRoutePrefix}/${path.replace(/^\/*/, '')}`

  if (typeof controller === 'string') {
    return Controller(transformPath(controller), ...args)
  } else if (Array.isArray(controller)) {
    return Controller(
      controller.map((path) => transformPath(path)),
      ...args,
    )
  } else {
    const path = controller.path || ''

    return Controller(
      Array.isArray(path)
        ? path.map((i) => transformPath(i))
        : transformPath(path),
      ...args,
    )
  }
}
