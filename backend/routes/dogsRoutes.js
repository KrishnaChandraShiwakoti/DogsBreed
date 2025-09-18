const express = require('express');
const breedController = require('../controller/breedController');
const router = express.Router();

router
  .route('/breed')
  .get(breedController.getBreed)
  .post(breedController.addBreed);

router
  .route('/breed/:id')
  .get(breedController.getSingleBreed)
  .patch(breedController.updateBreed)
  .delete(breedController.deleteBreed);
router.route('/groups').get(breedController.getBreedsGroupedAlphabetically);
module.exports = router;
