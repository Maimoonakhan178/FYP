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
} from "@mui/material";

const IMG_BASE =
  "https://c602-2400-adc1-4a9-a00-47a-8f89-7a8c-c33c.ngrok-free.app/media/dish";
const FALLBACK = "https://via.placeholder.com/160x120?text=No+Image";

export default function DishRecommendation() {
  const [userEmail] = useState(() => {
    try {
      return localStorage.getItem("userEmail");
    } catch {
      return null;
    }
  });
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://c602-2400-adc1-4a9-a00-47a-8f89-7a8c-c33c.ngrok-free.app/recommend/dishes/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail }),
        }
      );
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      setDishes(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, [userEmail]);

  return (
    <Container maxWidth="md" sx={{ my: 6 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ textAlign: "center", color: "#ff5722", mt: 6 }}
      >
        Dish Recommendations
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress color="warning" />
        </Box>
      ) : (
        <Grid container spacing={3} mt={2} justifyContent="flex-start">
          {dishes.map((dish) => {
            const imgUrl = `${IMG_BASE}/${dish.dish_id}.jpg`;
            return (
              <Grid item xs={12} sm={6} md={4} key={dish.dish_id}>
                <Card
                  sx={{
                    display: "flex",
                    backgroundColor: "#fff8e1",
                    borderLeft: "6px solid #ff5722",
                    borderRadius: 2,
                    height: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    src={imgUrl}
                    alt={dish.dish_name}
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
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {dish.dish_name}
                    </Typography>
                    <Typography color="text.secondary" mb={1}>
                      {dish.category}
                    </Typography>
                    <Typography variant="body2" mb={1}>
                      {dish.description}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="#ff5722"
                      fontWeight="bold"
                    >
                      Rs. {dish.price}
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
