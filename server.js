const createSSRApp = require('vue').createSSRApp

const renderToString = require('vue/server-renderer').renderToString

const app = createSSRApp({
  template: `
    <div id="app">
      <h1>{{ message }}</h1>
    </div>
  `,
  data(){
    return {
      message: '你好 世界'
    }
  }
})

renderToString(app).then((html) => {
  console.log(html)
})