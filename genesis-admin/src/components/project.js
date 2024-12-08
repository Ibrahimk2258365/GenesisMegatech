import React, { useState, useEffect } from 'react';
import { createProject, getProjectById, updateProject } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [], // To store image files
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchProjectDetails();
    }
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const project = await getProjectById(id);
      setFormData(project);
    } catch (error) {
      setErrorMessage('Failed to fetch project details.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = new FormData();

    projectData.append('title', formData.title);
    projectData.append('description', formData.description);
    formData.images.forEach((file) => {
      projectData.append('images', file);
    });

    try {
      if (isEditMode) {
        await updateProject(id, projectData);
        setSuccessMessage('Project updated successfully!');
      } else {
        await createProject(projectData);
        setSuccessMessage('Project created successfully!');
      }
      setErrorMessage('');
      navigate('/projects');
    } catch (error) {
      setErrorMessage('Error saving project.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="project-form-container">
      <h2>{isEditMode ? 'Edit Project' : 'Add New Project'}</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">{isEditMode ? 'Update Project' : 'Save Project'}</button>
      </form>
    </div>
  );
};

export default ProjectForm;
