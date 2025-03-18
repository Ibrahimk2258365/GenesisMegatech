// Backend (Server-side) Mongoose Model
const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: String,
  designation: String,
  profilePictureUrl: String,
  expertise: [String],
  contactInfo: {
    email: String,
    phone: String,
  },
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
