import { createElement } from 'react'
import * as ReactDOM from 'react-dom'
import { StyleSheetManager } from 'styled-components'

export type Renderer = { mount: ReactDOM.Renderer, unmount: (container: HTMLElement) => void }

export interface Root {
  render(children: React.ReactElement): void;
  unmount(): void;
}
export type CreateRoot = (container: Element | DocumentFragment) => Root

export interface BaseRendererProps {
  createRoot?: CreateRoot;
}
export interface RendererPropsWithLocalStyles
  extends Omit<BaseRendererProps, 'createRoot'>, Required<Pick<BaseRendererProps, 'createRoot'>>
{
  localStyles: boolean;
}
function hasLocalStyles(props?: Partial<RendererPropsWithLocalStyles>): props is RendererPropsWithLocalStyles {
  return props?.localStyles === true && !!props.createRoot
}
export type RendererProps = BaseRendererProps | RendererPropsWithLocalStyles

export function getRenderer(props?: RendererProps): Renderer {
  const createRoot = props?.createRoot
  const wrappers = new WeakMap<HTMLElement, HTMLElement>()

  function getWrapper(container: HTMLElement) {
    const wrapper = wrappers.get(container)

    if (wrapper) return wrapper

    const span = document.createElement('span')

    container.appendChild(span)
    return wrappers.set(container, span).get(container) as HTMLElement
  }
  function removeWrapper(container: HTMLElement) {
    const wrapper = wrappers.get(container)

    if (wrapper) wrapper.remove()
    wrappers.delete(container)
  }

  if (createRoot) {
    const roots = new WeakMap<HTMLElement, Root>()

    return {
      mount: ((
        element: React.DOMElement<React.DOMAttributes<unknown>, Element>,
        container: HTMLElement
      ) => {
        const wrapper = getWrapper(container)
        const root = roots.get(wrapper) || createRoot(wrapper)

        if (!roots.has(wrapper)) {
          roots.set(wrapper, root)
        }

        if (!hasLocalStyles(props)) {
          return root.render(element)
        }

        const elementWithStyleTarget = createElement(StyleSheetManager, { target: container }, element)

        return root.render(elementWithStyleTarget)
      }) as ReactDOM.Renderer,
      unmount: (container: HTMLElement) => {
        const wrapper = getWrapper(container)
        const root = roots.get(wrapper)

        if (root) {
          root.unmount()
          roots.delete(wrapper)
          removeWrapper(container)
        }
      }
    }
  }

  return {
    mount: ((element: React.DOMElement<React.DOMAttributes<unknown>, Element>, container: HTMLElement): Element => {
      return ReactDOM.render(element, getWrapper(container))
    }) as ReactDOM.Renderer,
    unmount: (container: HTMLElement) => {
      ReactDOM.unmountComponentAtNode(getWrapper(container))
      removeWrapper(container)
    }
  }
}
