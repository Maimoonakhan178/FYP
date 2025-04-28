import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

// Card component for each restaurant
const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        cursor: "pointer",
      }}
      onClick={() => navigate(`https://api.logsaga.com/api/restaurant/${encodeURIComponent(restaurant.name)}`)}
    >
      <CardMedia
        sx={{ height: 200 }}
        image={restaurant.image || "/placeholder.jpg"} // fallback placeholder
        title={restaurant.name}
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {restaurant.name}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" sx={{ my: 1 }}>
          <Rating
            name={`rating-${restaurant.name}`}
            value={restaurant.average_rating}
            precision={0.1}
            readOnly
            emptyIcon={<StarIcon sx={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          <Typography variant="body2" sx={{ ml: 1, color: "#888" }}>
            {restaurant.average_rating} ({restaurant.reviews_count || 0} reviews)
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ color: "#888", mb: 1 }}>
          {restaurant.location_name}
        </Typography>

        <Typography variant="body2" sx={{ color: "#555" }}>
          Cuisines: {restaurant.cuisine_type.join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Main Restaurants page
export default function Restaurants() {
  // server data
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // client-side filters
  const [activeFilters, setActiveFilters] = useState(["All"]);
  const filters = ["All", "Expensive", "Mid-range", "Budget", "Open Now"];

  // backend filters
  const [minRating, setMinRating] = useState(0.0);
  const [cuisine, setCuisine] = useState("");

  // fetch on mount or when backend filters change
  useEffect(() => {
    setLoading(true);
    setError(null);

    const qs = new URLSearchParams();
    if (minRating) qs.set("minRating", minRating.toString());
    if (cuisine) qs.set("cuisine", cuisine);

    fetch(`https://api.logsaga.com/api/restaurants?${qs.toString()}`, { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
        }
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          return res.json();
        } else {
          const body = await res.text();
          throw new Error(`Expected JSON but got ${contentType} - ${body.substring(0,200)}...`);
        }
      })
      .then((data) => setRestaurants(data))
      .catch((err) => {
        console.error("Fetch /api/restaurants failed:", err);
        setError(err.message || "Failed to load restaurants");
      })
      .finally(() => setLoading(false));
  }, [minRating, cuisine]);

  // toggle client-side filters
  const toggleFilter = (filter) => {
    if (filter === "All") return setActiveFilters(["All"]);
    setActiveFilters((prev) => {
      const next = prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev.filter((f) => f !== "All"), filter];
      return next.length ? next : ["All"];
    });
  };

  // apply client-side filtering
  const filteredRestaurants = restaurants.filter((r) => {
    if (activeFilters.includes("All")) return true;
    const now = new Date().toTimeString().slice(0, 5);
    return activeFilters.every((filter) => {
      if (["Expensive", "Mid-range", "Budget"].includes(filter)) {
        return r.priceCategory === filter;
      }
      if (filter === "Open Now") {
        return now < (r.openUntil || "23:59");
      }
      return true;
    });
  });

  return (
    <Container>
      <Box mt={8} mb={4} textAlign="center">
        <Typography variant="h4" fontWeight="bold">
          Explore the best dining experiences in Karachi
        </Typography>

        {/* Backend filter controls */}
        <Box my={2} display="flex" justifyContent="center" gap={2}>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={minRating}
            onChange={(e) => setMinRating(parseFloat(e.target.value) || 0)}
            placeholder="Min Rating"
          />
          <input
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            placeholder="Cuisine (e.g. Pakistani)"
          />
        </Box>

        {/* Client-side filters */}
        <Box>
          {filters.map((f) => (
            <Button
              key={f}
              variant={activeFilters.includes(f) ? "contained" : "outlined"}
              sx={{ mr: 1, mb: 1 }}
              onClick={() => toggleFilter(f)}
            >
              {f}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Loader, error or grid */}
      {loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}
        >
          <CircularProgress size={60} />
        </Box>
      ) : error ? (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredRestaurants.map((rest) => (
            <Grid key={rest.restaurant_id} item xs={12} sm={6} md={4}>
              <RestaurantCard restaurant={rest} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
