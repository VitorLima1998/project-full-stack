import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv-safe';

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['x-access-token'] as string;

  if (!token) {
    return res.status(401).json({ auth: false, message: 'No token provided' });
  }

  jwt.verify(token, process.env.SECRET as string, function (err, decoded) {
    if (err) {
      return res
        .status(401)
        .json({ auth: false, message: 'Failed to authenticate token' });
    }

    req.userId = (decoded as { id: string }).id;
    next();
  });
}

export default verifyJWT;
