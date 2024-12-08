import React, { useState, useEffect } from "react";
import { getFAQs } from "../services/api"; // Adjust the path as needed
import './FAQs.css'; // Adjust the path as needed

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
    return <div className="centered-content">Loading FAQs...</div>; // Show loading state
  }

  return (
    <div className="centered-content">
      <h2>Frequently Asked Questions</h2>
      {faqData.map((faq, index) => (
        <div className="faq-item" key={faq._id} style={styles.faqItem}>
          <h3
            className="faq-question"
            style={styles.faqQuestion}
            onClick={() => toggleFAQ(index)}
          >
            {faq.question}
          </h3>
          <p
            className={`faq-answer ${activeIndex === index ? "active" : ""}`}
            style={{
              ...styles.faqAnswer,
              display: activeIndex === index ? "block" : "none",
            }}
          >
            {faq.answer}
          </p>
        </div>
      ))}
    </div>
  );
};

// Inline Styles
const styles = {
  faqItem: {
    margin: "1.5rem 0",
    textAlign: "left",
  },
  faqQuestion: {
    fontWeight: "bold",
    cursor: "pointer",
    color: "#fff",
    padding: "0.5rem 0",
  },
  faqAnswer: {
    color: "#fff",
    paddingLeft: "1rem",
  },
};

export default FAQs;
