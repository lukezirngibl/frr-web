const URL = 'https://webservices.post.ch:17023/IN_SYNSYN_EXT/REST/v1/autocomplete4'
const ENCODED_CREDENTIALS = 'VFVfNzI5MzkxNF8wMDAxOmNyZWtoVVlxTE5ZMQ=='

type AddressParams = {
  ZipCode: string
  TownName: string
  StreetName: string
  HouseNo: string
}

export type AddressResponse = {
  Canton: string
  CountryCode: string
  HouseKey: string
  HouseNo: string
  HouseNoAddition: string
  ONRP: string
  STRID: string
  StreetName: string
  TownName: string
  ZipAddition: string
  ZipCode: string
}

type ResponseType = {
  QueryAutoComplete4Result: {
    AutoCompleteResult: Array<AddressResponse>
    Status: number
  }
}

const createBody = (params: AddressParams) => {
  return {
    request: {
      ONRP: 0,
      ZipCode: params.ZipCode,
      ZipAddition: '',
      TownName: params.TownName,
      STRID: 0,
      StreetName: params.StreetName,
      HouseKey: 0,
      HouseNo: params.HouseNo,
      HouseNoAddition: '',
    },
    zipOrderMode: 0,
    zipFilterMode: 0,
  }
}

export const sendRequest = async (params: AddressParams): Promise<ResponseType> => {
  const headers = new Headers()
  headers.append('Authorization', `Basic ${ENCODED_CREDENTIALS}`)
  headers.append('Content-Type', 'application/json')

  const response = await fetch(URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(createBody(params)),
  })
    .then((res) => {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`Address Assistant request failed (${res.status} / ${res.statusText})`)
      }
      return res
    })
    .then((res) => res.json())
    .catch((error) => {
      throw error
    })

  return response
}
