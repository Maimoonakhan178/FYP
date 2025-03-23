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
import { useNavigate } from "react-router-dom";

import bistroImage from "./bistro-gourmet.jpg";
import pizzaImage from "./pizza-haven.jpg";
import burgerImage from "./burger-bonanza.jpg";
import desiImage from "./desi-delights.jpg";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        cursor: "pointer",
      }}
      onClick={() => navigate(`/restaurant/${encodeURIComponent(restaurant.name)}`)}
    >
      <CardMedia sx={{ height: 200 }} image={restaurant.image} title={restaurant.name} />
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
  );
};

// Restaurant Data
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
      setActiveFilters(["All"]);
    } else {
      setActiveFilters((prevFilters) => {
        const updatedFilters = prevFilters.includes(filter)
          ? prevFilters.filter((f) => f !== filter)
          : [...prevFilters.filter((f) => f !== "All"), filter];
        return updatedFilters.length === 0 ? ["All"] : updatedFilters;
      });
    }
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (activeFilters.includes("All")) return true;

    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);

    return activeFilters.every((filter) => {
      if (["Expensive", "Mid-range", "Budget"].includes(filter)) {
        return restaurant.priceCategory === filter;
      }
      if (filter === "Open Now") {
        return currentTime < restaurant.openUntil;
      }
      return true;
    });
  });

  return (
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
          <Grid item xs={12} sm={6} md={4} key={restaurant.name}>
            <RestaurantCard restaurant={restaurant} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
