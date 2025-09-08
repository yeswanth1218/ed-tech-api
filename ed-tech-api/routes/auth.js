const express = require('express');
const router = express.Router();
const { userLogin, userRegistration } = require('../controllers/auth');

router.post('/login', userLogin);
router.post('/register', userRegistration);
// router.post('/logout', userLogout);

module.exports = router;
