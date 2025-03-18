const express = require('express');
const multer = require('multer');
const {
  createTeamMember,
  getTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
} = require('../Controllers/teamMemberController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post('/', upload.single('profilePicture'), createTeamMember);
router.get('/', getTeamMembers);
router.get('/:id', getTeamMemberById);
router.put('/:id', upload.single('profilePicture'), updateTeamMember);
router.delete('/:id', deleteTeamMember);

module.exports = router;
