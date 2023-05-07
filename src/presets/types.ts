import { ReactElement } from 'react'
import { BaseSchemes } from 'rete'

import { ReactRenderPlugin } from '..'

export type RenderPreset<Schemes extends BaseSchemes, T> = {
  attach?: (plugin: ReactRenderPlugin<Schemes, T>) => void
  render: (context: Extract<T, { type: 'render' }>, plugin: ReactRenderPlugin<Schemes, T>) => ReactElement | null | undefined
}
