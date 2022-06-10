import React from 'react'
import { ComponentMeta } from '@storybook/react'

import { Button, Props, ButtonType } from '../components/Button'
import { createStory, meta } from './storybook.helpers'
import styled from 'styled-components'
import { ComponentThemeContext, configureComponentTheme } from '../theme/theme.components'
import { componentTheme } from './storybook.theme'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default meta({
  title: 'Components/Buttons',
  component: Button,
})

const ButtonsContainer = styled.div`
  display: flex;
  button {
    margin: 0 16px;
  }
`
export const Buttons = () => (
  <ComponentThemeContext.Provider value={configureComponentTheme(componentTheme)}>
    <h1>Buttons</h1>
    <ButtonsContainer>
      <Button type={ButtonType.Primary} label="Primary Button" />
      <Button label={'Secondary Button'} type={ButtonType.Secondary} />
      <Button label={'Chromeless Button'} type={ButtonType.Chromeless} />
      <Button label={'Disabled Button'} type={ButtonType.Primary} disabled />
    </ButtonsContainer>
  </ComponentThemeContext.Provider>
)
const story = createStory<Props, typeof Button>(Button)

/* 
export const Primary = story({ label: 'Buttons', type: ButtonType.Primary })
export const Secondary = story({ label: 'Secondary Button', type: ButtonType.Secondary })
export const Chromeless = story({ label: 'Chromeless Button', type: ButtonType.Chromeless })
export const Disabled = story({ label: 'Disabled Button', type: ButtonType.Primary, disabled: true })
*/
