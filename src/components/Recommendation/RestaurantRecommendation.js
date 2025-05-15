import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Chip,
} from "@mui/material";

const IMG_BASE =
  "https://c602-2400-adc1-4a9-a00-47a-8f89-7a8c-c33c.ngrok-free.app/media/res";
const FALLBACK = "https://via.placeholder.com/160x120?text=No+Image";

export default function RestaurantRecommendation() {
  const [userEmail] = useState(() => {
    try {
      return localStorage.getItem("userEmail");
    } catch {
      return null;
    }
  });
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://c602-2400-adc1-4a9-a00-47a-8f89-7a8c-c33c.ngrok-free.app/recommend/restaurants/user",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail }),
          }
        );
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setRestaurants(Array.isArray(data) ? data : [data]);
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [userEmail]);

  return (
    <Container maxWidth="md" sx={{ my: 6 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ textAlign: "center", color: "#ff5722", mt: 6 }}
      >
        Restaurant Recommendations
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress color="warning" />
        </Box>
      ) : (
        <Grid container spacing={3} mt={2}>
          {restaurants.map((rest) => {
            const imgUrl = `${IMG_BASE}/${rest.restaurant_id}.jpg`;
            return (
              <Grid item xs={12} key={rest.restaurant_id}>
                <Card
                  sx={{
                    display: "flex",
                    backgroundColor: "#fff8e1",
                    borderLeft: "6px solid #ff5722",
                    borderRadius: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    src={imgUrl}
                    alt={rest.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK;
                    }}
                    sx={{
                      width: 160,
                      height: 120,
                      objectFit: "cover",
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {rest.name}
                    </Typography>
                    <Typography color="text.secondary">
                      {rest.location_name}
                    </Typography>
                    <Box mt={1} mb={1}>
                      {JSON.parse(rest.cuisine_type).map((c) => (
                        <Chip
                          key={c}
                          label={c}
                          sx={{ mr: 1, mb: 1, backgroundColor: "#fddf3f" }}
                        />
                      ))}
                    </Box>
                    <Typography variant="body2">
                      Rating: <strong>{rest.average_rating} ⭐</strong>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
}
