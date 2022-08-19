import axios from 'axios'


const request = axios.create({
  baseURL: 'https://api.realworld.io'
})

request.interceptors.request.use(function(config) {
  config.headers.Authorization = ``
  return config
}, function(error) {
  return Promise.reject(error)
})

export default request