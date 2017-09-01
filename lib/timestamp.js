const moment = require('moment')

/**
 * @module Timestamp
 *
 * Converts between unix timestamp and [MMMM D, YYYY] formatted date
 *
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 * @param {Function} next Express callback
 *
 * @return {Function}
 *
 * @public
**/
module.exports = (req, res) => {
  let input = req.params.timeParam
  let date = moment.utc(input, ['MMMM D, YYYY', 'X'])

  if (!date.isValid()) {
    res.status(400).send({
      message: 'Bad Request',
      natural: null,
      unix: null
    }).end()
  } else {
    res.send({
      natural: date.format('MMMM D, YYYY'),
      unix: date.format('X')
    })
  }
}
