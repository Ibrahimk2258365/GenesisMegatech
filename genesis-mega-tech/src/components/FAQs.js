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
        setFaqData(data); // Populate state with FAQ data
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
    return <div className="centered-content error">{errorMessage}</div>;
  }

  if (!faqData.length) {
    return <div className="centered-content">Loading FAQs...</div>;
  }

  return (
    <div className="centered-content">
      <h2>Frequently Asked Questions</h2>
      {faqData.map((faq, index) => (
        <div className="faq-item" key={faq._id}>
          <div
            className="faq-question"
            onClick={() => toggleFAQ(index)}
          >
            {faq.question}
            <span
              className={`faq-icon ${activeIndex === index ? "rotate" : ""}`}
            >
              {activeIndex === index ? "▼" : "▶"} {/* Using simple arrow icons */}
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
  );
};

export default FAQs;
