exports.responseSuccess = (h, message, data, code) => {
  const responseMessage = {}
  responseMessage.success = true
  responseMessage.message = message
  responseMessage.status_code = code
  responseMessage.error_code = null

  if (data) {
    responseMessage.data = data
  }

  return h.response(responseMessage).code(code || 200)
}

exports.responseFailed = (h, error, errorCode, statusCode) => {
  // console.log(error)
  statusCode = statusCode || 400
  const responseMessage = {}
  responseMessage.success = false
  responseMessage.message = error.message || 'error trx'
  responseMessage.status_code = error.statusCode || 400
  responseMessage.error_code = errorCode

  return h.response(responseMessage).code(statusCode || 400)
}
