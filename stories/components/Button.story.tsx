import { Meta } from '@storybook/react'
import React from 'react'
import styled from 'styled-components'
import { Button, ButtonType, Props } from '../../src/components/Button'
import { createStory } from '../storybook.helpers'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<Props> = {
  title: 'Buttons',
  component: Button,
} 
export default meta

const ButtonOverview = () => (
  <List>
    <li className="mb-small"><Button label='Primary Button' type={ButtonType.Primary} /></li>
    <li><Button label='Disabled Primary Button' type={ButtonType.Primary} disabled /></li>
    <li className="mb-small"><Button label='Secondary Button' type={ButtonType.Secondary} /></li>
    <li><Button label='Disabled Secondary Button' type={ButtonType.Secondary} disabled /></li>
    <li className="mb-small"><Button label="Chromeless Button" type={ButtonType.Chromeless} /></li>
    <li><Button label="Disabled Chromeless Button" type={ButtonType.Chromeless} disabled /></li>
  </List>
)

const story = createStory<{}, typeof ButtonOverview>(ButtonOverview)

export const Buttons = story({})


const List = styled.ul`
  list-style: none;

  > li {
    margin-bottom: 64px;

    &.mb-small {
      margin-bottom: 32px;
    }
  }
`
