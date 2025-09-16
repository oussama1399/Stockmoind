import React from 'react';
import { FaPhone, FaLink, FaHeart } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="chatty-pixel-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">💬</div>
              <span className="logo-text">ChattyPixel</span>
            </div>
          </div>

          <div className="footer-info">
            <div className="footer-item">
              <FaPhone className="footer-icon" />
              <span>+212 634 350 272</span>
            </div>
            <div className="footer-item">
              <FaLink className="footer-icon" />
              <a href="#" className="footer-link">Politique de confidentialité</a>
            </div>
          </div>

          <div className="footer-tagline">
            <span>Propulsé avec <FaHeart className="heart-icon" /> par ChattyPixel</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 ChattyPixel. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;