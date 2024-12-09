import React, { useState, useEffect } from 'react';
import './CenteredContent.css';
import { getContent } from '../services/api';

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const data = await getContent();
        setHomeData(data); // Set the retrieved data to the state
      } catch (error) {
        setErrorMessage('Failed to load home content. Please try again later.');
      }
    };

    fetchHomeContent();
  }, []);

  if (errorMessage) {
    return <div className="centered-content error">{errorMessage}</div>;
  }

  if (!homeData) {
    return <div className="centered-content">Loading...</div>;
  }

  return (
    <div className="centered-content">
      <div className="section banner">
        <h1>{homeData.title}</h1>
        <h2>{homeData.subtitle}</h2>
        <img
          src={homeData.bannerImageUrl}
          alt="Banner"
          className="banner-image"
        />
      </div>

      <div className="section">
        <h3>Mission</h3>
        <p>{homeData.missionStatement}</p>
      </div>

      <div className="section">
        <h3>Vision</h3>
        <p>{homeData.visionStatement}</p>
      </div>

      <div className="section">
        <h3>Key Highlights</h3>
        <ul>
          {homeData.keyHighlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      </div>

      <div className="call-to-action">
        <a
          href={homeData.callToActionLink}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          {homeData.callToActionText}
        </a>
      </div>
    </div>
  );
};

export default Home;
