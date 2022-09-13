const saltRounds = 8
const bcrypt = require('bcrypt')
const UsersModel = require('../../models/users/UsersModel')

const CustomError = require('../../utils/error')

exports.createRegisterAccount = async (data) =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        const { email, full_name, password, phone_number, auth_type } = data
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const result = await UsersModel.query().insertAndFetch({
          email,
          full_name,
          password: passwordHash,
          phone_number,
          auth_type
        })

        return resolve(result)
      } catch (error) {
        return reject(new CustomError(error.name, error.nativeError.code, 400))
      }
    })()
  })
