import { BaseSchemes } from 'rete'
import { RenderData } from 'rete-area-plugin'

export type Item = {
  label: string
  key: string
  handler(): void
  subitems?: Item[]
}

export type ContextMenuData = {
  type: 'contextmenu'
  element: HTMLElement
  items: Item[]
  onHide(): void
  searchBar?: boolean
}
export type ContextMenuRender<Schemes extends BaseSchemes> =
  | { type: 'unmount', data: { element: HTMLElement } }
  | { type: 'render', data: RenderData<Schemes> | ContextMenuData }
  | { type: 'rendered', data: RenderData<Schemes> | ContextMenuData }
