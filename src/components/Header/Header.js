import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./Logo.webp";
import "./Header.css";
import { Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState(null);

  // Fetch user's location on button click
  const handleFetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img src={Logo} alt="Logo" style={{ height: "40px" }} />
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

        {/* Location Button */}
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="contained"
            startIcon={<LocationOnIcon />}
            onClick={handleFetchLocation}
            sx={{
              background: "#d32323",
              color: "white",
              borderRadius: "20px",
              padding: "10px 20px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s ease",
              "&:hover": {
                background: "linear-gradient(45deg, #e64a19, #f57c00)",
                transform: "scale(1.05)",
              },
            }}
          >
            Get Location
          </Button>

          {/* Display Fetched Location */}
          {location && (
            <span className="text-secondary">
              {location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}
            </span>
          )}

          {/* Actions */}
          <a className="nav-link" href="#" onClick={handleShowModal}>
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

      {/* Modal Pop-Up */}
      {showModal && (
        <div
          className="modal show"
          style={{ display: "block" }}
          aria-labelledby="writeReviewModal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="writeReviewModal">
                  Write a Review
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="reviewTitle" className="form-label">
                      Review Title
                    </label>
                    <input type="text" className="form-control" id="reviewTitle" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="reviewBody" className="form-label">
                      Review
                    </label>
                    <textarea
                      className="form-control"
                      id="reviewBody"
                      rows="4"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
