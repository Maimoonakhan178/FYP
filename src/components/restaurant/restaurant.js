import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Rating,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

// Header component
import Header from "../Header/Header";
// Footer component
import Footer from "../Footer/Footer";

const bistroImage = require('./bistro-gourmet.jpg');
const pizzaImage = require('./pizza-haven.jpg');
const burgerImage = require('./burger-bonanza.jpg');
const desiImage = require('./desi-delights.jpg');

const restaurants = [
  {
    name: "The Gourmet Bistro",
    priceCategory: "Expensive",
    rating: 4.8,
    reviews: 250,
    area: "DHA Phase 5",
    openUntil: "23:00",
    description: "Fine dining with a variety of gourmet dishes and a modern ambiance.",
    image: bistroImage,
  },
  {
    name: "Pizza Haven",
    priceCategory: "Budget",
    rating: 4.2,
    reviews: 120,
    area: "Clifton",
    openUntil: "22:00",
    description: "Delicious pizzas made with fresh ingredients at an affordable price.",
    image: pizzaImage,
  },
  {
    name: "Burger Bonanza",
    priceCategory: "Mid-range",
    rating: 4.3,
    reviews: 180,
    area: "Gulshan-e-Iqbal",
    openUntil: "01:00",
    description: "Juicy burgers made to perfection with a wide variety of toppings.",
    image: burgerImage,
  },
  {
    name: "Desi Delights",
    priceCategory: "Budget",
    rating: 4.1,
    reviews: 300,
    area: "Gulshan-e-Maymar",
    openUntil: "00:30",
    description: "Authentic desi food at its best, cooked with traditional spices.",
    image: desiImage,
  },
];

export default function Restaurants() {
  const [activeFilters, setActiveFilters] = useState(["All"]);

  const filters = ["All", "Expensive", "Mid-range", "Budget", "Open Now"];

  const toggleFilter = (filter) => {
    if (filter === "All") {
      setActiveFilters(["All"]); // Reset to show all
    } else {
      setActiveFilters((prevFilters) => {
        const updatedFilters = prevFilters.includes(filter)
          ? prevFilters.filter((f) => f !== filter)
          : [...prevFilters.filter((f) => f !== "All"), filter]; // Remove "All" if another filter is selected
        return updatedFilters.length === 0 ? ["All"] : updatedFilters; // Default to "All" if no filters are selected
      });
    }
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (activeFilters.includes("All")) return true; // Show all if "All" is selected

    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // "HH:MM" format

    return activeFilters.every((filter) => {
      if (filter === "Expensive" || filter === "Mid-range" || filter === "Budget") {
        return restaurant.priceCategory === filter;
      }
      if (filter === "Open Now") {
        return currentTime < restaurant.openUntil;
      }
      return true;
    });
  });

  return (
    <>
      <Header />

      <Container>
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Explore the best dining experiences in Karachi
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilters.includes(filter) ? "contained" : "outlined"}
                sx={{ marginRight: 1, marginBottom: 1 }}
                onClick={() => toggleFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </Box>
        </Box>

        <Grid container spacing={3}>
          {filteredRestaurants.map((restaurant) => (
            <Grid item xs={12} key={restaurant.name}>
              <Card
                sx={{
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                }}
              >
                <CardMedia
                  sx={{ height: 200 }}
                  image={restaurant.image}
                  title={restaurant.name}
                />
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {restaurant.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      {restaurant.priceCategory}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
                    <Rating
                      name={`rating-${restaurant.name}`}
                      value={restaurant.rating}
                      precision={0.1}
                      readOnly
                      emptyIcon={<StarIcon sx={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    <Typography variant="body2" sx={{ color: "#888", marginLeft: 1 }}>
                      {restaurant.rating} ({restaurant.reviews} reviews)
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "#888", marginBottom: 1 }}>
                    {restaurant.area} • Open until {restaurant.openUntil}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888", marginTop: 1 }}>
                    {restaurant.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </>
  );
}
