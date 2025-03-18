const About = require('../models/About');

// Create About Us data
exports.createAbout = async (req, res) => {
  try {
    const aboutData = new About(req.body);
    const savedAbout = await aboutData.save();
    res.status(201).json(savedAbout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get About Us data
exports.getAbout = async (req, res) => {
  try {
    const aboutData = await About.findOne();
    if (!aboutData) {
      return res.status(404).json({ message: 'About Us section not found' });
    }
    res.json(aboutData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update About Us data
exports.updateAbout = async (req, res) => {
  try {
    const aboutData = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(aboutData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete About Us data
exports.deleteAbout = async (req, res) => {
  try {
    const result = await About.deleteOne();
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'About Us section not found' });
    }
    res.json({ message: 'About Us section deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
