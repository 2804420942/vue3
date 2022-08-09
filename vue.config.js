const { defineConfig } = require("@vue/cli-service");
// 头部引入
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
    config.plugin('html')
      .tap(args => {
        args[0].title = '练手例子'
        return args
      })
  },
  configureWebpack: {
    resolve: {
      fallback: { 
        path: require.resolve('path-browserify'),
        crypto: false,
        stream: require.resolve("stream-browserify"),
        os: require.resolve("os-browserify/browser")
      },
      
    },
    externals: {
      'markdown-pdf': 'require("markdown-pdf")'
    },
  },
  devServer: {
    proxy: {
      '/news': {
        target: 'https://api.jisuapi.com/news/get', 
        changeOrigin: true,
        pathRewrite:{
          '^/news': ''
        }
      }
    }
  }
});