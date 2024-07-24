const db = require('../db');
const bcrypt = require('bcryptjs');

class UserModel {
  static async getUserByEmail(email) {
    return await db('user').where({ email }).first();
  }

  static async createUser(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const [userId] = await db('user').insert({ ...user, password: hashedPassword });
    return await db('user').where({ id_user: userId }).select('name', 'cpf');
  }

  static async checkCpfExists(cpf) {
    const check = await db('user').where({ cpf: cpf }).first();
    return check ? true : false;
  }

  static async checkEmailExists(email) {
    const check = await db('user').where({ email: email }).first();
    return check ? true : false;
  }

  static async comparePassword(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
  }
}

module.exports = UserModel;