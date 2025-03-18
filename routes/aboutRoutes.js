const express = require('express');
const router = express.Router();
const aboutController = require('../Controllers/aboutController');

// Create About Us
router.post('/', aboutController.createAbout);

// Get About Us
router.get('/', aboutController.getAbout);

// Update About Us
router.put('/', aboutController.updateAbout);

// Delete About Us
router.delete('/', aboutController.deleteAbout);

module.exports = router;
