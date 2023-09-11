const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('../prisma/generated/client');
const dotenv = require('dotenv-safe');
dotenv.config();

const prisma = new PrismaClient();

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

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashPassword,
      },
    });

    return res
      .status(200)
      .json({ message: 'User created successfully!', newUser });
  },

  // -------------------------------------------LOGIN-------------------------------------------

  login: async (req, res) => {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(401).json({ auth: false, error: 'User not found' });
    }

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      return res
        .status(401)
        .json({ auth: false, error: 'Invalid credentials' });
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
