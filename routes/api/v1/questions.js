const express = require('express');
const router = express.Router();
const question_controller = require('../../../controllers/question_Controller');

router.post('/create',question_controller.create);
router.get('/view/:id',question_controller.showDetails);
router.delete('/delete/:id',question_controller.deleteQuestion);
router.use('/options',require('./options'));


module.exports = router;