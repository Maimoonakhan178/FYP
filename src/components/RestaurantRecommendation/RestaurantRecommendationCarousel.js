import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardHeader, Avatar, Rating, Select, MenuItem, FormControl, InputLabel, Slider, Button } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

function RestaurantRecommendation() {
  const [cuisine, setCuisine] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [restaurantData, setRestaurantData] = useState([]);

  const handleCuisineChange = (e) => setCuisine(e.target.value);
  const handleRatingChange = (e, newValue) => setMinRating(newValue);

  // Fetch filtered restaurant data based on user preferences
  useEffect(() => {
    if (cuisine || minRating) {
      fetch(`/api/restaurants?cuisine=${cuisine}&minRating=${minRating}`)
        .then((response) => response.json())
        .then((data) => setRestaurantData(data));
    }
  }, [cuisine, minRating]);

  return (
    <Box sx={{ padding: 3 }}>
  <Typography
  variant="h4"
  sx={{
    marginBottom: 2,
    fontWeight: 600,
    textAlign: 'center',
    marginTop: 14,  // Adjusted to give more space at the top
    color: 'black',
  }}
>
  🍽️ Restaurant Recommendations
</Typography>

      {/* User Preferences Form */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <FormControl sx={{ width: '45%' }}>
          <InputLabel>Cuisine</InputLabel>
          <Select
            value={cuisine}
            label="Cuisine"
            onChange={handleCuisineChange}
          >
            <MenuItem value="Pakistani">Pakistani</MenuItem>
            <MenuItem value="Chinese">Chinese</MenuItem>
            <MenuItem value="Italian">Italian</MenuItem>
            {/* Add more options */}
          </Select>
        </FormControl>

        <Box sx={{ width: '45%' }}>
          <Typography gutterBottom>Minimum Rating: {minRating}</Typography>
          <Slider
            value={minRating}
            onChange={handleRatingChange}
            valueLabelDisplay="auto"
            min={0}
            max={5}
            step={0.1}
          />
        </Box>
      </Box>

      {/* Display Filtered Restaurants */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {restaurantData.length > 0 ? (
          restaurantData.map((restaurant) => (
            <Card key={restaurant.name} sx={{ minWidth: 250, maxWidth: 250, borderRadius: 3, boxShadow: 3 }}>
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: '#1976d2' }}><RestaurantIcon /></Avatar>}
                title={restaurant.name}
                subheader={restaurant.cuisine}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                  Cuisine: {restaurant.cuisine}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: <Rating value={restaurant.rating} precision={0.1} readOnly size="small" /> ({restaurant.rating}/5)
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', width: '100%' }}>
            No restaurants found matching your preferences.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default RestaurantRecommendation;
