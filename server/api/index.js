const { Router } = require('express');

const router = Router();

router.use('/polls', require('./polls'));

module.exports = router;