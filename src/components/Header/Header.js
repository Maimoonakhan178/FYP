import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from './Logo.webp'; // Import the image correctly
import "./Header.css";
const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img
            src={Logo} // Use Logo as the source for the image
            alt="Logo"
            style={{ height: "40px" }}
          />
        </a>

        {/* Navigation Links */}
        <nav className="navbar-nav me-auto mb-2 mb-lg-0">
          <a className="nav-link" href="/restaurants">
            Restaurants
          </a>
          <a className="nav-link" href="/home-services">
            Home Services
          </a>
          <a className="nav-link" href="/auto-services">
            Auto Services
          </a>
          <a className="nav-link" href="/more">
            More
          </a>
        </nav>

        {/* Actions */}
        <div className="d-flex align-items-center gap-3">
          <a className="nav-link" href="/write-a-review">
            Write a Review
          </a>
          <a className="btn btn-outline-secondary" href="/login">
            Log In
          </a>
          <a className="btn btn-danger" href="/signup">
            Sign Up
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
