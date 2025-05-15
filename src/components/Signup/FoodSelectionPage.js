import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme
} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FoodBankIcon from '@mui/icons-material/FoodBank';

export default function FoodSelectionPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || localStorage.getItem('userEmail');
  const branch_ids = state?.branch_ids || [];
  const theme = useTheme();

  const [dishes, setDishes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [submitting, setSubmitting] = useState(false);

  // Get unique categories from dishes
  const categories = ['all', ...new Set(dishes.map(dish => dish.Category || 'Uncategorized'))];

  useEffect(() => {
    if (!email || !branch_ids.length) {
      // Redirect to home if required data is missing
      navigate('/', { replace: true });
      return;
    }

    setLoading(true);

    fetch('https://c602-2400-adc1-4a9-a00-47a-8f89-7a8c-c33c.ngrok-free.app/interactive/restaurants/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, branch_ids })
    })
      .then(res => res.json())
      .then(data => {
        // The API should return an array, but just in case:
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.dishes)
            ? data.dishes
            : [];
        setDishes(list);
      })
      .catch(err => {
        console.error('Failed to fetch dishes:', err);
        // Fallback mock data for development
        if (process.env.NODE_ENV === 'development') {
          const mockDishes = [
            {
              dish_id: '1',
              Item: 'Margherita Pizza',
              Restaurant: 'Pizza Place',
              Category: 'Pizza',
              Description: 'Classic pizza with tomato sauce, mozzarella cheese, and fresh basil',
              PricePKR: 1200
            },
            {
              dish_id: '2',
              Item: 'Beef Burger',
              Restaurant: 'Burger Joint',
              Category: 'Burgers',
              Description: 'Juicy beef patty with lettuce, tomato, and special sauce',
              PricePKR: 950
            },
            {
              dish_id: '3',
              Item: 'Chicken Alfredo',
              Restaurant: 'Pasta Palace',
              Category: 'Pasta',
              Description: 'Creamy pasta with grilled chicken and parmesan',
              PricePKR: 1400
            },
            {
              dish_id: '4',
              Item: 'Vegetable Biryani',
              Restaurant: 'Spice Garden',
              Category: 'Rice',
              Description: 'Fragrant rice cooked with mixed vegetables and spices',
              PricePKR: 800
            },
            {
              dish_id: '5',
              Item: 'Caesar Salad',
              Restaurant: 'Healthy Bites',
              Category: 'Salads',
              Description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
              PricePKR: 700
            },
            {
              dish_id: '6',
              Item: 'Chocolate Brownie',
              Restaurant: 'Sweet Treats',
              Category: 'Desserts',
              Description: 'Rich chocolate brownie served with vanilla ice cream',
              PricePKR: 550
            },
            {
              dish_id: '7',
              Item: 'Chicken Wings',
              Restaurant: 'Wing World',
              Category: 'Appetizers',
              Description: 'Spicy buffalo wings served with blue cheese dip',
              PricePKR: 850
            },
            {
              dish_id: '8',
              Item: 'Beef Steak',
              Restaurant: 'Grill House',
              Category: 'Steaks',
              Description: 'Prime beef steak grilled to perfection',
              PricePKR: 2200
            }
          ];
          setDishes(mockDishes);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email, branch_ids, navigate]);

  const toggleSelection = (dishId) => {
    setSelectedIds(prev =>
      prev.includes(dishId)
        ? prev.filter(id => id !== dishId)
        : [...prev, dishId]
    );
  };

  const handleSubmit = () => {
    if (selectedIds.length !== 3) {
      alert('Please select exactly 3 dishes.');
      return;
    }

    setSubmitting(true);

    fetch('https://c602-2400-adc1-4a9-a00-47a-8f89-7a8c-c33c.ngrok-free.app/interactive/dishes/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, dish_ids: selectedIds })
    })
      .then(res => res.json())
      .then(() => {
        navigate('/', { 
          replace: true,
          state: { 
            message: 'Thank you! Your favorite dishes have been saved.',
            selectedDishes: dishes.filter(d => selectedIds.includes(d.dish_id))
          } 
        });
      })
      .catch(err => {
        console.error('Failed to save dish likes:', err);
        alert('Oops, something went wrong.');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // Filter dishes based on search term and active category
  const getFilteredDishes = () => {
    let filtered = dishes;
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(dish => dish.Category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(dish => 
        dish.Item.toLowerCase().includes(search) ||
        dish.Description.toLowerCase().includes(search) ||
        dish.Restaurant.toLowerCase().includes(search)
      );
    }
    
    return filtered;
  };

  // Generate a dish image placeholder based on dish name
  const getDishImageUrl = (dishName) => {
    const hash = dishName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `/api/placeholder/400/300?text=${encodeURIComponent(dishName)}`;
  };

  // Get random price background color based on dish name
  const getPriceTagColor = (dishName) => {
    const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336'];
    const hash = dishName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{ backgroundColor: "#f9f9f9" }}
      >
        <CircularProgress size={60} sx={{ color: "#4CAF50" }} />
        <Typography variant="h6" color="textSecondary" mt={3}>
          Loading menu items...
        </Typography>
      </Box>
    );
  }

  const filteredDishes = getFilteredDishes();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4} textAlign="center">
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            background: "linear-gradient(45deg, #4CAF50, #2196F3)",
            backgroundClip: "text",
            color: "transparent",
            WebkitBackgroundClip: "text",
            textShadow: "0px 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          Select Your Favorite Dishes
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <FoodBankIcon sx={{ mr: 1, color: "#4CAF50" }} />
          <Typography variant="h6" color="textSecondary">
            Choose <strong>exactly 3 dishes</strong> to continue
          </Typography>
        </Box>
        
        <Box mb={1}>
          <Chip 
            label={`${selectedIds.length}/3 selected`} 
            color={selectedIds.length === 3 ? "success" : "default"}
            variant={selectedIds.length === 3 ? "filled" : "outlined"}
            icon={selectedIds.length === 3 ? <CheckCircleIcon /> : undefined}
            sx={{ fontSize: '1rem', px: 1 }}
          />
        </Box>
      </Box>

      {/* Selected dishes summary */}
      {selectedIds.length > 0 && (
        <Paper 
          elevation={1} 
          sx={{ 
            p: 2, 
            mb: 3, 
            borderRadius: 2,
            backgroundColor: 'rgba(76, 175, 80, 0.06)',
            border: '1px solid rgba(76, 175, 80, 0.2)'
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Selected Dishes:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {selectedIds.map(id => {
              const dish = dishes.find(d => d.dish_id === id);
              return dish ? (
                <Chip
                  key={dish.dish_id}
                  label={`${dish.Item} (${dish.Restaurant})`}
                  onDelete={() => toggleSelection(dish.dish_id)}
                  color="primary"
                  sx={{ borderRadius: '8px' }}
                />
              ) : null;
            })}
          </Box>
        </Paper>
      )}

      {/* Search and filter controls */}
      <Box mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <FormControl fullWidth variant="outlined" size="medium">
              <OutlinedInput
                placeholder="Search dishes by name, description, or restaurant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                endAdornment={
                  searchTerm && (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setSearchTerm('')}
                        size="small"
                      >
                        ×
                      </IconButton>
                    </InputAdornment>
                  )
                }
                sx={{
                  borderRadius: 2,
                  backgroundColor: '#fafafa',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  }
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Category tabs */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
        <Tabs 
          value={categories.indexOf(activeCategory)}
          onChange={(e, newValue) => setActiveCategory(categories[newValue])}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              minWidth: 120,
              fontWeight: 600,
            }
          }}
        >
          {categories.map((category) => (
            <Tab 
              key={category} 
              label={category === 'all' ? 'All Categories' : category} 
              icon={<RestaurantMenuIcon />}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Paper>

      {/* Dish Cards */}
      {filteredDishes.length === 0 ? (
        <Box textAlign="center" py={8}>
          <RestaurantMenuIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5 }} />
          <Typography variant="h5" color="text.secondary" mt={2}>
            No dishes found matching your criteria
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Try changing your search or selecting a different category
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredDishes.map((dish) => {
            const isSelected = selectedIds.includes(dish.dish_id);
            const isDisabled = !isSelected && selectedIds.length >= 3;
            
            return (
              <Grid item xs={12} sm={6} md={4} key={dish.dish_id}>
                <Card 
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    transform: isSelected ? 'translateY(-8px)' : 'none',
                    border: isSelected ? '2px solid #4CAF50' : 'none',
                    boxShadow: isSelected
                      ? '0 12px 20px rgba(76, 175, 80, 0.2)'
                      : '0 5px 15px rgba(0,0,0,0.08)',
                    position: 'relative',
                    opacity: isDisabled ? 0.7 : 1,
                    '&:hover': {
                      transform: isDisabled ? 'none' : 'translateY(-5px)',
                      boxShadow: isDisabled ? '0 5px 15px rgba(0,0,0,0.08)' : '0 8px 25px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardActionArea 
                    onClick={() => !isDisabled && toggleSelection(dish.dish_id)}
                    disabled={isDisabled}
                    sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="div"
                        sx={{
                          height: 160,
                          background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${getDishImageUrl(dish.Item)})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'flex-start',
                          padding: 2,
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            color: 'white',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                          }}
                        >
                          {dish.Item}
                        </Typography>
                      </CardMedia>
                      
                      {/* Price tag */}
                      <Chip
                        label={`${dish.PricePKR} PKR`}
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          fontWeight: 'bold',
                          backgroundColor: getPriceTagColor(dish.Item),
                          color: 'white',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        }}
                        icon={<LocalOfferIcon sx={{ color: 'white !important' }} />}
                      />
                    </Box>

                    <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <RestaurantIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                        >
                          {dish.Restaurant}
                        </Typography>
                      </Box>
                      
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          mt: 1
                        }}
                      >
                        {dish.Description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  
                  {/* Selection checkbox with visual indicator */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: isSelected ? 8 : -50,
                      left: 8,
                      transition: 'all 0.3s ease',
                      opacity: isSelected ? 1 : 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                      zIndex: 2,
                    }}
                  >
                    <CheckCircleIcon />
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Submit button */}
      <Box
        mt={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "sticky",
          bottom: 20,
          zIndex: 10,
        }}
      >
        <Button
          variant="contained"
          size="large"
          disabled={selectedIds.length !== 3 || submitting}
          onClick={handleSubmit}
          startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <DoneAllIcon />}
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: 3,
            fontSize: "1.1rem",
            fontWeight: "bold",
            textTransform: "none",
            backgroundColor: selectedIds.length === 3 ? "#4CAF50" : "#e0e0e0",
            boxShadow: selectedIds.length === 3 ? "0 4px 14px rgba(76, 175, 80, 0.4)" : "none",
            "&:hover": {
              backgroundColor: selectedIds.length === 3 ? "#43A047" : "#e0e0e0",
              transform: selectedIds.length === 3 ? "translateY(-2px)" : "none",
              boxShadow: selectedIds.length === 3 ? "0 6px 20px rgba(76, 175, 80, 0.6)" : "none",
            },
            transition: "all 0.3s ease",
          }}
        >
          {submitting ? 'Submitting...' : 'Submit Your Choices'}
        </Button>
      </Box>
    </Container>
  );
}