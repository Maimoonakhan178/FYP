import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "./Animation.json"; // Path to your animation JSON
import "./NewsletterSubscribe.css";

const NewsletterSubscribe = () => {
  // Safely parse user data from localStorage
  let storedUser;
  try {
    storedUser = JSON.parse(localStorage.getItem("user")) || {};
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    storedUser = {}; // Ensure storedUser is always an object
  }

  const [email, setEmail] = useState(storedUser.email || ""); // Initialize with user email if available
  const [submitted, setSubmitted] = useState(false);
  const [submittedMsg, setSubmittedMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      console.log("Please enter a valid email.");
      return;
    }

    try {
      const form = new FormData();
      form.append("email", email);

      const response = await fetch("http://127.0.0.1:5000/api/newsletter", {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmittedMsg(data.message || "Subscription successful!");
        setSubmitted(true);
      } else {
        console.log(data.message || "Subscription failed. Please try again.");
      }
    } catch (err) {
      console.log("An error occurred while subscribing. Please try again.");
    }
  };

  // Lottie animation settings
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="newsletter-container">
      <div className="newsletter-animation">
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
