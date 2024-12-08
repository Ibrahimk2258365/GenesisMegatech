import React from "react";

const ContactUs = () => {
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
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    }
  };

  return (
    <div className="centered-content">
      <h2>Contact Us</h2>
      <p>If you have any questions or inquiries, feel free to reach out to us using the form below.</p>

      <form className="contact-form" style={styles.contactForm} onSubmit={handleSubmit}>
        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            style={styles.input}
            required
          />
        </div>
        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            style={styles.input}
            required
          />
        </div>
        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="message" style={styles.label}>Message</label>
          <textarea
            name="message" // Required for Web3Forms
            className="form-control"
            id="message"
            rows="4"
            placeholder="Type your message here"
            style={styles.textarea}
            required
          ></textarea>
        </div>
        <button type="submit" style={styles.button}>
          Send Message
        </button>
      </form>
    </div>
  );
};

// Inline Styles
const styles = {
  contactForm: {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  textarea: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    resize: "none",
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    border: "none",
    padding: "0.75rem",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

export default ContactUs;
