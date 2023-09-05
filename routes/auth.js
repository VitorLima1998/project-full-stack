const express = require('express');
const verifyJWT = require('../middlewares/verifyJWT');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    await authController.register(req, res);
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

router.post('/login', async (req, res) => {
  try {
    await authController.login(req, res);
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

router.post('/logout', verifyJWT, async (req, res) => {
  try {
    await authController.logout(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
});

module.exports = router;
