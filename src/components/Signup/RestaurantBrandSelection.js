import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  Grid,
  Typography,
  CircularProgress,
  Container,
  Fade,
  Chip,
  Divider,
  Tooltip
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function RestaurantBrandSelection() {
  const [brands, setBrands] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/interactive/restaurant-brands")
      .then((r) => r.json())
      .then((data) => setBrands(data))
      .catch((error) => {
        console.error("Failed to fetch restaurant brands:", error);
        // Show some fallback data in development
        if (process.env.NODE_ENV === "development") {
          setBrands([
            { name: "Pizza Hut", cuisine: "Italian" },
            { name: "McDonald's", cuisine: "Fast Food" },
            { name: "Starbucks", cuisine: "Coffee & Bakery" },
            { name: "Subway", cuisine: "Sandwiches" },
            { name: "Domino's", cuisine: "Pizza" },
            { name: "KFC", cuisine: "Fried Chicken" },
            { name: "Taco Bell", cuisine: "Mexican" },
            { name: "Burger King", cuisine: "Burgers" }
          ]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const toggle = (name) => {
    setSelected((s) =>
      s.includes(name) ? s.filter((n) => n !== name) : [...s, name]
    );
  };

  const next = () => {
    if (selected.length !== 3) {
      alert("Please pick exactly 3 brands");
      return;
    }
    nav("/select-branches", { state: { brands: selected } });
  };

  const getRandomGradient = (brandName) => {
    // Generate a deterministic but visually pleasing gradient based on the brand name
    const hash = brandName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue1 = hash % 360;
    const hue2 = (hue1 + 40) % 360;
    return `linear-gradient(135deg, hsl(${hue1}, 70%, 80%), hsl(${hue2}, 85%, 70%))`;
  };

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{ backgroundColor: "#f9f9f9" }}
      >
        <CircularProgress size={60} sx={{ color: "#4CAF50" }} />
        <Typography variant="h6" color="textSecondary" mt={3}>
          Loading restaurant brands...
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={6} textAlign="center">
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            background: "linear-gradient(45deg, #4CAF50, #2196F3)",
            backgroundClip: "text",
            color: "transparent",
            WebkitBackgroundClip: "text",
            textShadow: "0px 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          Select Your Favorite Restaurants
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <RestaurantIcon sx={{ mr: 1, color: "#4CAF50" }} />
          <Typography variant="h6" color="textSecondary">
            Choose <strong>exactly 3 brands</strong> to continue
          </Typography>
        </Box>
        
        <Box mb={1}>
          <Chip 
            label={`${selected.length}/3 selected`} 
            color={selected.length === 3 ? "success" : "default"}
            variant={selected.length === 3 ? "filled" : "outlined"}
            icon={selected.length === 3 ? <CheckCircleIcon /> : undefined}
            sx={{ fontSize: '1rem', px: 1 }}
          />
        </Box>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {brands.map((brand, index) => {
          const isSelected = selected.includes(brand.name);

          return (
            <Grid key={brand.name} item xs={12} sm={6} md={4}>
              <Fade in={true} timeout={300 + index * 100}>
                <Card
                  sx={{
                    height: 290,
                    borderRadius: 3,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    transform: isSelected ? "translateY(-8px)" : "none",
                    border: isSelected ? "2px solid #4CAF50" : "none",
                    boxShadow: isSelected
                      ? "0 12px 20px rgba(76, 175, 80, 0.2)"
                      : "0 5px 15px rgba(0,0,0,0.08)",
                    position: "relative",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => toggle(brand.name)}
                    sx={{ height: "100%" }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        height: 160,
                        background: getRandomGradient(brand.name),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 800,
                          color: "white",
                          textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                          letterSpacing: 1,
                        }}
                      >
                        {brand.name.substring(0, 1)}
                      </Typography>
                    </CardMedia>

                    <CardContent sx={{ position: "relative", zIndex: 1 }}>
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {brand.name}
                      </Typography>
                      {brand.cuisine && (
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {brand.cuisine}
                        </Typography>
                      )}
                    </CardContent>
                  </CardActionArea>

                  {isSelected && (
                    <CheckCircleIcon
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        color: "white",
                        backgroundColor: "#4CAF50",
                        borderRadius: "50%",
                        fontSize: 28,
                        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                        transition: "all 0.2s ease",
                        animation: "pulse 1.5s infinite",
                        "@keyframes pulse": {
                          "0%": {
                            boxShadow: "0 0 0 0 rgba(76, 175, 80, 0.7)",
                          },
                          "70%": {
                            boxShadow: "0 0 0 10px rgba(76, 175, 80, 0)",
                          },
                          "100%": {
                            boxShadow: "0 0 0 0 rgba(76, 175, 80, 0)",
                          },
                        },
                      }}
                    />
                  )}
                </Card>
              </Fade>
            </Grid>
          );
        })}
      </Grid>

      <Box
        mt={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "sticky",
          bottom: 20,
          zIndex: 10,
        }}
      >
        <Tooltip 
          title={selected.length !== 3 ? "Please select exactly 3 restaurant brands" : ""}
          arrow
        >
          <span>
            <Button
              variant="contained"
              size="large"
              disabled={selected.length !== 3}
              onClick={next}
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 3,
                fontSize: "1.1rem",
                fontWeight: "bold",
                textTransform: "none",
                backgroundColor: selected.length === 3 ? "#4CAF50" : "#e0e0e0",
                boxShadow: selected.length === 3 ? "0 4px 14px rgba(76, 175, 80, 0.4)" : "none",
                "&:hover": {
                  backgroundColor: selected.length === 3 ? "#43A047" : "#e0e0e0",
                  transform: selected.length === 3 ? "translateY(-2px)" : "none",
                  boxShadow: selected.length === 3 ? "0 6px 20px rgba(76, 175, 80, 0.6)" : "none",
                },
                transition: "all 0.3s ease",
              }}
            >
              Continue to Branch Selection
            </Button>
          </span>
        </Tooltip>
      </Box>
      
      {selected.length > 0 && (
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Selected brands: {selected.join(", ")}
          </Typography>
        </Box>
      )}
    </Container>
  );
}