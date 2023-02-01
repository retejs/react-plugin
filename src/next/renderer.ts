import * as ReactDOM from 'react-dom'

export type Renderer = { mount: ReactDOM.Renderer, unmount: (container: HTMLElement) => void }

type CreateRoot = (container: Element | DocumentFragment) => any

export function getRenderer(props?: { createRoot?: CreateRoot }): Renderer {
    const createRoot = props?.createRoot

    if (createRoot) {
        const roots = new Map<HTMLElement, any>()

        return {
            mount: ((
                element: React.DOMElement<React.DOMAttributes<any>, any>,
                container: HTMLElement
            ) : Element => {
                if (container.children.length === 0) container.appendChild(document.createElement('div'))
                const child = container.children.item(0)
                if (!roots.has(container) && child) {
                    roots.set(container, createRoot(child))
                }
                const root = roots.get(container)

                return root.render(element)
            }) as ReactDOM.Renderer,
            unmount: (container: HTMLElement) => {
                const root = roots.get(container)

                if (root) {
                    root.unmount()
                    roots.delete(container)
                }
            }
        }
    }

    return {
        mount: ReactDOM.render,
        unmount: ReactDOM.unmountComponentAtNode
    }
}
