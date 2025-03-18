import React, { useState, useEffect } from "react";
import { getProjects } from "../services/api";
import './project.css';

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
    <div className="projects-page">
      <section className="projects-header">
        <h2>Our Projects</h2>
        <p>Explore our most innovative and impactful work to date.</p>
      </section>

      <section className="projects-grid">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="image-container">
                <img
                  src={`https://ingenious-quietude-production.up.railway.app${project.images || "/uploads/default.jpg"}`}
                  alt={project.title}
                  className="project-image"
                />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <button
                  className="learn-more-btn"
                  onClick={() => alert(`Learn more about: ${project.title}`)}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-projects">No projects to display.</p>
        )}
      </section>
    </div>
  );
};

export default Projects;
