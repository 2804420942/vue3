import {request} from "@/plugins/request";

export const login = (data) => {
  return request({
    method: 'post',
    url: '/api/users/login',
    data
  })
}

export const register = (data) => {
  return request({
    method: 'post',
    url: '/api/users',
    data
  })
}