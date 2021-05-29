const express = require('express');
const router = express.Router();

// User Controllers
const userControllers = require('../../controllers/userControllers')

router.get('/allUsers', userControllers.allUser)

module.exports = router;