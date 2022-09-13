const { loginPerdanaAuth } = require('../../services/auth/loginService')
const { createRegisterAccount } = require('../../services/auth/registerService')
const { responseSuccess, responseFailed } = require('../../utils/response')

exports.registerAccount = async (request, h) => {
  try {
    // const arr = ['a', 'b', 'c', 'd']
    const result = await createRegisterAccount({ ...request.payload })
    return responseSuccess(h, 'Register Sucessfully', result, 201)
  } catch (error) {
    console.log(error)
    return responseFailed(h, error, error.errorCode, error.statusCode)
  }
}

exports.loginAccount = async (request, h) => {
  try {
    const payload = request.payload
    if (payload.auth_type === 'GOOGLE_AUTH') {
      return responseSuccess(h, 'Ini Login GOOGLE', request.payload, 201)
    }
    const result = await loginPerdanaAuth(request.payload)

    return responseSuccess(h, 'Login Sucessfully', result, 201)
  } catch (error) {
    return responseFailed(h, error, error.errorCode, error.statusCode)
  }
}
