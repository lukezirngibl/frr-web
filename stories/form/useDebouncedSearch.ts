import AwesomeDebouncePromise from 'awesome-debounce-promise'
import { useState } from 'react'
import { sendRequest } from './AddressAssistant'

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

  const searchAPIDebounced = AwesomeDebouncePromise(getResult, 500)

  return {
    searchParams,
    setSearchParams,
    debouncedSearch: getResult,
  }
}
