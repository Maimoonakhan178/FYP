import React, { useState, useEffect, useMemo } from "react";
import { Typography, TextField, Button, Container, Box } from "@mui/material";
import Lottie from "react-lottie"; // Import Lottie
import animationData1 from "./animation1.json";
import animationData2 from "./animation2.json";
import animationData3 from "./animation3.json";

const HeroSection = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Use useMemo to memoize the images and animations arrays
  const taglines = useMemo(
    () => [
      "Welcome to Foodie's Paradise",
      "Explore the best food spots in your city",
      "Find hidden culinary gems near you",
    ],
    []
  );

  const animations = useMemo(
    () => [animationData1, animationData2, animationData3],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % taglines.length); // Ensure correct cycling through slides
    }, 5000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [taglines.length]); // Only depend on the length of taglines

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() === "") {
      console.log("Please enter a search query");
    } else {
      onSearch(searchQuery); // Pass the search query to the parent
    }
  };

  // Lottie animation options
  const lottieOptions = {
    loop: true, // Make it loop
    autoplay: true, // Start automatically
    animationData: animations[currentSlide], // Select animation based on current slide
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9", // Use a light background color instead of an image
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "white",
        }}
      >
        <Box sx={{ flex: 1, paddingRight: 4 }}>
          {/* Slideshow text */}
          <Box
            className="slideshow"
            sx={{
              height: "auto",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                color: "#FF5722", // Orange color
                fontWeight: "bold",
                animation: `fadeIn 1s ease-in-out`, // Optional: Add fade-in effect for text
                textAlign: "center", // Ensure the text is centered
              }}
            >
              {taglines[currentSlide]}
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ mt: 3, color: "#FF5722" }}>
            Discover amazing food experiences
          </Typography>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="Search for restaurants..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
                mb: 2,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearchClick}
              sx={{
                width: "100%",
                borderRadius: 2,
                backgroundColor: "#ff5722",
                "&:hover": {
                  backgroundColor: "#e64a19",
                },
              }}
            >
              Search
            </Button>
          </Box>
        </Box>

        {/* Lottie Animation */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie options={lottieOptions} height={400} width={400} />{" "}
          {/* Add Lottie animation */}
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
