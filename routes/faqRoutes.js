const express = require('express');
const { createFAQ, getFAQs, updateFAQ, deleteFAQ } = require('../Controllers/faqController');
const router = express.Router();

// Routes for FAQ
router.post('/', createFAQ);
router.get('/', getFAQs);
router.put('/:id', updateFAQ);
router.delete('/:id', deleteFAQ);

module.exports = router;
