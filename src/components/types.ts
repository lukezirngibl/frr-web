import { ReactElement, ReactNode } from "react"
import { Translate } from "../translation"

export enum ModalLinkType {
  PDF = 'PDF',
  IFrame = 'Iframe',
}

export type ModalLinkConfig = {
  bearerToken?: string
  downloadButton?: { filename: string }
  onClose?: () => void
  type: ModalLinkType
  url: string
} | null

export type TableColumn<T extends {}> = {
  dataKey: keyof T
  label: string
  labelInfo?: string
  customRender?: (
    value: T[keyof T],
    row: T,
    translate: Translate,
    valueElement?: ReactElement,
  ) => ReactNode
  width: number
  isAmountValue?: boolean
  isHighlightedForSearch?: boolean
  isSortable?: boolean
  valueCustomRender?: (value: T[keyof T], translate: Translate) => ReactElement | undefined
}

export type TableColumns<T extends {}> = Array<TableColumn<T>>
