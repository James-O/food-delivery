const express = require('express');
const { userone } = require('../controller/userOnec');
router = express.Router();

router.post('/userone', userone);

module.exports = router;