import React, { useState, useEffect } from "react";
import { 
  Card, 
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
  Avatar
} from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';

const RecentActivity = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://ai.myedbox.com/api/api/recent', {
          method: 'POST',
        });

        const data = await response.json();
        if (response.ok) {
          setReviews(data.reviews || []);
        } else {
          console.error(data.message || 'Failed to fetch reviews');
        }
      } catch (err) {
        console.error('Network error');
      }
    };

    fetchReviews();
  }, []);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 6);

  const getSentimentIcon = (sentiment) => {
    switch(sentiment) {
      case 'POS':
        return <SentimentSatisfiedIcon color="success" />;
      case 'NEG':
        return <SentimentVeryDissatisfiedIcon color="error" />;
      default:
        return <SentimentSatisfiedIcon color="neutral" />;
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
        Recent Restaurant Reviews
      </Typography>

      <Grid container spacing={3}>
        {displayedReviews.map((review) => (
          <Grid item xs={12} sm={6} md={4} key={review.review_id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                transition: 'transform 0.2s',
                '&:hover': { 
                  transform: 'scale(1.03)',
                  boxShadow: 3 
                }
              }}
              onClick={() => setSelectedReview(review)}
            >
              <CardMedia
                component="img"
                height="200"
                image={`https://ai.myedbox.com/api/api/${review.restaurant_image ? review.restaurant_image : ""}`}
                alt={review.restaurant_name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <RestaurantIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    {review.restaurant_name}
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  {review.review_text.length > 100 
                    ? `${review.review_text.slice(0, 100)}...` 
                    : review.review_text}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip 
                    icon={getSentimentIcon(review.overall_sentiment)}
                    label={review.overall_sentiment} 
                    size="small" 
                    color={
                      review.overall_sentiment === 'POS' ? 'success' : 
                      review.overall_sentiment === 'NEG' ? 'error' : 'default'
                    }
                  />
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(review.timestamp)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {reviews.length > 6 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'Show More Reviews'}
          </Button>
        </Box>
      )}

      {selectedReview && (
        <Dialog 
          open={!!selectedReview} 
          onClose={() => setSelectedReview(null)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Review Details - {selectedReview.restaurant_name}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar 
                sx={{ 
                  width: 56, 
                  height: 56, 
                  mr: 2, 
                  bgcolor: 'primary.main' 
                }}
                src={selectedReview.restaurant_image || undefined}
              >
                <RestaurantIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">
                  {selectedReview.restaurant_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(selectedReview.timestamp)}
                </Typography>
              </Box>
            </Box>

            <Typography variant="body1" sx={{ mb: 2 }}>
              {selectedReview.review_text}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                icon={<AccessTimeIcon />}
                label={`Timestamp: ${formatDate(selectedReview.timestamp)}`} 
                variant="outlined"
              />
              <Chip 
                icon={getSentimentIcon(selectedReview.overall_sentiment)}
                label={`Sentiment: ${selectedReview.overall_sentiment}`} 
                color={
                  selectedReview.overall_sentiment === 'POS' ? 'success' : 
                  selectedReview.overall_sentiment === 'NEG' ? 'error' : 'default'
                }
              />
              {selectedReview.dish_id && (
                <Chip 
                  label={`Dish ID: ${selectedReview.dish_id}`} 
                  variant="outlined"
                />
              )}
            </Box>

            {(selectedReview.ambiance_score > 0 || 
              selectedReview.food_quality_score > 0 || 
              selectedReview.service_experience_score > 0) && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Review Scores:</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {selectedReview.ambiance_score > 0 && (
                    <Chip 
                      label={`Ambiance: ${selectedReview.ambiance_score}`} 
                      size="small" 
                      variant="outlined"
                    />
                  )}
                  {selectedReview.food_quality_score > 0 && (
                    <Chip 
                      label={`Food Quality: ${selectedReview.food_quality_score}`} 
                      size="small" 
                      variant="outlined"
                    />
                  )}
                  {selectedReview.service_experience_score > 0 && (
                    <Chip 
                      label={`Service: ${selectedReview.service_experience_score}`} 
                      size="small" 
                      variant="outlined"
                    />
                  )}
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedReview(null)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default RecentActivity;