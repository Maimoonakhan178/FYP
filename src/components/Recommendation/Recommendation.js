import React, { useState } from 'react';
import { TextField, Checkbox, FormControlLabel, FormGroup, Button, Grid, Card, CardContent, Typography, CardMedia, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const DishRecommendation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sortOption, setSortOption] = useState('popularity'); // Default sorting option

  const dishesData = [
    { 
      id: 1, 
      name: "Biryani", 
      cuisine: "Pakistani", 
      price: 500, 
      rating: 5, 
      popularity: 90, 
      restaurant :"zaiqa",
      img: "https://source.unsplash.com/200x150/?biryani",
      calories: 650, 
      preparationTime: "45 mins", 
      spiciness: "Medium", 
    },
    { 
      id: 2, 
      name: "Pizza", 
      cuisine: "Italian", 
      price: 1200, 
      rating: 4, 
      popularity: 85, 
      restaurant:"KFC",
      img: "https://source.unsplash.com/200x150/?pizza",
      calories: 1000, 
      preparationTime: "20 mins", 
      spiciness: "Mild", 
   
    },
    { 
      id: 3, 
      name: "Sushi", 
      cuisine: "Japanese", 
      price: 2500, 
      rating: 5, 
      popularity: 75, 
      restaurant:"KFC",
      img: "https://source.unsplash.com/200x150/?sushi",
      calories: 450, 
      preparationTime: "1 hour", 
      spiciness: "Mild", 
  
    },
   
  ];

  const handleCheckboxChange = (setState, value) => {
    setState((prev) => 
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const filteredDishes = dishesData
    .filter((dish) => {
      return (
        (!selectedCuisines.length || selectedCuisines.includes(dish.cuisine)) &&
        (!selectedPrices.length || selectedPrices.includes(dish.price.toString())) &&
        (!selectedRatings.length || selectedRatings.includes(dish.rating.toString())) &&
        dish.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortOption === "price_low") return a.price - b.price;
      if (sortOption === "price_high") return b.price - a.price;
      if (sortOption === "rating") return b.rating - a.rating;
      return b.popularity - a.popularity;
    });

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        sx={{
          marginBottom: 2,
          fontWeight: 600,
          textAlign: 'center',
          marginTop: 14,
          color: 'black',
        }}
      >
        🍽️ Dish Recommendations
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Box sx={{ padding: 2, borderRight: "1px solid #ddd" }}>
            <Typography variant="h5" gutterBottom>Filters</Typography>
            
            <TextField
              label="Search for a dish..."
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ marginBottom: 2 }}
            />

            <Grid container spacing={2}>
              {/* Cuisines */}
              <Grid item xs={12}>
                <Typography variant="h6">Cuisine</Typography>
                <FormGroup>
                  {["Pakistani", "Italian", "Japanese", "Indian", "Chinese"].map((cuisine) => (
                    <FormControlLabel 
                      control={
                        <Checkbox
                          checked={selectedCuisines.includes(cuisine)}
                          onChange={() => handleCheckboxChange(setSelectedCuisines, cuisine)}
                        />
                      } 
                      label={cuisine} 
                      key={cuisine} 
                    />
                  ))}
                </FormGroup>
              </Grid>

              {/* Price */}
              <Grid item xs={12}>
                <Typography variant="h6">Price Range</Typography>
                <FormGroup>
                  {["500", "1000", "1500", "2000"].map((price) => (
                    <FormControlLabel 
                      control={
                        <Checkbox
                          checked={selectedPrices.includes(price)}
                          onChange={() => handleCheckboxChange(setSelectedPrices, price)}
                        />
                      } 
                      label={`Up to ${price}`} 
                      key={price} 
                    />
                  ))}
                </FormGroup>
              </Grid>

              {/* Rating */}
              <Grid item xs={12}>
                <Typography variant="h6">Rating</Typography>
                <FormGroup>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <FormControlLabel 
                      control={
                        <Checkbox
                          checked={selectedRatings.includes(rating.toString())}
                          onChange={() => handleCheckboxChange(setSelectedRatings, rating.toString())}
                        />
                      } 
                      label={`${rating} stars`} 
                      key={rating} 
                    />
                  ))}
                </FormGroup>
              </Grid>

              {/* Sort Options */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortOption}
                    onChange={handleSortChange}
                    label="Sort By"
                  >
                    <MenuItem value="popularity">Popularity</MenuItem>
                    <MenuItem value="price_low">Price: Low to High</MenuItem>
                    <MenuItem value="price_high">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Dish Results Section */}
        <Grid item xs={9}>
          <Grid container spacing={3}>
            {filteredDishes.length === 0 ? (
              <Typography>No dishes found</Typography>
            ) : (
              filteredDishes.map((dish) => (
                <Grid item xs={12} sm={6} md={4} key={dish.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={dish.img}
                      alt={dish.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{dish.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Cuisine: {dish.cuisine}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Price: PKR {dish.price}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Rating: {dish.rating} stars
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Preparation Time: {dish.preparationTime}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DishRecommendation;
