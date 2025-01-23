import React, { useEffect, useState } from "react";
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
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(""); // Store location name

  useEffect(() => {
    if (user && location) {
      // Update location in localStorage
      user.location = location;
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [location]);

  const getLocationName = async (latitude, longitude) => {
    const API_KEY = "YOUR_GOOGLE_API_KEY"; // Replace with your API key
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

  const handleFetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          let locationString = `${latitude}, ${longitude}`;
          setLocation(locationString);
          getLocationName(latitude, longitude);
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

        {/* Navbar Toggler for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
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
        </div>

        {/* Location Button and User Actions */}
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

          {locationName && (
            <span className="text-secondary" style={{ marginLeft: "10px" }}>
              {locationName}
            </span>
          )}

          <a className="nav-link d-none d-md-block" href="#" onClick={handleShowModal}>
            Write a Review
          </a>

          {user ? (
            <Stack direction="row" spacing={2}>
              <Avatar {...stringAvatar(user.name || "User")} />
            </Stack>
          ) : (
            <a className="btn btn-outline-secondary" href="/login">
              Log In
            </a>
          )}
        </div>
      </div>

      {/* Modal for Write a Review */}
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
