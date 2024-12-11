import React, { useState, useEffect } from 'react';
import { createFAQ, getFAQs, updateFAQ, deleteFAQ } from '../services/api'; // Import the API functions
import './FAQForm.css';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Icons for edit and delete

const FAQManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({ question: '', answer: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [currentFAQId, setCurrentFAQId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For loading state

  // Fetch FAQs on component mount
  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    setIsLoading(true);
    try {
      const data = await getFAQs();
      setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEdit) {
        await updateFAQ(currentFAQId, formData);
        setSuccessMessage('FAQ updated successfully!');
      } else {
        await createFAQ(formData);
        setSuccessMessage('FAQ added successfully!');
      }
      setErrorMessage('');
      setFormData({ question: '', answer: '' });
      setIsEdit(false);
      setCurrentFAQId(null);
      fetchFAQs();
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to save FAQ');
      setSuccessMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (faq) => {
    setFormData({ question: faq.question, answer: faq.answer });
    setIsEdit(true);
    setCurrentFAQId(faq._id);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await deleteFAQ(id);
      setSuccessMessage('FAQ deleted successfully!');
      fetchFAQs();
    } catch (error) {
      setErrorMessage('Failed to delete FAQ');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="faq-manager-container">
      <h2>{isEdit ? 'Edit FAQ' : 'Add FAQ'}</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question">Question</label>
          <input
            type="text"
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Enter the question"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="answer">Answer</label>
          <textarea
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            placeholder="Enter the answer"
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : isEdit ? 'Update FAQ' : 'Add FAQ'}
        </button>
      </form>

      <h2>All FAQs</h2>
      {isLoading ? (
        <p>Loading FAQs...</p>
      ) : (
        <ul className="faq-list">
          {faqs.map((faq) => (
            <li key={faq._id} className="faq-item">
              <div className="faq-content">
                <strong>Q:</strong> {faq.question}
                <br />
                <strong>A:</strong> {faq.answer}
              </div>
              <div className="faq-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(faq)}
                >
                  <FaEdit />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(faq._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FAQManager;
