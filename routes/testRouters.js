const express = require('express');
const { testUserController } = require('../controllers/testUserController');

// router object
const router = express.Router();

// routes Get | post | delete | update
router.get('/test-users', testUserController);

//export router
module.exports = router;
