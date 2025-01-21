import React, { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from './Animation.json';
import './Footer.css';
import WriteReview from '../Header/writeareview'; // Corrected path based on your folder structure

const Footer = () => {
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // Open Review Popup
  const openReviewPopup = () => {
    setIsReviewPopupOpen(true);
  };

  // Close Review Popup
  const closeReviewPopup = () => {
    setIsReviewPopupOpen(false);
  };

  // Handle Review Submission
  const handleReviewSubmit = (reviewData) => {
    console.log('Review submitted:', reviewData);
    alert('Your review has been submitted successfully!');
    closeReviewPopup();
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Foodie</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li
              onClick={openReviewPopup}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              Write a Review
            </li>
            <li>Blog</li>
            <li>Help Center</li>
          </ul>
        </div>

        <div className="footer-section">
          <div className="footer-animation">
            <Lottie options={defaultOptions} height={200} width={100} />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-legal">
          <p>© 2024 Foodie LLC All rights reserved.</p>
        </div>
      </div>

      {/* Render Review Popup */}
      {isReviewPopupOpen && (
        <div className="popup-overlay" onClick={closeReviewPopup}>
          <div className="popup-container" onClick={(e) => e.stopPropagation()}>
            <WriteReview
              onSubmitReview={handleReviewSubmit}
              onClose={closeReviewPopup}
            />
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
