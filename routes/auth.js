const express = require('express');
const verifyJWT = require('../middlewares/verifyJWT');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const register = await authController.register(req, res);
    res.json({ success: true, data: register });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const login = await authController.login(req, res);
    res.json({ success: true, data: login });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post('/logout', verifyJWT, async (req, res) => {
  try {
    const logout = await authController.logout(req, res);
    res.json({ success: true, data: logout });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
