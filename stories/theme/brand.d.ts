import { ComponentThemeConfig } from "../../src/theme/theme.components"
import { FormThemeConfig } from "../../src/theme/theme.form"

export type BrandTheme = {
  brandName: string
  componentTheme: ComponentThemeConfig
  formTheme: FormThemeConfig
  baseStyle: string
}
