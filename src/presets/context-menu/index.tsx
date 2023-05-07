
import * as React from 'react'
import { BaseSchemes } from 'rete'

import { RenderPreset } from '../types'
import { Menu } from './components/Menu'
import { ContextMenuRender } from './types'

export function setup<Schemes extends BaseSchemes, K extends ContextMenuRender>(props?: { delay?: number }): RenderPreset<Schemes, K> {
  const delay = typeof props?.delay === 'undefined' ? 1000 : props.delay

  return {
    render(context) {
      if (context.data.type === 'contextmenu') {
        return <Menu
          items={context.data.items}
          delay={delay}
          searchBar={context.data.searchBar}
          onHide={context.data.onHide}
        />
      }
    }
  }
}
