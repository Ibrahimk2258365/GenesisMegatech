import React, { useState, useEffect } from "react";
import { getFAQs } from "../services/api"; // Adjust the path as needed
import "./FAQs.css"; // Adjust the path as needed

const FAQs = () => {
  const [faqData, setFaqData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await getFAQs();
        setFaqData(data);
      } catch (error) {
        setErrorMessage("Failed to load FAQs. Please try again later.");
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  if (errorMessage) {
    return <div className="faqs-error">{errorMessage}</div>;
  }

  if (!faqData.length) {
    return <div className="faqs-loading">Loading FAQs...</div>;
  }

  return (
    <div className="faqs-container">
      <h2 className="faqs-title">Frequently Asked Questions</h2>
      <div className="faqs-list">
        {faqData.map((faq, index) => (
          <div className="faq-item" key={faq._id}>
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span
                className={`faq-icon ${activeIndex === index ? "rotate" : ""}`}
              >
                {activeIndex === index ? "▲" : "▼"}
              </span>
            </div>
            <div
              className={`faq-answer ${activeIndex === index ? "active" : ""}`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
