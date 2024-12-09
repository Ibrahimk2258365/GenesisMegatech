import React, { useState, useEffect } from 'react';
import { getAbout } from '../services/api'; // Adjust path as needed
import './About.css'; // Import the CSS file

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await getAbout();
        setAboutData(data); // Set the retrieved data to the state
      } catch (error) {
        setErrorMessage('Failed to load about content. Please try again later.');
      }
    };

    fetchAboutData();
  }, []);

  if (errorMessage) {
    return <div className="centered-content error">{errorMessage}</div>;
  }

  if (!aboutData) {
    return <div className="centered-content">Loading...</div>; // Show loading state
  }

  return (
    <div className="centered-content">
      <h2>About {aboutData.companyName}</h2>
      <p>{aboutData.introductionText}</p>

      <div className="section">
        <h3>Mission</h3>
        <p>{aboutData.mission}</p>
      </div>

      <div className="section">
        <h3>Vision</h3>
        <p>{aboutData.vision}</p>
      </div>

      <div className="section">
        <h3>Core Values</h3>
        <ul>
          {aboutData.coreValues.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Our History</h3>
        <p>
          Established in {aboutData.history.establishedYear}, our company has
          achieved the following milestones:
        </p>
        <ul>
          {aboutData.history.achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default About;
