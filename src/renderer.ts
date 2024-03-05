import * as ReactDOM from 'react-dom'

export type Renderer = { mount: ReactDOM.Renderer, unmount: (container: HTMLElement) => void }

export interface Root {
  render(children: React.ReactElement): void;
  unmount(): void;
}
export type CreateRoot = (container: Element | DocumentFragment) => Root

export function getRenderer(props?: { createRoot?: CreateRoot }): Renderer {
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

        return root.render(element)
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
