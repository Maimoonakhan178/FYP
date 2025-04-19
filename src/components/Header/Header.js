import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Logo from "./Logo.png";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        top: "10px", // Moves it closer to the top
        left: "50%",

        transform: "translateX(-50%)", // Centers it horizontally
        width: "85%", // Slightly smaller for a floating effect
        background: scrolled
          ? "rgba(255, 215, 0, 0.6)" // More transparency when scrolled
          : "rgba(255, 215, 0, 0.75)", // Slightly transparent initially
        backdropFilter: "blur(20px)", // Stronger blur effect
        boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)", // Floating effect
        borderRadius: "14px", // More refined roundness
        transition: "0.3s ease-in-out",
        padding: "8px 0",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Left Side - Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {[
              { name: "Home", path: "/" },
              { name: "Restaurants", path: "/restaurant" },
              { name: "Recommendation", path: "/recommendation" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.path}
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#000",
                  textTransform: "capitalize",
                  "&:hover": { color: "#D84315" },
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {/* Logo */}
          <img
            src={Logo}
            alt="Food Junction"
            style={{
              height: 55,
              width: 55,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          {/* Right Side - Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<LocationOnIcon />}
              sx={{
                background: "#d32323",
                color: "white",
                borderRadius: "20px",
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
                fontWeight: "bold",
                "&:hover": { background: "#E64A19" },
              }}
            >
              Write a Review
            </Button>

            {user ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar>{user.name[0]}</Avatar>
                <Button
                  variant="outlined"
                  onClick={() => {
                    localStorage.removeItem("user");
                    setUser(null);
                  }}
                  sx={{
                    borderColor: "#000",
                    color: "#000",
                    "&:hover": { bgcolor: "#d32323", color: "#fff" },
                  }}
                >
                  Log Out
                </Button>
              </Stack>
            ) : (
              <Button
                variant="contained"
                component={Link}
                to="/login"
                sx={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#45A049" },
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
              {[
                { name: "Home", path: "/" },
                { name: "Restaurants", path: "/restaurant" },
                { name: "Recommendation", path: "/recommendation" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <Button key={item.name} component={Link} to={item.path} sx={{ display: "block", textAlign: "left" }}>
                  {item.name}
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
