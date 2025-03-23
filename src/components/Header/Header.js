import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  Box,
  Container,
  Avatar,
  Stack,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Logo from "./Logo.png";

// Helper function: Generate color-based Avatar
function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      color: "white",
      fontWeight: "bold",
    },
    children: `${name[0].toUpperCase()}`,
  };
}

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [locationName, setLocationName] = useState("");

  const handleFetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationName(`Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`);
        },
        (error) => {
          console.error("Location error:", error);
          alert("Enable location services.");
        }
      );
    } else {
      alert("Geolocation not supported");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "#FFD700",
        borderRadius: "10px",
        padding: "8px 0",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Left Side - Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {["Home", "Restaurants", "Recommendation", "Contact"].map((item) => (
              <Button key={item} sx={{ fontSize: "16px", fontWeight: "bold", color: "#000", textTransform: "capitalize", transition: "0.3s", "&:hover": { color: "#D84315" } }}>
                {item}
              </Button>
            ))}
          </Box>

          <img
  src={Logo}
  alt="Food Junction"
  style={{
    height: 62,
    width: 60, // Ensures it's a perfect circle
    borderRadius: "50%", // Makes the image round
    objectFit: "cover", // Ensures the image fills the round shape properly
    margin: "0 auto",
  }}
/>

          {/* Right Side - Buttons & Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<LocationOnIcon />}
              onClick={handleFetchLocation}
              sx={{
                background: "#d32323",
                color: "white",
                borderRadius: "20px",
                padding: "10px 20px",
                "&:hover": { background: "#E64A19" },
              }}
            >
              Get Location
            </Button>

            <Button
              variant="contained"
              sx={{
                background: "#FF5722",
                color: "white",
                borderRadius: "20px",
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: "bold",
                "&:hover": { background: "#E64A19" },
              }}
              onClick={() => alert("Write a Review Modal Placeholder")}
            >
              Write a Review
            </Button>

            {user ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar {...stringAvatar(user.name || "User")} />
                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{
                    borderColor: "#0000",
                    color: "#0000",
                    borderRadius: "8px",
                    "&:hover": { bgcolor: "#d32323", color: "#fffff" },
                  }}
                >
                  Log Out
                </Button>
              </Stack>
            ) : (
              <Button
              variant="contained"
              href="/login"
              sx={{
                backgroundColor: "#4CAF50", // Green background
                color: "#fff", // White text
                borderRadius: "8px",
                fontWeight: "bold",
                padding: "8px 16px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adding shadow
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#45A049", // Darker green on hover
                  boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)", // Stronger shadow on hover
                },
              }}
            >
              Log In
            </Button>
            
            
            )}
          </Box>

          {/* Mobile Drawer */}
          <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)} sx={{ display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>

          <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box sx={{ width: 250, p: 2 }}>
              {["Home", "Restaurants", "Recommendation", "Contact"].map((item) => (
                <Button key={item} onClick={() => setDrawerOpen(false)} sx={{ display: "block", textAlign: "left", fontSize: "18px", p: "8px" }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
