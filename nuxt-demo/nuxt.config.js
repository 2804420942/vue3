export default {
  router: {
    base: '/',
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // routes.push({
      //   name: 'custom',
      //   path: '*',
      //   component: resolve(__dirname, 'pages/404.vue')
      // })
      routes.splice(0)
      routes.push(...[{
        path: '/',
        component: resolve(__dirname, 'pages/layout/'),
        children: [
          {
            path: '',
            name: 'home',
            component: resolve(__dirname, 'pages/home/')
          },
          {
            path: '/login',
            name: 'login',
            component: resolve(__dirname, 'pages/login/')
          },
          {
            path: '/register',
            name: 'register',
            component: resolve(__dirname, 'pages/login/')
          },
          {
            path: '/profile/:username',
            name: 'profile',
            component: resolve(__dirname, 'pages/profile/')
          },
          {
            path: '/settings',
            name: 'settings',
            component: resolve(__dirname, 'pages/settings/')
          },
          {
            path: '/editor',
            name: 'editor',
            component: resolve(__dirname, 'pages/editor/')
          },
          {
            path: '/article/:slug',
            name: 'article',
            component: resolve(__dirname, 'pages/article/')
          },
        ]
      }])
    }
  },
  plugins: ['~/plugins/request.js','~/plugins/dayjs.js'],
  modules: [
    '@nuxtjs/axios','@nuxtjs/proxy'
  ],
  axios: {
      proxy: true, // 表示开启代理
      prefix: '/get', // 表示给请求url加个前缀 /api
      credentials: true // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/get': {
      target: 'https://api.jisuapi.com/news/get', 
      changeOrigin: true,
      pathRewrite:{
        '^/news': ''
      }
    }
  }
 
}