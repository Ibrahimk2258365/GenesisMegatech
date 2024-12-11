import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'; // Importing the edit, delete, and remove icons

import {
  createTeamMember,
  getTeamMember,
  getTeamMembers,
  updateTeamMember,
  deleteTeamMember,
} from '../services/api';
import './TeamMemberForm.css';

const TeamMemberForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    expertise: [''],
    contactInfo: { email: '', phone: '' },
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchTeamMemberById(id);
    } else {
      fetchAllTeamMembers();
    }
  }, [id]);

  const fetchTeamMemberById = async (id) => {
    try {
      const data = await getTeamMember(id);
      setFormData(data);
      setPreviewUrl(data.profilePictureUrl);
    } catch (error) {
      setErrorMessage('Failed to fetch team member.');
    }
  };

  const fetchAllTeamMembers = async () => {
    try {
      const data = await getTeamMembers();
      console.log(data); // Debugging: Log the fetched data to verify
      setTeamMembers(data);
    } catch (error) {
      setErrorMessage('Failed to fetch team members.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedInputChange = (e, fieldName) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], [name]: value },
    }));
  };

  const handleArrayChange = (index, value) => {
    setFormData((prev) => {
      const updatedArray = [...prev.expertise];
      updatedArray[index] = value;
      return { ...prev, expertise: updatedArray };
    });
  };

  const addExpertiseField = () => {
    setFormData((prev) => ({ ...prev, expertise: [...prev.expertise, ''] }));
  };

  const removeExpertiseField = (index) => {
    const updatedExpertise = formData.expertise.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, expertise: updatedExpertise }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('designation', formData.designation);
    formDataToSubmit.append('expertise', JSON.stringify(formData.expertise));
    formDataToSubmit.append('contactInfo', JSON.stringify(formData.contactInfo));
    if (selectedFile) formDataToSubmit.append('profilePicture', selectedFile);

    try {
      if (selectedTeamMemberId) {
        await updateTeamMember(selectedTeamMemberId, formDataToSubmit);
        setSuccessMessage('Team member updated successfully.');
      } else {
        await createTeamMember(formDataToSubmit);
        setSuccessMessage('Team member created successfully.');
      }
      resetForm();
      fetchAllTeamMembers(); // Fetch updated team members after submit
    } catch (error) {
      setErrorMessage('Error saving team member.');
    }
  };

  const handleEdit = (member) => {
    setFormData(member);
    setSelectedTeamMemberId(member._id);
    setPreviewUrl(member.profilePictureUrl);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTeamMember(id);
      setSuccessMessage('Team member deleted successfully.');
      fetchAllTeamMembers(); // Fetch updated list after delete
    } catch (error) {
      setErrorMessage('Error deleting team member.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      expertise: [''],
      contactInfo: { email: '', phone: '' },
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setSelectedTeamMemberId(null);
  };

  return (
    <div className="team-member-form-container">
      <h1>{selectedTeamMemberId ? 'Edit Team Member' : 'Add Team Member'}</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
        </div>

        <div className="form-group">
          <label>Designation</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            placeholder="Designation"
          />
        </div>

        <div className="form-group">
          <label>Expertise</label>
          {formData.expertise.map((skill, index) => (
            <div key={index} className="expertise-field">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleArrayChange(index, e.target.value)}
                placeholder="Expertise"
              />
              <FaTimes
                className="remove-expertise-icon"
                onClick={() => removeExpertiseField(index)}
                title="Remove Expertise"
              />
              {index === formData.expertise.length - 1 && (
                <FaPlus
                  className="add-expertise-icon"
                  onClick={addExpertiseField}
                  title="Add Expertise"
                />
              )}
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.contactInfo.email}
            onChange={(e) => handleNestedInputChange(e, 'contactInfo')}
            placeholder="Email"
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.contactInfo.phone}
            onChange={(e) => handleNestedInputChange(e, 'contactInfo')}
            placeholder="Phone"
          />
        </div>

        <div className="form-group">
          <label>Profile Picture</label>
          <input type="file" onChange={handleFileChange} />
          {previewUrl && <img src={previewUrl} alt="Preview" />}
        </div>

        <button type="submit">{selectedTeamMemberId ? 'Update' : 'Save'} Team Member</button>
      </form>

      <h2>All Team Members</h2>
<ul>
  {teamMembers.length > 0 ? (
    teamMembers.map((member) => (
      <li key={member._id} className="team-member-item">
        <div className="team-member-info">
          <strong>{member.name}</strong> - {member.designation}
        </div>
        
        {/* Display additional information */}
        <div className="team-member-details">
          <p><strong>Expertise:</strong> {member.expertise.join(', ')}</p>
          <p><strong>Email:</strong> {member.contactInfo.email}</p>
          <p><strong>Phone:</strong> {member.contactInfo.phone}</p>
          
        </div>

        {/* Action buttons */}
        <div className="actions">
          <FaEdit className="edit-icon" onClick={() => handleEdit(member)} title="Edit Member" />
          <FaTrash className="delete-icon" onClick={() => handleDelete(member._id)} title="Delete Member" />
        </div>
      </li>
    ))
  ) : (
    <p>No team members available.</p>
  )}
</ul>

    </div>
  );
};

export default TeamMemberForm;
