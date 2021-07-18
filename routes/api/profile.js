const express = require('express');

const router = express.Router();

// @route   GET /api/profile/test
// @desc    Test profile route
// @access  public route
router.get('/test', (request,response) => response.json({msg:"Profile api works."}));

module.exports = router;