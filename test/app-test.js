const assert = require('assert')
const request = require('supertest')
const td = require('testdouble')

module.exports = {
  beforeEach: (done) => {
    this.subject =  require('../lib/app')
    done()
  },
  afterEach: (done) => {
    this.server.close()
    done()
  },
  'App | Unit |': {
    'Sets default port': (done) => {
      this.server = this.subject()
      assert.equal(this.server.address().port, 3000)
      done()
    },
    'Sets @port': (done) => {
      this.server = this.subject(3333)
      assert.equal(this.server.address().port, 3333)
      done()
    }
  },
  'App | Integration |': {
    'Not found handler': (done) => {
      this.server = this.subject(3333)
      request(this.server).get('/').end((err, res) => {
        assert.equal(res.status, 404)
        assert.equal(res.body.message, 'Not Found')
        done(err)
      })
    },
    'GET /timestamp/:time |': {
      'Invalid param': (done) => {
        this.server = this.subject(3333)
        request(this.server).get('/timestamp/invalid').end((err, res) => {
          assert.equal(res.status, 400)
          assert.equal(res.body.message, 'Bad Request')
          assert.equal(res.body.unix, null)
          assert.equal(res.body.natural, null)
          done(err)
        })
      },
      'Param is unix timestamp': (done) => {
        this.server = this.subject(3333)
        request(this.server).get('/timestamp/1483228800').end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.message, undefined)
          assert.equal(res.body.unix, 1483228800)
          assert.equal(res.body.natural, 'January 1, 2017')
          done(err)
        })
      },
      'Param is date in [MMMM D, YYYY] format': (done) => {
        this.server = this.subject(3333)
        request(this.server).get('/timestamp/January 1, 2017')
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.message, undefined)
          assert.equal(res.body.unix, 1483228800)
          assert.equal(res.body.natural, 'January 1, 2017')
          done(err)
        })
      }
    }
  }
}
