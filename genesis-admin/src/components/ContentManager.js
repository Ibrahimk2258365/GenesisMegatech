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
    keyHighlights: '',
    callToActionText: '',
    callToActionLink: '',
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // Fetch content on component mount
    (async () => {
      try {
        const data = await getContent();
        if (data) {
          setFormData(data);
          setIsEdit(true);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateContent(formData);
        alert('Content updated successfully');
      } else {
        await createContent(formData);
        alert('Content created successfully');
        setIsEdit(true);
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('An error occurred while saving content.');
    }
  };

  return (
    <div className="content-manager">
      <h2>{isEdit ? 'Edit' : 'Create'} Content</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle"
          value={formData.subtitle}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bannerImageUrl"
          placeholder="Banner Image URL"
          value={formData.bannerImageUrl}
          onChange={handleChange}
        />
        <textarea
          name="missionStatement"
          placeholder="Mission Statement"
          value={formData.missionStatement}
          onChange={handleChange}
        ></textarea>
        <textarea
          name="visionStatement"
          placeholder="Vision Statement"
          value={formData.visionStatement}
          onChange={handleChange}
        ></textarea>
        <textarea
          name="keyHighlights"
          placeholder="Key Highlights (comma-separated)"
          value={formData.keyHighlights}
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          name="callToActionText"
          placeholder="Call to Action Text"
          value={formData.callToActionText}
          onChange={handleChange}
        />
        <input
          type="text"
          name="callToActionLink"
          placeholder="Call to Action Link"
          value={formData.callToActionLink}
          onChange={handleChange}
        />
        <button type="submit">{isEdit ? 'Update' : 'Create'} Content</button>
      </form>
    </div>
  );
};

export default ContentManager;
