import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "./Animation.json"; // Path to your animation JSON
import "./NewsletterSubscribe.css";

const NewsletterSubscribe = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedMsg, setSubmittedMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email || user.email) {
      const formSubmit = async () => {
      try {
        // Create a new FormData object
        const form = new FormData();
        form.append("email", user.email ? user.email : email); // Field name and value


        // Send the POST request
        const response = await fetch('http://127.0.0.1:5000/api/newsletter', {
          method: 'POST',
          body: form,
        });

        const data = await response.json();

        if (response.ok) {
          setSubmittedMsg(data.message);
        } else {
          console.log(data.message || 'Search failed. Please try again.');
        }
      } catch (err) {
        console.log('An error occurred while searching. Please try again.');
      }
    }
    if (email || user.email) {
      formSubmit();
      setSubmitted(true);
    }
      
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
        <p className="success-message">{submittedMsg}</p>
      ) : (
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={user.email ? user.email : email}
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
