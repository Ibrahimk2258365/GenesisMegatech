const TeamMember = require('../models/TeamMember');

// Create a new team member
exports.createTeamMember = async (req, res) => {
  try {
    const { name, designation, expertise, contactInfo } = req.body;
    const profilePictureUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const teamMember = new TeamMember({
      name,
      designation,
      expertise: JSON.parse(expertise),
      contactInfo: JSON.parse(contactInfo),
      profilePictureUrl,
    });

    await teamMember.save();
    res.status(201).json(teamMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create team member' });
  }
};

// Get all team members
exports.getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
};

// Get a single team member by ID
exports.getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) return res.status(404).json({ error: 'Team member not found' });

    res.json(teamMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team member' });
  }
};

// Update a team member
exports.updateTeamMember = async (req, res) => {
  try {
    const { name, designation, expertise, contactInfo } = req.body;
    const profilePictureUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedData = {
      name,
      designation,
      expertise: JSON.parse(expertise),
      contactInfo: JSON.parse(contactInfo),
    };

    if (profilePictureUrl) updatedData.profilePictureUrl = profilePictureUrl;

    const teamMember = await TeamMember.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!teamMember) return res.status(404).json({ error: 'Team member not found' });

    res.json(teamMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team member' });
  }
};

// Delete a team member
exports.deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);
    if (!teamMember) return res.status(404).json({ error: 'Team member not found' });

    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team member' });
  }
};
