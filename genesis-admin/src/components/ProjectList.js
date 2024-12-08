import React, { useState, useEffect } from 'react';
import { getProjects, deleteProject } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        setErrorMessage('Failed to fetch projects.');
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (error) {
      setErrorMessage('Failed to delete project.');
    }
  };

  return (
    <div className="project-list-container">
      <h2>Projects</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={() => navigate('/projects/new')}>Add New Project</button>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <button onClick={() => navigate(`/projects/${project._id}`)}>Edit</button>
            <button onClick={() => handleDelete(project._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
