const express = require('express');
const router = express.Router();
const signupController = require('../../controllers/users/auth');

router.post('/signup', signupController.signup);
router.post('/signin', signupController.signin);

module.exports = router;
