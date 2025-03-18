const express = require('express');
const multer = require('multer');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../Controllers/projectController');

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
router.post('/', upload.array('images'), createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', upload.array('images'), updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
