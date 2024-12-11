import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedin,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import {
  faHome,
  faEnvelope,
  faPhone,
  faPrint,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link for internal routing
import './footer.css'; // Import the CSS with animations

const Footer = () => {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (footerRef.current) {
      const rect = footerRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        setIsVisible(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`footer text-center text-lg-start bg-dark text-muted ${
        isVisible ? 'visible' : ''
      }`}
    >
      <section className="social-media d-flex justify-content-center justify-content-lg-between p-4">
        <div className="me-5 d-none d-lg-block">
          <span className="social-text">Connect with Genesis Mega-Tech:</span>
        </div>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="me-4 text-reset social-icon">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="me-4 text-reset social-icon">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="me-4 text-reset social-icon">
            <FontAwesomeIcon icon={faGoogle} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="me-4 text-reset social-icon">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="me-4 text-reset social-icon">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="me-4 text-reset social-icon">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </section>

      <section className="footer-content">
        <div className="text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 footer-item">
              <h6 className="text-uppercase fw-bold mb-4 footer-title">
                <FontAwesomeIcon icon={faHome} className="me-3" />
                Genesis Mega-Tech
              </h6>
              <p className="footer-description">
                Genesis Mega-Tech is a consulting firm specializing in energy, climate change, and IT solutions, committed to delivering sustainable and secure solutions across sectors.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 footer-item">
              <h6 className="text-uppercase fw-bold mb-4 footer-title">Core Areas</h6>
              <p><a href="#!" className="text-reset footer-link">Energy Solutions</a></p>
              <p><a href="#!" className="text-reset footer-link">Climate Change</a></p>
              <p><a href="#!" className="text-reset footer-link">IT Solutions</a></p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 footer-item">
              <h6 className="text-uppercase fw-bold mb-4 footer-title">Useful Links</h6>
              <p><Link to="/projects" className="text-reset footer-link">Our Projects</Link></p> {/* Link to Projects page */}
              <p><Link to="/team" className="text-reset footer-link">Team Expertise</Link></p> {/* Link to Team Expertise page */}
              <p><a href="#!" className="text-reset footer-link">Memberships</a></p>
              <p><Link to="/contact" className="text-reset footer-link">Contact Us</Link></p> {/* Link to Contact Us page */}
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 footer-item">
              <h6 className="text-uppercase fw-bold mb-4 footer-title">Contact</h6>
              <p><FontAwesomeIcon icon={faHome} className="me-3" /> Islamabad, Pakistan</p>
              <p><FontAwesomeIcon icon={faEnvelope} className="me-3" /> genesismegat@gmail.com</p>
              <p><FontAwesomeIcon icon={faPhone} className="me-3" /> +92 321 9803861</p>
              <p><FontAwesomeIcon icon={faPrint} className="me-3" /> +92 321 9803861</p>
            </div>
          </div>
        </div>
      </section>

      <div className="footer-bottom text-center p-4">
        © 2024 Genesis Mega-Tech. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
