
import * as React from 'react'
import { BaseSchemes } from 'rete'
import { BaseAreaPlugin } from 'rete-area-plugin'

import { Position } from '../../types'
import { RenderPreset } from '../types'
import { Pin } from './Pin'
import { PinData, PinsRender } from './types'

type Props = {
  translate?: (id: string, dx: number, dy: number) => void
  contextMenu?: (id: string) => void
  pointerdown?: (id: string) => void
}

/**
 * Preset for rendering pins.
 */
export function setup<Schemes extends BaseSchemes, K extends PinsRender>(props?: Props): RenderPreset<Schemes, K> {
  function renderPins(data: PinData, pointer: () => Position) {
    return <>
      {data.pins.map(pin => (
        <Pin
          {...pin}
          key={pin.id}
          contextMenu={() => {
            props?.contextMenu?.(pin.id)
          }}
          translate={(dx, dy) => {
            props?.translate?.(pin.id, dx, dy)
          }}
          pointerdown={() => {
            props?.pointerdown?.(pin.id)
          }}
          pointer={pointer}
        />
      ))}
    </>
  }

  return {
    render(context, plugin) {
      const data = context.data
      const area = plugin.parentScope<BaseAreaPlugin<Schemes, PinsRender>>(BaseAreaPlugin)

      if (data.type === 'reroute-pins') {
        return renderPins(data.data, () => area.area.pointer)
      }
    }
  }
}
