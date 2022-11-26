import * as React from 'react'
import styled from 'styled-components'

import { useDebounce } from '../hooks'
import { CommonStyle } from '../styles'
import { Item } from '../types'
import { $width } from '../vars'
import { ItemElement } from './Item'
import { Search } from './Search'

const Styles = styled.div`
  padding: 10px;
  width: ${$width}px;
  margin-top: -20px;
  margin-left: -${$width/2}px;
`

export function Menu(props: { items: Item[], delay: number, searchBar?: boolean, onHide(): void }) {
    const [hide, cancelHide] = useDebounce(props.onHide, props.delay)
    const [filter, setFilter] = React.useState('')
    const filterRegexp = new RegExp(filter, 'i')
    const filteredList = props.items.filter(item => (
        item.label.match(filterRegexp)
    ))

    return <Styles
        onMouseOver={() => cancelHide()}
        onMouseLeave={() => hide && hide()}
        onWheel={e => e.stopPropagation()}
    >
        {props.searchBar && (
            <CommonStyle>
                <Search value={filter} onChange={setFilter} />
            </CommonStyle>
        )}
        {filteredList.map(item => {
            return <ItemElement
                key={item.key}
                onClick={item.handler}
                delay={props.delay}
                hide={props.onHide}
                subitems={item.subitems}
            >
                {item.label}
            </ItemElement>
        })}
    </Styles>
}
