import React, { useState, useEffect } from 'react';
import { getAbout } from '../services/api';
import './About.css';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await getAbout();
        setAboutData(data);
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
    return <div className="centered-content loading">Loading...</div>;
  }

  return (
    <div className="about-page">
      {/* Header Section */}
      <section className="about-header">
        <h2>About {aboutData.companyName}</h2>
        <p className="intro-text">{aboutData.introductionText}</p>
      </section>

      {/* Mission Section */}
      <section className="about-section mission">
        <div className="content">
          <h3>Mission</h3>
          <p>{aboutData.mission}</p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="about-section vision">
        <div className="content">
          <h3>Vision</h3>
          <p>{aboutData.vision}</p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="about-section core-values">
        <div className="content">
          <h3>Core Values</h3>
          <ul>
            {aboutData.coreValues.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* History Section */}
      <section className="about-section history">
        <div className="content">
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
      </section>
    </div>
  );
};

export default About;
