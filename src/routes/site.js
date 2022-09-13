const { getLayananList } = require('../controllers/site/siteController')

module.exports = [
  {
    method: 'GET',
    path: '/home/layanan',
    options: {
      handler: getLayananList,
      description: 'Get Layanan Home',
      tags: ['api'],
      // auth: false, // ADD THIS TAG
      validate: {
        failAction: (_, h, error) => {
          return h.response({ success: false, status_code: 400, ...error.details[0] }).code(400).takeover()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/',
    options: {
      handler: (request, h) => {
        return 'hello im backend'
      },
      description: 'Get Layanan Home',
      tags: ['api'],
      auth: false, // ADD THIS TAG
      validate: {
        failAction: (_, h, error) => {
          return h.response({ success: false, status_code: 400, ...error.details[0] }).code(400).takeover()
        }
      }
    }
  }
]
