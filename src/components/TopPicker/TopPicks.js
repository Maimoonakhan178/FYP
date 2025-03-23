import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Avatar,
  Rating
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const TopRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('https://ai.myedbox.com/api/api/top-rated-restaurants', {
          method: 'POST',
        });

        const data = await response.json();
        if (response.ok) {
          setRestaurants(data.restaurants || []);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const RestaurantCard = ({ restaurant }) => {
    const cuisineTypes = JSON.parse(restaurant.cuisine_type);

    return (
      <Card 
        sx={{ 
          maxWidth: 345, 
          m: 2, 
          boxShadow: 3,
          transition: 'transform 0.3s',
          '&:hover': { 
            transform: 'scale(1.05)',
            boxShadow: 6 
          }
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={`https://ai.myedbox.com/api/api/${restaurant.restaurant_image ? restaurant.restaurant_image : ""}`}
          alt={restaurant.restaurant_name}
        />
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="div">
              {restaurant.restaurant_name}
            </Typography>
            <Rating 
              value={restaurant.average_rating} 
              precision={0.1} 
              readOnly 
              max={5}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {restaurant.location_name}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
            {cuisineTypes.map((cuisine) => (
              <Chip 
                key={cuisine}
                icon={<RestaurantIcon />}
                label={cuisine} 
                size="small" 
                color="secondary" 
                variant="outlined" 
              />
            ))}
          </Box>

          <Typography variant="caption" color="text.secondary">
            Overall Score: {(restaurant.overall_average_score * 100).toFixed(2)}%
          </Typography>
        </CardContent>
      </Card>
    );

  };

  if (loading) return <Typography>Loading restaurants...</Typography>;

  return (
    <Box 
      sx={{ 
        p: 2 
      }}
    >
      {/* Heading */}
      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ 
          textAlign: 'center', 
          mb: 3, 
          fontWeight: 'bold' 
        }}
      >
        Top Picks Restaurant
      </Typography>

      {/* Restaurant Cards */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center' 
        }}
      >
        {restaurants.map((restaurant) => (
          <RestaurantCard 
            key={restaurant.restaurant_id} 
            restaurant={restaurant} 
          />
        ))}
      </Box>
    </Box>
  );
};

export default TopRestaurants;
