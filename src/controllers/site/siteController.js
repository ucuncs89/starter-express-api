
const { findLayananList } = require('../../services/site/siteService')
const { responseSuccess, responseFailed } = require('../../utils/response')

exports.getLayananList = async (request, h) => {
  try {
    const result = await findLayananList()

    return responseSuccess(h, 'Get Layanan', result, 200)
  } catch (error) {
    return responseFailed(h, error, error.errorCode || 400)
  }
}
