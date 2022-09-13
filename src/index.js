'use strict'
require('dotenv').config()
const Hapi = require('@hapi/hapi')
const routes = require('./routes')
const Knex = require('knex')
const knexConfig = require('../knexfile')
// const Jwt = require('@hapi/jwt')

const { Model } = require('objection')

const knex = Knex(knexConfig)
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')
const Pack = require('../package')
const UsersModel = require('./models/users/UsersModel')

Model.knex(knex)
const init = async () => {
  const server = Hapi.server({
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || 8080
  })
  await server.register(require('hapi-auth-jwt2'))
  const validate = async function (decoded, request, h) {
    // do your checks to see if the person is valid
    if (!decoded.id) {
      return { isValid: false }
    } else {
      const user = await UsersModel.query().findOne({ id: decoded.id })
      if (!user) {
        return { isValid: false }
      }
      return { isValid: true, user }
    }
  }
  server.auth.strategy('jwt', 'jwt',
    {
      key: process.env.JWT_SECRET_KEY, // Never Share your secret key
      validate // validate function defined above
    })
  server.auth.default('jwt')
  // await server.register(Jwt)

  // Set the strategy

  // server.auth.default('my_jwt_strategy')
  const swaggerOptions = {
    info: {
      title: 'My Backend',
      version: Pack.version
    },
    documentationPath: '/docs',
    securityDefinitions: {
      jwt: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        'x-keyPrefix': 'Bearer '
      }
    },
    security: [{ jwt: [] }]
  }
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])

  server.route(routes)

  await server.start()
  console.log('Server running on %s', server.info.uri)
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
