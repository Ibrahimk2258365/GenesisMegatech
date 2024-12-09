import React, { useState, useEffect } from "react";
import { getProjects } from "../services/api";
import './project.css'

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError("Failed to fetch projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="centered-content">
      <h2>Our Projects</h2>
      <p>Explore some of the key projects we have successfully completed.</p>

      <div className="projects-grid">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="project-item">
              <div className="image-container">
                <img
                  src={`http://localhost:5001${project.images || '/uploads/default.jpg'}`}
                  alt={project.title}
                  className="project-image"
                />
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
            </div>
          ))
        ) : (
          <p className="no-projects">No projects to display.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
