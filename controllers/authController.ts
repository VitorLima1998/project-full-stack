import express from 'express';
// import verifyJWT from '../middlewares/verifyJWT';
import authService from '../services/authService';
import { Request, Response } from 'express';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    await authService.register(req, res);
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    await authService.login(req, res);
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

export default router;
