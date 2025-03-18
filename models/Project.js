const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: false }, // Array of URLs for media files
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
