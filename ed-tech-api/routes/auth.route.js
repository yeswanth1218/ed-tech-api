const express = require('express');
const router = express.Router();
const { userLogin, userRegistration } = require('../controllers/auth.controller');

router.post('/login', userLogin);
router.post('/register', userRegistration);

module.exports = router;
