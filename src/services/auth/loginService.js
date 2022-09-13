const bcrypt = require('bcrypt')
const UsersModel = require('../../models/users/UsersModel')
const { UserNotFoundException } = require('../../utils/exception')
const { createTokenJWT } = require('../../utils/token')

exports.loginPerdanaAuth = async (data) => {
  const { email, auth_type, password } = data
  const findUser = await UsersModel.query().findOne({
    email
  })
  if (!findUser) {
    throw new UserNotFoundException()
  }
  const comparePassword = bcrypt.compareSync(
    password,
    findUser.password
  )
  if (!comparePassword) {
    throw new UserNotFoundException()
  }

  const token = await createTokenJWT({ ...findUser })
  return ({ ...findUser, token })
}
