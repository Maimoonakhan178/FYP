import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "./Animation.json"; // Path to your animation JSON
import "./NewsletterSubscribe.css";

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  // Lottie animation settings
  const defaultOptions = {
    loop: true, // Loop the animation
    autoplay: true, // Autoplay the animation
    animationData: animationData, // Animation JSON data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="newsletter-container">
      <div className="newsletter-animation">
        {/* Lottie Animation */}
        <Lottie options={defaultOptions} height={250} width={250} />
      </div>

      <h2>Stay Updated!</h2>
      <p>Subscribe to our newsletter and never miss a great restaurant update.</p>

      {submitted ? (
        <p className="success-message">Thank you for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      )}
    </div>
  );
};

export default NewsletterSubscribe;
