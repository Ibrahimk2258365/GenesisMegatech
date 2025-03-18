const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  bannerImageUrl: { type: String, required: true },
  missionStatement: { type: String, required: true },
  visionStatement: { type: String, required: true },
  keyHighlights: { type: [String], required: true },
  callToActionText: { type: String, required: true },
  callToActionLink: { type: String, required: true },
}, { timestamps: true });


const Home = mongoose.model('Home', homeSchema);
module.exports = Home ; 

