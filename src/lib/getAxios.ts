import { Configuration,FileApi, FolderApi } from "@icewhale/icewhale-files-openapi"
import axios from "axios"
import { DefaultApi as SearchApi } from '@icewhale/zimaos-search-openapi'

export  function getHostAndToken() {
    const host = process.env.ZIMAOS_API_BASE
    const token = process.env.ZIMAOS_API_TOKEN
    return { host, token }
}


export function FileAPI(){
    const { host, token } = getHostAndToken()
    const req = axios.create({
        baseURL: `${host}/v2_1/files`,
        headers: {
          'Authorization': token
        }
      })

    const config = new Configuration({})
    const api = new FileApi(config, '/v2/files/', req)
    return api
}

export function FolderAPI(){
  const { host, token } = getHostAndToken()
  const req = axios.create({
      baseURL: `${host}/v2_1/files`,
      headers: {
        'Authorization': token
      }
    })

  const config = new Configuration({})
  const api = new FolderApi(config, '/v2/files/', req)
  return api
}


export function SearchAPI(){
    const { host, token } = getHostAndToken()
    const req = axios.create({
      baseURL: `${host}/v2/search`,
      headers: {
        'Authorization': token
      }
    })
    const config = new Configuration({      })
    const api = new SearchApi(config, '/v2/search', req)
    return api
}