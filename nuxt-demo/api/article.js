import {request} from '@/plugins/request'

export const getArticles = params => {
  return request({
    method: 'get',
    url: '/api/articles',
    params
  })
}

export const getFeedArticles = params => {
  return request({
    method: 'get',
    url: '/api/articles/feed',
    params
  })
}

export const addFavorite = slug => {
  return request({
    method: 'post',
    url: `/api/articles/${slug}/favorite`,
  })
}

export const delFavorite = slug => {
  return request({
    method: 'delete',
    url: `/api/articles/${slug}/favorite`,
  })
}

export const getArticle = slug => {
  return request({
    method: 'get',
    url: `/api/articles/${slug}`,
  })
}

export const getComments = slug => {
  return request({
    method: 'get',
    url: `/api/articles/${slug}/comments`,
  })
}