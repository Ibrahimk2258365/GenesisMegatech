import React, { useState, useEffect } from 'react';
import './ContentManager.css';
import { createContent, getContent, updateContent } from '../services/api';

const ContentManager = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    bannerImageUrl: '',
    missionStatement: '',
    visionStatement: '',
    keyHighlights: [],
    callToActionText: '',
    callToActionLink: '',
  });

  const [isEdit, setIsEdit] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getContent();
        if (data) {
          const filteredData = {
            title: data.title,
            subtitle: data.subtitle,
            bannerImageUrl: data.bannerImageUrl,
            missionStatement: data.missionStatement,
            visionStatement: data.visionStatement,
            keyHighlights: data.keyHighlights || [],
            callToActionText: data.callToActionText,
            callToActionLink: data.callToActionLink,
          };
          setFormData(filteredData);
          setIsEdit(true);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        setStatus('Failed to load content.');
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyHighlightChange = (index, value) => {
    const updatedHighlights = [...formData.keyHighlights];
    updatedHighlights[index] = value;
    setFormData((prev) => ({ ...prev, keyHighlights: updatedHighlights }));
  };

  const addKeyHighlight = () => {
    setFormData((prev) => ({ ...prev, keyHighlights: [...prev.keyHighlights, ''] }));
  };

  const removeKeyHighlight = (index) => {
    const updatedHighlights = [...formData.keyHighlights];
    updatedHighlights.splice(index, 1);
    setFormData((prev) => ({ ...prev, keyHighlights: updatedHighlights }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateContent(formData);
        setStatus('Content updated successfully!');
      } else {
        await createContent(formData);
        setStatus('Content created successfully!');
        setIsEdit(true);
      }
    } catch (error) {
      setStatus('An error occurred while saving content.');
    }
  };

  return (
    <div className="content-manager-container">
      <h2>{isEdit ? 'Edit' : 'Create'} Content</h2>
      {status && <p className="status-message">{status}</p>}
      <form onSubmit={handleSubmit} className="content-form">
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
            {key === 'keyHighlights' ? (
              <>
                {formData.keyHighlights.map((highlight, index) => (
                  <div key={index} className="key-highlight-item">
                    <input
                      type="text"
                      placeholder={`Highlight ${index + 1}`}
                      value={highlight}
                      onChange={(e) => handleKeyHighlightChange(index, e.target.value)}
                    />
                    <span
                      className="icon remove-icon"
                      onClick={() => removeKeyHighlight(index)}
                      title="Remove Highlight"
                    >
                      ❌
                    </span>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-highlight-button"
                  onClick={addKeyHighlight}
                >
                  Add Highlight
                </button>
              </>
            ) : key.includes('Statement') ? (
              <textarea
                id={key}
                name={key}
                placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                value={formData[key]}
                onChange={handleChange}
              ></textarea>
            ) : (
              <input
                type="text"
                id={key}
                name={key}
                placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                value={formData[key]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
        <button type="submit" className="submit-button">
          {isEdit ? 'Update' : 'Create'} Content
        </button>
      </form>
    </div>
  );
};

export default ContentManager;
