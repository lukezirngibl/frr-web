import React from 'react'

type FormConfig = {
  disableDirtyValidation: boolean
}

export const useFormConfig = (): FormConfig => {
  const config = React.useContext(FormConfigContext)
  if (!config) {
    throw new Error('Form config not found')
  }

  return config
}

export const FormConfigContext = React.createContext<FormConfig | undefined>(undefined)
FormConfigContext.displayName = 'FormConfigContext'
