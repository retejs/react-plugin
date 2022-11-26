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
  items: Item[]
  searchBar?: boolean
  onHide(): void
}
export type ContextMenuRender<Schemes extends BaseSchemes> =
  | { type: 'render', data: RenderData<Schemes> | ContextMenuData }
  | { type: 'rendered', data: RenderData<Schemes> | ContextMenuData }
