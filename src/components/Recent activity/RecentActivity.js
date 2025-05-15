// src/components/RecentActivity/RecentActivity.jsx
import React, { useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Grid,
  Chip,
  Avatar,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
const REST_IMG_BASE =
  "https://c602-2400-adc1-4a9-a00-47a-8f89-7a8c-c33c.ngrok-free.app/media/res";
const FALLBACK =
  "https://via.placeholder.com/300x169?text=No+Image";
const RecentActivity = () => {
  const [reviews, setReviews] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://c602-2400-adc1-4a9-a00-47a-8f89-7a8c-c33c.ngrok-free.app/api/recent",
          { method: "POST" }
        );
        const data = await res.json();
        setReviews(data.reviews ?? []);
      } catch (e) {
        console.error("Failed to fetch reviews", e);
      }
    })();
  }, []);

  const shown = showAll ? reviews : reviews.slice(0, 6);

  const getSentimentIcon = (s) =>
    s === "POS" ? (
      <SentimentSatisfiedIcon color="success" />
    ) : s === "NEG" ? (
      <SentimentVeryDissatisfiedIcon color="error" />
    ) : (
      <SentimentSatisfiedIcon color="disabled" />
    );

  const formatDate = (ts) =>
    new Date(ts).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <Box sx={{ py: 6, backgroundColor: "#fafafa" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        Recent Restaurant Reviews
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {shown.map((r) => {
          // Determine image URL or fallback
          const imgUrl = r.restaurant_id
            ? `${REST_IMG_BASE}/${r.restaurant_id}.jpg`
            : FALLBACK;
          return (
            <Grid
              item
              key={r.review_id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                sx={{
                  width: 300,
                  height: 400,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  boxShadow: 2,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": { boxShadow: 6, transform: "translateY(-6px)" },
                }}
              >
                <CardActionArea
                  sx={{ flexGrow: 1 }}
                  onClick={() => setSelected(r)}
                >
                  <CardMedia
                    component="img"
                    src={`${REST_IMG_BASE}/${r.restaurant_id}.jpg`}
                    alt={r.restaurant_name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK;
                    }}
                    sx={{ width: "100%", height: 169, objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <RestaurantIcon sx={{ color: "primary.main", mr: 1 }} />
                      <Typography variant="subtitle1" noWrap>
                        {r.restaurant_name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2, color: "#555" }}>
                      {r.review_text.length > 100
                        ? r.review_text.slice(0, 100) + "…"
                        : r.review_text}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Chip
                        icon={getSentimentIcon(r.overall_sentiment)}
                        label={r.overall_sentiment}
                        size="small"
                        color={
                          r.overall_sentiment === "POS"
                            ? "success"
                            : r.overall_sentiment === "NEG"
                            ? "error"
                            : "default"
                        }
                      />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(r.timestamp)}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {reviews.length > 6 && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button variant="outlined" onClick={() => setShowAll((p) => !p)}>
            {showAll ? "Show Less" : "Show More Reviews"}
          </Button>
        </Box>
      )}

      <Dialog
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        fullWidth
        maxWidth="md"
      >
        {selected && (
          <>
            <DialogTitle>{selected.restaurant_name}</DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  src={`https://c602-2400-adc1-4a9-a00-47a-8f89-7a8c-c33c.ngrok-free.app/media/res/${selected.restaurant_id}.jpg`}
                  sx={{ width: 56, height: 56, mr: 2 }}
                >
                  <RestaurantIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2">
                    {formatDate(selected.timestamp)}
                  </Typography>
                  <Chip
                    icon={getSentimentIcon(selected.overall_sentiment)}
                    label={`Sentiment: ${selected.overall_sentiment}`}
                    size="small"
                    color={
                      selected.overall_sentiment === "POS"
                        ? "success"
                        : selected.overall_sentiment === "NEG"
                        ? "error"
                        : "default"
                    }
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>

              <Typography variant="body1" paragraph>
                {selected.review_text}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {selected.dish_id && (
                  <Chip
                    label={`Dish ID: ${selected.dish_id}`}
                    variant="outlined"
                  />
                )}
                {selected.ambiance_score > 0 && (
                  <Chip
                    label={`Ambiance: ${selected.ambiance_score}`}
                    size="small"
                    variant="outlined"
                  />
                )}
                {selected.food_quality_score > 0 && (
                  <Chip
                    label={`Food: ${selected.food_quality_score}`}
                    size="small"
                    variant="outlined"
                  />
                )}
                {selected.service_experience_score > 0 && (
                  <Chip
                    label={`Service: ${selected.service_experience_score}`}
                    size="small"
                    variant="outlined"
                  />
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelected(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default RecentActivity;
