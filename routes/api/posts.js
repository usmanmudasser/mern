const express = require('express');

const router = express.Router();

// @route   GET /api/posts/test
// @desc    Test post route
// @access  public route
router.get('/test', (request,response) => response.json({msg:"Posts api works."}));

module.exports = router;