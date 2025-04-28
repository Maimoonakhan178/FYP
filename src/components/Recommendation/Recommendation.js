import React, { useState, useEffect } from 'react';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';

const DishRecommendation = () => {
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sortOption, setSortOption] = useState('popularity');

  // Data state
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper for toggling array state
  const handleCheckboxChange = (setter, value) => {
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  // Fetch dishes whenever filters change
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Prepare form-data payload
    const formData = new FormData();
    if (searchQuery) formData.append('search', searchQuery);
    selectedCuisines.forEach(c => formData.append('cuisines', c));
    selectedPrices.forEach(p => formData.append('price_ranges', p));
    selectedRatings.forEach(r => formData.append('ratings', r));
    formData.append('sort_by', sortOption);

    fetch('https://api.logsaga.com/api/dishes/search', {
      method: 'POST',
      body: formData,
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then(data => setDishes(data))
      .catch(err => setError(err.message || 'Failed to fetch dishes'))
      .finally(() => setLoading(false));
  }, [searchQuery, selectedCuisines, selectedPrices, selectedRatings, sortOption]);

  // Apply local open-now or other bespoke filters if needed (omitted here)
  const displayedDishes = dishes;

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{ mt: 8, mb: 2, fontWeight: 600, textAlign: 'center' }}
      >🍽️ Dish Recommendations</Typography>

      <Grid container spacing={3}>
        {/* Filters panel */}
        <Grid item xs={12} md={3}>
          <Box sx={{ p: 2, borderRight: { xs: 'none', md: '1px solid #ddd' } }}>
            <TextField
              fullWidth
              label="Search for a dish..."
              variant="outlined"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Typography variant="h6">Cuisine</Typography>
            <FormGroup>
              {['Pakistani','Italian','Japanese','Indian','Chinese'].map(c => (
                <FormControlLabel
                  key={c}
                  control={<Checkbox checked={selectedCuisines.includes(c)} onChange={() => handleCheckboxChange(setSelectedCuisines, c)} />}
                  label={c}
                />
              ))}
            </FormGroup>

            <Typography variant="h6" sx={{ mt: 2 }}>Price Range</Typography>
            <FormGroup>
              {['500','1000','1500','2000'].map(p => (
                <FormControlLabel
                  key={p}
                  control={<Checkbox checked={selectedPrices.includes(p)} onChange={() => handleCheckboxChange(setSelectedPrices, p)} />}
                  label={`Up to ${p}`}
                />
              ))}
            </FormGroup>

            <Typography variant="h6" sx={{ mt: 2 }}>Rating</Typography>
            <FormGroup>
              {[1,2,3,4,5].map(r => (
                <FormControlLabel
                  key={r}
                  control={<Checkbox checked={selectedRatings.includes(r.toString())} onChange={() => handleCheckboxChange(setSelectedRatings, r.toString())} />}
                  label={`${r} stars`}
                />
              ))}
            </FormGroup>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortOption} label="Sort By" onChange={e => setSortOption(e.target.value)}>
                <MenuItem value="popularity">Popularity</MenuItem>
                <MenuItem value="price_low">Price: Low to High</MenuItem>
                <MenuItem value="price_high">Price: High to Low</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        {/* Results panel */}
        <Grid item xs={12} md={9}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress size={48} />
            </Box>
          ) : error ? (
            <Typography color="error" align="center">{error}</Typography>
          ) : (
            <Grid container spacing={3}>
              {displayedDishes.length === 0 ? (
                <Typography>No dishes found</Typography>
              ) : (
                displayedDishes.map(dish => (
                  <Grid item xs={12} sm={6} md={4} key={dish.dish_id}>
                    <Card>
                      <CardMedia component="img" height="140" image={dish.image || dish.img || '/placeholder.jpg'} alt={dish.dish_name} />
                      <CardContent>
                        <Typography variant="h6">{dish.dish_name}</Typography>
                        <Typography variant="body2">Cuisine: {dish.cuisines.join(', ')}</Typography>
                        <Typography variant="body2">Price: PKR {dish.price}</Typography>
                        <Typography variant="body2">Rating: {dish.avg_rating || dish.rating} stars</Typography>
                        <Typography variant="body2">Prep Time: {dish.preparationTime || ''}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DishRecommendation;
