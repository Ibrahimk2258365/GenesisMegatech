const express = require('express');
const { createContent, getContent, updateContent, deleteContent } = require('../Controllers/contentController');
const { auth, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

// Content Management
// router.post('/', auth, adminOnly, createContent);
// // router.get('/content?type=FAQ&section=Home', auth, getContent);
// // contentRoutes.js
// router.get('/content', auth, getContent);

// router.put('/:id', auth, adminOnly, updateContent);

router.post('/', auth, createContent);
router.get('/',  getContent);
router.put('/',auth,   updateContent);
router.delete('/', auth,  deleteContent);

module.exports = router;
