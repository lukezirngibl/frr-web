import React from 'react'
import styled from 'styled-components'
import { Button, ButtonType } from '../../src/components/Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Buttons',
  component: Button,
}

const ButtonOverview = () => (
  <List>
    <li className="mb-small">
      <Button label="Primary Button" type={ButtonType.Primary} />
    </li>
    <li>
      <Button label="Disabled Primary Button" type={ButtonType.Primary} disabled />
    </li>
    <li className="mb-small">
      <Button label="Secondary Button" type={ButtonType.Secondary} />
    </li>
    <li>
      <Button label="Disabled Secondary Button" type={ButtonType.Secondary} disabled />
    </li>
    <li className="mb-small">
      <Button label="Chromeless Button" type={ButtonType.Chromeless} />
    </li>
    <li>
      <Button label="Disabled Chromeless Button" type={ButtonType.Chromeless} disabled />
    </li>
  </List>
)

export const Buttons = ButtonOverview

const List = styled.ul`
  list-style: none;

  > li {
    margin-bottom: 64px;

    &.mb-small {
      margin-bottom: 32px;
    }
  }
`
