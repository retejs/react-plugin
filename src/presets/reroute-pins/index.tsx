
import * as React from 'react'
import { BaseSchemes } from 'rete'

import { RenderPreset } from '../types'
import { Pin } from './Pin'
import { PinData, PinsRender } from './types'

type Props = {
  translate?: (id: string, dx: number, dy: number) => void
  contextMenu?: (id: string) => void
  pointerdown?: (id: string) => void
}

export function setup<Schemes extends BaseSchemes, K extends PinsRender>(props?: Props): RenderPreset<Schemes, K> {
  function renderPins(data: PinData) {
    return <>
      {data.pins.map(pin => (
        <Pin
          {...pin}
          key={pin.id}
          contextMenu={() => props?.contextMenu && props.contextMenu(pin.id)}
          translate={(dx, dy) => props?.translate && props.translate(pin.id, dx, dy)}
          pointerdown={() => props?.pointerdown && props.pointerdown(pin.id)}
        />
      ))}
    </>
  }

  return {
    render(context) {
      const data = context.data

      if (data.type === 'reroute-pins') {
        return renderPins(data.data)
      }
    }
  }
}
