import express from 'express';
// import verifyJWT from '../middlewares/verifyJWT';
import authController from '../controllers/authController';
import { Request, Response } from 'express';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    await authController.register(req, res);
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    await authController.login(req, res);
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

export default router;
