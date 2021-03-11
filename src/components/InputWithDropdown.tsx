// import React, { useState } from 'react'
// import { Options } from '../util'
// import styled from 'styled-components'

// import { Label, LabelProps } from './Label'
// import { TextInput } from './TextInput'
// import { Dropdown } from './Dropdown'

// const Wrapper = styled.div`
//   display: flex;
//   align-items: center;
//   width: 100%;
// `

// const DropdownWrapper = styled.div`
//   flex: 0 0 96px;
//   margin-right: 8px;
// `

// export type Props = {
//   onChange: (value: string) => void
//   value: string
//   error: boolean
//   options: Options<string>
//   readOnly?: boolean
//   placeholder: string
//   label?: LabelProps
// }

// export const InputWithDropdown = (props: Props) => {
//   const { label, value: externalValue, placeholder } = props

//   const [sliceIndex, setSliceIndex] = React.useState(placeholder.length)

//   const value = {
//     prefix: (externalValue || placeholder).slice(0, sliceIndex),
//     tail: (externalValue || placeholder).slice(
//       sliceIndex,
//       (externalValue || placeholder).length,
//     ),
//   }

//   return (
//     <>
//       {props.label && <Label {...props.label} />}
//       <Wrapper>
//         <DropdownWrapper>
//           <Dropdown
//             readOnly={props.readOnly}
//             options={props.options}
//             value={value.prefix}
//             error={props.error}
//             onChange={v => {
//               setSliceIndex(v.length)
//               props.onChange(`${v}${value.tail}`)
//             }}
//           />
//         </DropdownWrapper>
//         <TextInput
//           readOnly={props.readOnly}
//           value={value.tail}
//           onChange={str => {
//             props.onChange(`${value.prefix}${str}`)
//           }}
//           style={{ wrapper: { flex: 1 } }}
//         />
//       </Wrapper>
//     </>
//   )
// }
