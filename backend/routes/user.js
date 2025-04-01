// routes/user.js

const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/userController'); 
const router = express.Router();

// register
router.post('/register', registerUser);

// login
router.post('/login', loginUser);

// get info
router.get('/profile', getProfile);  // 增加這一行，處理 GET /profile 請求

module.exports = router;
