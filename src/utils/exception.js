const CustomError = require('./error')

class UserNotFoundException extends CustomError {
  constructor () {
    super('User not Found', 'u-id-404', 404)
  }
}
class NotFoundException extends CustomError {
  constructor () {
    super('User not Found', 'u-id-404', 404)
  }
}

module.exports = {
  UserNotFoundException, NotFoundException
}
