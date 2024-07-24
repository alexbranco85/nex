const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

class UserController {
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.getUserByEmail(email);
      if (user && UserModel.comparePassword(password, user.password)) {
        const token = jwt.sign({ id: user.id_user, email: user.email }, process.env.SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'E-mail ou senha inválida' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async register(req, res) {
    const { name, cpf, email, password } = req.body;
    try {
      const checkEmail = await UserModel.checkEmailExists(email);
      const checkCpf = await UserModel.checkCpfExists(cpf);
      if (checkEmail || checkCpf) {
        res.status(409).json({ error: 'Email ou CPF já estão cadastrados.' });
      } else {
        const [newUser] = await UserModel.createUser({ name, cpf, email, password });
        res.status(201).json(newUser);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

module.exports = UserController;