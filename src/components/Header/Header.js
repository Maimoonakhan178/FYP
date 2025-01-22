import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./Logo.webp";
import "./Header.css";
import { Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WriteReview from "./writeareview"; // Import WriteReview component
import Avatar from "@mui/material/Avatar"; // Import Avatar component
import Stack from "@mui/material/Stack"; // Import Stack component

// Helper function to generate color based on string (used for Avatar)
function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0].toUpperCase()}`,
  };
}
const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.name ? user.name.charAt(0).toUpperCase() : "U");
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(""); // Store location name

  // Function to fetch location name based on latitude and longitude
  const getLocationName = async (latitude, longitude) => {
    const API_KEY = "AIzaSyAz3I5oxXOCDhnxbteGn9osc-M3DeHE_Iw"; // Replace with your API key
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        setLocationName(formattedAddress); // Set the location name
      } else {
        console.error("No location found for these coordinates");
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  // Fetch user's location and set coordinates and name
  const handleFetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getLocationName(latitude, longitude); // Get location name after coordinates
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
          <a className="nav-link" href="/restaurant">
            Restaurants
          </a>
          <a className="nav-link" href="/blog">
            Blog
          </a>
          <a className="nav-link" href="/survey">
            Survey
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

          {/* Display Location Name */}
          {locationName && (
            <span className="text-secondary" style={{ marginLeft: "10px" }}>
              {locationName}
            </span>
          )}

          {/* Actions */}
          <a className="nav-link" href="#" onClick={handleShowModal}>
            Write a Review
          </a>
          {user ? (
            <>
              <Stack direction="row" spacing={2}>
                <Avatar {...stringAvatar(user.name ? user.name : "User")} />
              </Stack>
            </>
          ) : (
            <a className="btn btn-outline-secondary" href="/login">
              Log In
            </a>
          )}
        </div>
      </div>

      {/* Modal Pop-Up for Write a Review */}
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
                <WriteReview
                  onSubmitReview={(reviewData) =>
                    console.log("Review submitted:", reviewData)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
