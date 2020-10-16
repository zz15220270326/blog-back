// axios
import axios from 'axios'
// baseURL
const baseURL = 'http://localhost:7001/admin/'
// ts-rules
// export functions
export function getAxios<T>(url: string) {
  return new Promise<T>((resolve, reject) => {
    axios.request({
      baseURL,
      url,
      method: 'GET',
    })
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function postAxios<T, S, R>(url: T, params: S) {
  return new Promise<R>((resolve, reject) => {
    axios({
      baseURL,
      url: baseURL + url,
      method: 'POST',
      withCredentials: true,
      data: params
    })
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}