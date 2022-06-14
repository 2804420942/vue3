import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'

export function fetch(url: any, params: any) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export default {
  mockData(url: string, params?: any) {
    return fetch(url, params);
  }
}


