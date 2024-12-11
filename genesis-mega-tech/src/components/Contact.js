import React, { useState } from "react";
import "./contact.css";

const ContactUs = () => {
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    formData.append("access_key", "a5859459-d35f-4de5-aec4-0e488f506633");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      setFormStatus("success");
      e.target.reset();
    } else {
      setFormStatus("error");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2>Get in Touch</h2>
        <p>We’d love to hear from you! Fill out the form below and we’ll get back to you as soon as possible.</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            placeholder="Type your message here"
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">
          Send Message
        </button>
      </form>

      {formStatus === "success" && (
        <div className="form-status success">
          Your message has been sent successfully. Thank you!
        </div>
      )}
      {formStatus === "error" && (
        <div className="form-status error">
          Oops! Something went wrong. Please try again.
        </div>
      )}
    </div>
  );
};

export default ContactUs;
