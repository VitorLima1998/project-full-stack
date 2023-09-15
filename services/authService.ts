import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '../prisma/generated/client';
import dotenv from 'dotenv-safe';
dotenv.config();


const prisma = new PrismaClient();

export default {
  // -------------------------------------------REGISTER-------------------------------------------

  register: async (req: Request, res: Response) => {
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

  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(401).json({ auth: false, error: 'User not found' });
    }

    const userPassword = user.password;

    if (!userPassword) {
      return res
        .status(401)
        .json({ auth: false, error: 'User password not set' });
    }

    const comparePass = await bcrypt.compare(password, userPassword);

    if (!comparePass) {
      return res
        .status(401)
        .json({ auth: false, error: 'Invalid credentials' });
    }

    const id = user.id;
    const token = jwt.sign({ id }, process.env.SECRET as any, {
      expiresIn: process.env.TIMEOUT,
    });

    return res.status(200).json({ auth: true, token: token });
  },
};
