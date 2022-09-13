const { Model } = require('objection')

class UsersModel extends Model {
  static get tableName () {
    return 'users'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      //   required: ['firstName', 'lastName'],

      properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        password: { type: 'string' },
        full_name: { type: 'string' },
        phone_number: { type: ['string', 'null'] },
        auth_type: { type: 'string' },
        roles_id: { type: 'integer' },
        is_active: { type: 'boolean' }
      }
    }
  }
}

module.exports = UsersModel
