import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa'; // Import the FaPlus icon

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
      fetchAllTeamMembers();
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
      fetchAllTeamMembers();
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
    <div className="team-member-form">
      <h1>{selectedTeamMemberId ? 'Edit Team Member' : 'Add Team Member'}</h1>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleInputChange}
          placeholder="Designation"
        />
        {formData.expertise.map((skill, index) => (
  <div key={index} className="expertise-field">
    <input
      type="text"
      value={skill}
      onChange={(e) => handleArrayChange(index, e.target.value)}
      placeholder="Expertise"
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
        <input
          type="text"
          name="email"
          value={formData.contactInfo.email}
          onChange={(e) => handleNestedInputChange(e, 'contactInfo')}
          placeholder="Email"
        />
        <input
          type="text"
          name="phone"
          value={formData.contactInfo.phone}
          onChange={(e) => handleNestedInputChange(e, 'contactInfo')}
          placeholder="Phone"
        />
        <input type="file" onChange={handleFileChange} />
        {previewUrl && <img src={previewUrl} alt="Preview" />}
        <button type="submit">Save</button>
      </form>

      <h2>Team Members</h2>
      <ul>
        {teamMembers.map((member) => (
          <li key={member._id}>
            {member.name} - {member.designation}
            <button onClick={() => handleEdit(member)}>Edit</button>
            <button onClick={() => handleDelete(member._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMemberForm;
