import { Meta } from '@storybook/react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { SearchDropdown } from '../../src/components/SearchDropdown'
import { OptionType } from '../../src/html'
import ReactSelect from 'react-select'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SearchDropdown> = {
  title: 'Components/Search Dropdown',
  component: SearchDropdown,
}
export default meta

const getOptionsAsync = (): Promise<OptionType<string>[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          value: 'cat',
          label: 'Cat',
          isLabelTranslated: true,
        },
        {
          value: 'elephant',
          label: 'Elephant',
          isLabelTranslated: true,
        },
        {
          value: 'tiger',
          label: 'Tiger',
          isLabelTranslated: true,
        },
        {
          value: 'teddybear',
          label: 'Teddy Bear',
          isLabelTranslated: true,
        },
      ])
    }, 1000)
  })

export const SearchDropdownField = () => {
  const [options, setOptions] = React.useState<OptionType<string>[]>([])
  const [value, setValue] = useState<string | null>(null)

  console.log('VALUE', { value })
  return (
    <div>
      <SearchDropdown
        options={options}
        onSearch={() => getOptionsAsync().then(setOptions)}
        onChange={(value) => setValue(value)}
        value={value}
      />
      {/* <ReactSelect
        isClearable
        onInputChange={() => { getOptionsAsync().then(setOptions) }}
        onChange={setValue}
        options={options}
        value={value}
        getOptionLabel={(option) => option.label!}
        getOptionValue={(option) => option.value}
      /> */}
    </div>
  )
}
SearchDropdownField.storyName = 'Search Dropdown'

const List = styled.ul`
  list-style: none;
  padding: 0;

  > li {
    margin-bottom: 64px;

    &.mb-small {
      margin-bottom: 32px;
    }
  }
`
