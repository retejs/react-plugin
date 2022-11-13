import * as React from 'react'

type Init = (ref: HTMLElement) => void

export function RefComponent<Props extends { init: Init, className: string }>(props: Props) {
    return <span className={props.className} ref={ref => {
        if (ref) {
            // console.log('ref', ref)
            props.init(ref)
        }
    }}/>
}
