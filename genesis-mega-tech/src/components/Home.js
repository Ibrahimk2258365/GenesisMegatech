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
    return <div className="centered-content loading">Loading...</div>;
  }

  return (
    <div className="centered-content">
      {/* Banner Section */}
      <section className="banner">
        <div className="banner-content">
          <h1>{homeData.title}</h1>
          <h2>{homeData.subtitle}</h2>
          <img
            src={homeData.bannerImageUrl}
            alt="Banner"
            className="banner-image"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <div className="content-wrapper">
          <h3>Our Mission</h3>
          <p>{homeData.missionStatement}</p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision">
        <div className="content-wrapper">
          <h3>Our Vision</h3>
          <p>{homeData.visionStatement}</p>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section className="key-highlights">
        <div className="content-wrapper">
          <h3>Key Highlights</h3>
          <ul>
            {homeData.keyHighlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="call-to-action">
        <div className="content-wrapper">
          <h3>Join Us</h3>
          <a
            href={homeData.callToActionLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
          >
            {homeData.callToActionText}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
