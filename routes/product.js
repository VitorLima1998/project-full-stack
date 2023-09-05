const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/sync-database', async (req, res) => {
  try {
    const updateDb = await productController.syncDatabase();
    res.json({ success: true, data: updateDb });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/list-products', async (req, res) => {
  try {
    const products = await productController.getAll();
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
