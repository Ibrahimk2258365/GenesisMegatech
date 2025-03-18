const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  introductionText: { type: String, required: true },
  mission: { type: String, required: true },
  vision: { type: String, required: true },
  coreValues: { type: [String], required: true },
  history: { 
    establishedYear: { type: Number, required: true },
    achievements: { type: [String], required: true },
  },
  mediaUrls: { type: [String], required: false },
}, { timestamps: true });

const About = mongoose.model('About', aboutSchema);
module.exports = About;
