import React from 'react'
import styled from 'styled-components'
import { Button, ButtonType, Props } from '../../src/components/Button'
import { createStory, meta } from '../storybook.helpers'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default meta<Props, typeof Button>({
  title: 'Components/Button',
  component: Button,
})

const story = createStory<Props, typeof Button>(Button)

const Primary = story({ label: 'Primary Button', type: ButtonType.Primary })
const PrimaryDisabled = story({ label: 'Disabled Button', type: ButtonType.Primary, disabled: true })
const Secondary = story({ label: 'Secondary Button', type: ButtonType.Secondary })
const SecondaryDisabled = story({ label: 'Disabled Button', type: ButtonType.Secondary, disabled: true })
const Chromeless = story({ label: 'Chromeless Button', type: ButtonType.Chromeless })
const ChromelessDisabled = story({
  label: 'Chromeless Button',
  type: ButtonType.Chromeless,
  disabled: true,
})

export const ButtonOverview = () => (
  <List>
    <li className="mb-small">{Primary}</li>
    <li>{PrimaryDisabled}</li>
    <li className="mb-small">{Secondary}</li>
    <li>{SecondaryDisabled}</li>
    <li className="mb-small">{Chromeless}</li>
    <li>{ChromelessDisabled}</li>
  </List>
)

const List = styled.ul`
  list-style: none;

  > li {
    margin-bottom: 64px;

    &.mb-small {
      margin-bottom: 32px;
    }
  }
`
