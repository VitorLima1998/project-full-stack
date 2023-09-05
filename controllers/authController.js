const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../prisma/generated/client');
const dotenv = require('dotenv-safe');
dotenv.config();

module.exports = {
  // -------------------------------------------REGISTER-------------------------------------------

  register: async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });

    return res.status(200)({ message: 'User created successfully!', newUser });
  },

  // -------------------------------------------LOGIN-------------------------------------------

  login: async (req, res) => {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ auth: false, error: 'Invalid credencials' });
    }

    const id = user.id;
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: process.env.TIMEOUT,
    });

    return res.status(200).json({ auth: true, token: token });
  },

  // -------------------------------------------LOGOUT-------------------------------------------

  logout: async (req, res) => {
    return res.status(200).json({ auth: false, token: null });
  },
};
