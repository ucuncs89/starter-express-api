class CustomError extends Error {
  constructor (message, errorCode, statusCode) {
    super(message)
    this.message = message
    this.errorCode = errorCode
    this.statusCode = statusCode
  }
}

module.exports = CustomError
