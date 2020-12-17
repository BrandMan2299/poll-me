const { Router } = require('express');

const router = Router();

router.use('/polls', require('./polls'));
router.use('/user', require('./user'));

module.exports = router;