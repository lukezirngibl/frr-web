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
