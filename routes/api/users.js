const express = require('express');

const router = express.Router();

// @route   GET /api/users/test
// @desc    Test user route
// @access  public route
router.get('/test', (request,response) => response.json({msg:"User api works."}));

module.exports = router;