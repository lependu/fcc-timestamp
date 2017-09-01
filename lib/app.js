const express = require('express')
const bodyParser = require('body-parser')
const timestamp = require('./timestamp')
const notFound = require('./not-found')
const errorHandler = require('./error-handler')

const { json } = bodyParser
/**
 * @module App
 *
 * Sets up Express application.
 *
 * @param {Number} port Application port
 *
 * @return {Object} HTTP server
 *
 * @public
**/
module.exports = (port) => {
  let app = express()
  app.use(json())
  app.use('/timestamp/:timeParam', timestamp)
  app.use(notFound())
  app.use(errorHandler())
  return app.listen(port || 3000)
}
