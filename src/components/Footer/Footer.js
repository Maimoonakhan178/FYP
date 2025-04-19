import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import Lottie from "react-lottie";
import animationData from "./Animation.json";
import { IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

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
        
        {/* Left Section: Navigation Links */}
        <div style={styles.navSection}>
          <ul style={styles.navList}>
            <li style={styles.navItem}><Link to="/" style={styles.link}>Home</Link></li>
            <li style={styles.navItem}><Link to="/restaurant" style={styles.link}>Restaurants</Link></li>
            <li style={styles.navItem}><Link to="/restaurantrecommendation" style={styles.link}>Restaurant Recommendation</Link></li>
            <li style={styles.navItem}><Link to="/survey" style={styles.link}>Survey</Link></li>
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
    backgroundColor: "#FF5722", 
    color: "white",
    padding: "15px 20px", 
    textAlign: "center",
    borderTop: "2px solid #e67e22",
    borderRadius: "20px 20px 0 0", // Rounded only at the top
    marginTop: "20px", // Adds spacing between content and footer
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
    gap: "15px", 
  },

  navItem: {
    fontSize: "18px",
    fontWeight: "bold",
  },

  link: {
    textDecoration: "none",
    color: "white",
    transition: "color 0.3s",
  },

  linkHover: {
    color: "#FFD700", // Gold on hover
  },

  animation: {
    marginBottom: "5px", 
  },

  copyright: {
    fontSize: "12px", 
    marginBottom: "5px", 
  },

  socialIcons: {
    display: "flex",
    gap: "8px", 
  },

  icon: {
    fontSize: "20px", 
  },
};


export default Footer;
