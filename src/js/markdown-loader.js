const marked = require('marked')

const md = require('./md/[4415] 01  项目基石：前端脚手架工具探秘.md')

const transform = source => {
  const html = marked(source)
  const code = `${JSON.stringify(html)}`
  return code
}

console.log(transform(md))


module.exports = transform