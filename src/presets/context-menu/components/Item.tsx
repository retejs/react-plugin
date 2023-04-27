import * as React from 'react'
import styled, { css } from 'styled-components'

import { useDebounce } from '../hooks'
import { CommonStyle } from '../styles'
import { Item } from '../types'
import { $width } from '../vars'

const ItemStyle = styled(CommonStyle)<{ hasSubitems?: boolean }>`
    ${props => props.hasSubitems && css`&:after {
    content: '►';
    position: absolute;
    opacity: 0.6;
    right: 5px;
    top: 5px;
    }`}
`

const SubitemStyles = styled.div`
    position: absolute;
    top: 0;
    left: 100%;
    width: ${$width}px;
`

export function ItemElement(props: { onClick(): void, delay: number, hide(): void, subitems?: Item[], children: React.ReactNode }) {
  const [visibleSubitems, setVisibleSubitems] = React.useState(false)
  const setInvisibile = React.useCallback(() => setVisibleSubitems(false), [setVisibleSubitems])
  const [hide, cancelHide] = useDebounce(setInvisibile, props.delay)

  return <ItemStyle
    onClick={e => { e.stopPropagation(); props.onClick(); props.hide() }}
    hasSubitems={Boolean(props.subitems)}
    onPointerOver={() => { cancelHide(); setVisibleSubitems(true) }}
    onPointerLeave={() => hide && hide()}
    data-testid="context-menu-item"
  >
    {props.children}
    {props.subitems && visibleSubitems && (
      <SubitemStyles>
        {props.subitems.map(item => (
          <ItemElement
            key={item.key}
            onClick={item.handler}
            delay={props.delay}
            hide={props.hide}
            subitems={item.subitems}
          >{item.label}</ItemElement>
        ))}
      </SubitemStyles>
    )}
  </ItemStyle>
}
