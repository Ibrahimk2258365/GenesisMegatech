const Home = require('../models/Content');

// Create Content
exports.createContent = async (req, res) => {
  try {
      const homeData = new Home(req.body);
      const savedHome = await homeData.save();
      res.status(201).json(savedHome);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};


// Get Content
exports.getContent = async (req, res) => {
  try {
      const homeData = await Home.findOne();
      if (!homeData) {
          return res.status(404).json({ message: 'Home section not found' });
      }
      res.json(homeData);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};



// Update Content
exports.updateContent = async (req, res) => {
  try {
      const homeData = await Home.findOneAndUpdate({}, req.body, { new: true, upsert: true });
      res.json(homeData);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};
// Delete  Content
exports.deleteContent = async (req, res) =>  {
  try {
      const result = await Home.deleteOne();
      if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Home section not found' });
      }
      res.json({ message: 'Home section deleted' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}
