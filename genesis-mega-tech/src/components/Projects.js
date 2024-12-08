import React, { useState, useEffect } from "react";
import { getProjects } from "../services/api"; // Import the API function

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects(); // Fetch project data from API
        setProjects(data);
      } catch (err) {
        setError("Failed to fetch projects. Please try again later.");
      } finally {
        setLoading(false); // Ensure loading is stopped
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="centered-content">
      <h2>Our Projects</h2>
      <p>Explore some of the key projects we have successfully completed.</p>

      <div className="projects-grid" style={styles.projectsGrid}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="project-item" style={styles.projectItem}>
              <img
                src={`http://localhost:5001${project.images || '/uploads/default.jpg'}`}
                alt={project.title}
                style={styles.projectImage}
              />
              <h3 style={styles.projectTitle}>{project.title}</h3>
              <p style={styles.projectDescription}>{project.description}</p>
            </div>
          ))
        ) : (
          <p style={styles.noProjects}>No projects to display.</p>
        )}
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  projectsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '2rem',
  },
  projectItem: {
    textAlign: 'center',
    maxWidth: '300px',
  },
  projectImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '1rem',
  },
  projectTitle: {
    fontSize: '1.25rem',
    margin: '0.5rem 0',
  },
  projectDescription: {
    fontSize: '1rem',
    color: '#555',
  },
  noProjects: {
    fontSize: '1rem',
    color: '#777',
  },
};

export default Projects;
