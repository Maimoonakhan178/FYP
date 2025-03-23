import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "./Animation.json";
import { IconButton } from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from "@mui/icons-material";

const Footer = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Left Section: Navigation */}
        <div style={styles.navSection}>
          <ul style={styles.navList}>
            <li style={styles.navItem}>Home</li>
            <li style={styles.navItem}>Restaurants</li>
            <li style={styles.navItem}>Recommendation</li>
            <li style={styles.navItem}>Contact</li>
          </ul>
        </div>

        {/* Right Section: Animation & Copyright */}
        <div style={styles.rightSection}>
          <div style={styles.animation}>
            <Lottie options={defaultOptions} height={100} width={100} />
          </div>
          <p style={styles.copyright}>© 2024 Foodie LLC. All rights reserved.</p>
          <div style={styles.socialIcons}>
            {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, index) => (
              <IconButton key={index} style={styles.iconButton}>
                <Icon style={styles.icon} />
              </IconButton>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
const styles = {
  footer: {
    backgroundColor: "#FF5722", // Orange color
    color: "white",
    padding: "10px 20px", // Further reduced padding
    textAlign: "center",
    borderTop: "2px solid #e67e22", // Subtle border
  },

  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1100px",
    margin: "auto",
    flexWrap: "wrap",
  },

  navList: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    gap: "15px", // Reduced gap
  },

  animation: {
    marginBottom: "5px", // Less spacing below animation
  },

  copyright: {
    fontSize: "12px", // Smaller text
    marginBottom: "5px", // Less space below text
  },

  socialIcons: {
    display: "flex",
    gap: "8px", // Less spacing between icons
  },

  icon: {
    fontSize: "20px", // Slightly smaller icons
  },
};


export default Footer;
