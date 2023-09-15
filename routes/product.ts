import express from 'express';
import productController from '../controllers/productController';
import { Request, Response } from 'express';

const router = express.Router();

router.get('/sync-database', async (req: Request, res: Response) => {
  try {
    const updateDb = await productController.syncDatabase();
    res.json({ data: updateDb });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.get('/list-products', async (req: Request, res: Response) => {
  try {
    const products = await productController.getAll();
    res.json({ data: products });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post('/add-products', async (req: Request, res: Response) => {
  try {
    const product = await productController.create(req, res);
    res.status(200).json({ data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

export default router;
