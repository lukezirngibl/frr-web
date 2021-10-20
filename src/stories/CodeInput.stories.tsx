import React from 'react'
import { ComponentMeta } from '@storybook/react'

import { CodeInput, Props } from '../components/CodeInput'
import { createStory, meta } from './storybook.helpers'
import styled from 'styled-components'
import { ComponentThemeContext, configureComponentTheme } from '../theme/theme.components'
import { componentTheme } from './storybook.theme'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default meta({
  title: 'Components/CodeInput',
  component: CodeInput,
})

const story = createStory<Props, typeof CodeInput>(CodeInput)

export const Primary = story({
  value: 'Test',
  onChange: (value) => console.log(value),
  length: 4,
})

