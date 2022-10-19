import { BaseSchemes, Root, Scope } from 'rete'
import { Area2D } from 'rete-area-plugin'

export class ReactRenderPlugin<Scheme extends BaseSchemes> extends Scope<never, Root<Scheme> | Area2D<Scheme>> {
    constructor() {
        super('react-render')
        this.addPipe(payload => {
            if (payload.type === 'render') {
                console.log('nnn', payload)
                const content = payload.data.type === 'node' ? '<b>node</b>' : 'connection'

                payload.data.element.innerHTML = content
            }
            return payload
        })
    }
}

console.log('react')
