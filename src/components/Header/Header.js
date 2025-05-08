// src/components/Header/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(() => {
    // lazy-init from localStorage
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });
  const [scrolled, setScrolled] = useState(false);

  // listen for scroll to adjust transparency
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keep local `user` in sync if something else writes to localStorage
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "user") {
        try {
          setUser(JSON.parse(e.newValue));
        } catch {
          setUser(null);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: "10px", left: "50%",
        transform: "translateX(-50%)",
        width: "85%",
        background: scrolled ? "rgba(255,215,0,0.6)" : "rgba(255,215,0,0.75)",
        backdropFilter: "blur(20px)",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.2)",
        borderRadius: "14px",
        transition: "0.3s ease-in-out",
        padding: "8px 0",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Left nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {[
              { name: "Home", path: "/" },
              { name: "Restaurants", path: "/restaurant" },
              { name: "Dish", path: "/dish" },
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

          {/* Right side */}
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
                <Avatar sx={{ bgcolor: "#FF5722" }}>
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </Avatar>
                <Button
                  variant="outlined"
                  onClick={handleLogout}
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

          {/* Mobile menu */}
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { md: "none" } }}
          >
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
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  sx={{ display: "block", textAlign: "left" }}
                  onClick={() => setDrawerOpen(false)}
                >
                  {item.name}
                </Button>
              ))}
              {user && (
                <Button
                  sx={{ display: "block", textAlign: "left", mt: 2 }}
                  onClick={() => {
                    setDrawerOpen(false);
                    handleLogout();
                  }}
                >
                  Log Out
                </Button>
              )}
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
