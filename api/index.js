const express = require('express')
const app = express()

app.post('/track-data', (req, res) => {
  return res.status(200).json({ message: 'Success !' })
})


module.exports = {
  path: '/api',
  handler: app
}
