import React, { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from './Animation.json';
import './Footer.css';

const Footer = () => {
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false); // Popup visibility
  const [reviewText, setReviewText] = useState(''); // Review text state

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
    setReviewText('');
  };

  // Handle Review Submission
  const handleReviewSubmit = async () => {
    if (!reviewText.trim()) {
      alert('Please enter a review before submitting.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review: reviewText }),
      });

      if (!response.ok) {
        throw new Error('Failed to save the review');
      }

      const data = await response.json();
      console.log('Review saved successfully:', data);
      alert('Your review has been submitted successfully!');
      closeReviewPopup();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit the review. Please try again later.');
    }
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

      {/* Review Popup */}
      {isReviewPopupOpen && (
        <div className="popup-overlay" onClick={closeReviewPopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closeReviewPopup}>
              ✖
            </button>
            <h2>Write a Review</h2>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your thoughts..."
              rows="5"
              style={{ width: '100%', margin: '10px 0', padding: '10px' }}
            ></textarea>
            <button onClick={handleReviewSubmit} className="popup-submit">
              Submit Review
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
