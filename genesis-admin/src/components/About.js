import React, { useState, useEffect } from 'react';
import {
  getAbout,
  createAbout,
  updateAbout,
} from '../services/api'; // Import the appropriate API functions
import './AboutForm.css';

const AboutPage = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    introductionText: '',
    mission: '',
    vision: '',
    coreValues: [''],
    history: { establishedYear: '', achievements: [''] },
    mediaUrls: [''],
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const data = await getAbout();
      setFormData(data);
    } catch (error) {
      setErrorMessage('Failed to load About Us data');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, arrayName, value) => {
    setFormData((prev) => {
      const updatedArray = [...prev[arrayName]];
      updatedArray[index] = value;
      return { ...prev, [arrayName]: updatedArray };
    });
  };

  const handleNestedArrayChange = (index, nestedName, value) => {
    setFormData((prev) => {
      const updatedNested = [...prev.history[nestedName]];
      updatedNested[index] = value;
      return {
        ...prev,
        history: { ...prev.history, [nestedName]: updatedNested },
      };
    });
  };

  const addToArray = (arrayName) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], ''],
    }));
  };

  const addToNestedArray = (nestedName) => {
    setFormData((prev) => ({
      ...prev,
      history: {
        ...prev.history,
        [nestedName]: [...prev.history[nestedName], ''],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateAbout(formData); // Update existing data
      } else {
        await createAbout(formData); // Create new data
      }
      setSuccessMessage('About information updated successfully!');
      setErrorMessage('');
      setIsEditMode(false);
      fetchAboutData(); // Refresh the data after submission
    } catch (error) {
      setErrorMessage('Error saving About information');
      setSuccessMessage('');
    }
  };

  return (
    <div className="about-page-container">
      <h2>About Us</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {isEditMode ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Introduction Text</label>
            <textarea
              name="introductionText"
              value={formData.introductionText}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mission</label>
            <textarea
              name="mission"
              value={formData.mission}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Vision</label>
            <textarea
            cols={5}
              name="vision"
              value={formData.vision}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Core Values</label>
            {formData.coreValues.map((value, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleArrayChange(index, 'coreValues', e.target.value)
                  }
                  required
                />
              </div>
            ))}
            <button type="button" onClick={() => addToArray('coreValues')}>
              Add more Core Value
            </button>
          </div>

          <div className="form-group">
            <label>History</label>
            <input
              type="number"
              name="establishedYear"
              value={formData.history.establishedYear}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  history: { ...prev.history, establishedYear: e.target.value },
                }))
              }
              required
            />

            {formData.history.achievements.map((achievement, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) =>
                    handleNestedArrayChange(index, 'achievements', e.target.value)
                  }
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addToNestedArray('achievements')}
            >
              Add more Achievement
            </button>
          </div>

          <button type="submit">Save About Information</button>
        </form>
      ) : (
        <div>
          <p><strong>Company Name:</strong> {formData.companyName}</p>
          <p><strong>Introduction:</strong> {formData.introductionText}</p>
          <p><strong>Mission:</strong> {formData.mission}</p>
          <p><strong>Vision:</strong> {formData.vision}</p>
          <p><strong>Core Values:</strong> {formData.coreValues.join(', ')}</p>
          <p><strong>Established Year:</strong> {formData.history.establishedYear}</p>
          <p><strong>Achievements:</strong> {formData.history.achievements.join(', ')}</p>
          <button onClick={() => setIsEditMode(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
