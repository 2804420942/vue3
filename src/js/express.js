const fs = require('fs')
const express = require('express')
const template = require('art-template')

const app = express()

app.get('/', (req, res) => {
  const templateStr = fs.readFileSync('./public/index.html', 'utf-8')

  const html = template.render('hello {{ message }}', {
    message: '世界'
  })
  res.send(html)
})

app.listen(3000, () => {
  console.log('running...')
})