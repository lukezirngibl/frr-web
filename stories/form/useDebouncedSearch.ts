import AwesomeDebouncePromise from 'awesome-debounce-promise'
import { useState } from 'react'
import { AddressResponse, sendRequest } from './AddressAssistant'
import { useDebouncedCallback } from 'use-debounce'

export const useDebouncedSearch = () => {
  const [searchParams, setSearchParams] = useState({
    ZipCode: '',
    TownName: '',
    StreetName: '',
    HouseNo: '',
  })

  const getResult = async (params) => {
    const address = await sendRequest(params)
    return address.QueryAutoComplete4Result.AutoCompleteResult
  }

  const searchAPIDebounced = useDebouncedCallback(getResult, 500)

  const getSuggestions = (params): Promise<Array<AddressResponse>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        getResult(params).then((res: AddressResponse[]) => resolve(res))
      }, 500)
    })
  }

  return {
    searchParams,
    setSearchParams,
    debouncedSearch: getSuggestions,
  }
}
