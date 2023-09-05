const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const register = await authController.register;
    res.json({ success: true, data: register });
  } catch (error) {
    res.status(500).json({ error });
  }
});
router.post('/login', async (req, res) => {
  try {
    const login = await authController.login;
    res.json({ success: true, data: login });
  } catch (error) {
    res.status(500).json({ error });
  }
});
router.post('/logout', async (req, res) => {
  try {
    const logout = await authController.logout;
    res.json({ success: true, data: logout });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
