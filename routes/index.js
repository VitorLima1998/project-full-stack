const express = require('express');
const verifyJwt = require('../middlewares/verifyJWT');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Express is running...');
});

router.get('/users', verifyJwt, userController.getUsers);

module.exports = router;
