import express from 'express';
import producService from '../services/productService';
import verifyJWT from '../middlewares/verifyJWT';
import { Request, Response } from 'express';

const router = express.Router();

router.get('/sync-database', async (req: Request, res: Response) => {
  try {
    const updateDb = await producService.syncDatabase();
    res.json({ data: updateDb });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.get('/list-products', async (req: Request, res: Response) => {
  try {
    const products = await producService.getAll();
    res.json({ data: products });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post('/add-products', verifyJWT, async (req: Request, res: Response) => {
  try {
    const product = await producService.create(req, res);
    res.status(200).json({ data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

export default router;
