import * as ReactDOM from 'react-dom'

export type Renderer = { mount: ReactDOM.Renderer, unmount: (container: HTMLElement) => void }

export function getRenderer(props?: { createRoot?: (container: Element | DocumentFragment) => any }): Renderer {
    const roots = new Map<HTMLElement, any>()
    const createRoot = props?.createRoot
    const mount = createRoot ? ((
        element: React.DOMElement<React.DOMAttributes<any>, any>,
        container: HTMLElement
    ) : Element => {
        if (!roots.has(container) && container) roots.set(container, createRoot(container))
        const root = roots.get(container)

        return root.render(element)
    }) as ReactDOM.Renderer : ReactDOM.render
    const unmount = createRoot ? (container: HTMLElement) => {
        const root = roots.get(container)

        if (root) {
            root.unmount()
            roots.delete(container)
        }
    } : ReactDOM.unmountComponentAtNode

    return {
        mount,
        unmount
    }
}
