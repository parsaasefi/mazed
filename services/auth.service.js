const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/User');
const jwtConfig = require('../config/jwt');

class AuthService {
  /**
   * Login the user
   * @param {String} email User's email
   * @param {String} password User's password
   * @returns {String} JWT token
   */
  static async loginUser(email, password) {
    const user = await UserModel.findOne({ email });
    const errorMessage = 'Email or password is incorrect';

    if (!user) throw new Error(errorMessage);

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) throw new Error(errorMessage);

    const token = jwt.sign({ id: user._id }, jwtConfig.secret);
    const userInfo = {
      apiKey: user.apiKey,
      token,
    };

    return userInfo;
  }
}

module.exports = AuthService;
