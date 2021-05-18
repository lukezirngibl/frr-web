import React, { FC } from 'react'
import styled from 'styled-components'

const ListWrapper = styled.div`
  flex: 0 0 280px;
  flex-shrink: 0;
  overflow: hidden;
  background-color: #f9f9f9;
  max-height: ${window.innerHeight - 200}px;
  border: 1px solid #f0f0f0;
  position: relative;
  display: flex;
  flex-direction: column;
`

const ListContent = styled.div`
  width: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`

const ListItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  height: 32px;
  padding: 0 16px 0 12px;
  border-bottom: 1px solid #f0f0f0;
`

const Name = styled.div`
  font-size: 11px;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Percentage = styled.div`
  font-size: 10px;
  flex: 0 0 48px;
  opacity: 0.4;
  font-weight: 400;
`

const Count = styled.div`
  font-size: 12px;
  flex: 0 0 36px;
  font-weight: bold;
`

const Price = styled.div`
  font-size: 12px;
  flex: 0 0 88px;
  font-weight: bold;
`

type Props = {
  items: Array<{
    name: string | number
    count?: number | string
    percentage?: number | string
    price?: number
    subItems?: Array<{ label: string; count: number }>
  }>
}

export const List = (props: Props) => {
  return (
    <ListWrapper>
      <ListContent>
        {props.items.map((p, k) => (
          <div key={k}>
            <ListItem>
              {p.count !== undefined && <Count>{p.count}</Count>}
              {p.price !== undefined && <Price>${p.price.toLocaleString()}</Price>}
              {p.percentage !== undefined && <Percentage>{p.percentage}%</Percentage>}
              {p.name && <Name>{p.name}</Name>}
            </ListItem>
            {p.subItems &&
              p.subItems.map((i, ik) => (
                <ListItem key={ik} style={{ height: 28, paddingLeft: 48 }}>
                  <Count style={{ fontWeight: 400, opacity: 0.7, fontSize: 11 }}>{i.count}</Count>
                  <Name style={{ fontSize: 10 }}>{i.label}</Name>
                </ListItem>
              ))}
          </div>
        ))}
      </ListContent>
    </ListWrapper>
  )
}
