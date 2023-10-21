const express=require('express');
const router=express.Router();


router.use('/question',require('./questions'));
router.use('/options',require('./options'));

module.exports = router;