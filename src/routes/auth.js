const Joi = require('joi')
const {
  registerAccount,
  loginAccount
} = require('../controllers/auth/authController')

module.exports = [
  {
    method: 'POST',
    path: '/auth/register',
    options: {
      handler: registerAccount,
      description: 'Post Register User',
      tags: ['api'],
      auth: false, // ADD THIS TAG
      validate: {
        payload: Joi.object({
          full_name: Joi.string().required().description('name'),
          password: Joi.string().required().description('password'),
          phone_number: Joi.string(),
          email: Joi.string().required().description('email'),
          auth_type: Joi.string().valid('PERDANA_AUTH', 'GOOGLE_AUTH').default('PERDANA_AUTH').allow(null)
        }),
        failAction: (_, h, error) => {
          return h.response({ success: false, status_code: 400, ...error.details[0] }).code(400).takeover()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/auth/login',
    options: {
      handler: loginAccount,
      description: 'Login User',
      tags: ['api'], // ADD THIS TAG
      auth: false,
      validate: {
        payload: Joi.object({
          email: Joi.string().required().description('email'),
          password: Joi.string().required().description('password'),
          auth_type: Joi.string().valid('PERDANA_AUTH', 'GOOGLE_AUTH').default('PERDANA_AUTH').allow(null)
        }),
        failAction: (_, h, error) => {
          return h.response({ success: false, status_code: 400, ...error.details[0] }).code(400).takeover()
        }
      }
    }
  }
]
