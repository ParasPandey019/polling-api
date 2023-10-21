const express = require('express');
const router = express.Router();
const optionsController = require('../../../controllers/option_Controller');

router.post('/:id/create',optionsController.create);
router.get('/:id/add_vote',optionsController.addVote);
router.delete('/delete/:id',optionsController.delete);

module.exports = router;