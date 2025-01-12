import React, { useState } from 'react';
import { 
  Button, Card, CardContent, CardMedia, Typography, Grid, Box, 
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
  List, ListItem, ListItemText, Rating, Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AccessTime, Star, Info, BarChart } from '@mui/icons-material';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const restaurants = [
  {
    id: 1,
    name: "Kolachi",
    image: "/placeholder.svg?height=200&width=300",
    openingTime: "12:00 PM",
    closingTime: "12:00 AM",
    cuisine: "Seafood, BBQ",
    rating: 4.5,
    reviews: [
      { id: 1, text: "Great seafood with an amazing view!" },
      { id: 2, text: "Excellent service and ambiance." }
    ],
    performance: {
      service: 8,
      foodQuality: 9,
      ambiance: 10
    }
  },
  {
    id: 2,
    name: "BBQ Tonight",
    image: "/placeholder.svg?height=200&width=300",
    openingTime: "11:00 AM",
    closingTime: "1:00 AM",
    cuisine: "BBQ, Pakistani",
    rating: 4.3,
    reviews: [
      { id: 1, text: "Best BBQ in town!" },
      { id: 2, text: "A bit pricey, but worth it for special occasions." }
    ],
    performance: {
      service: 7,
      foodQuality: 9,
      ambiance: 8
    }
  },
  {
    id: 3,
    name: "Lal Qila",
    image: "/placeholder.svg?height=200&width=300",
    openingTime: "12:30 PM",
    closingTime: "11:30 PM",
    cuisine: "Pakistani, Mughlai",
    rating: 4.2,
    reviews: [
      { id: 1, text: "Authentic Mughlai cuisine in a royal setting." },
      { id: 2, text: "Great for family dinners and special events." }
    ],
    performance: {
      service: 8,
      foodQuality: 8,
      ambiance: 9
    }
  },
  {
    id: 4,
    name: "Cafe Flo",
    image: "/placeholder.svg?height=200&width=300",
    openingTime: "11:00 AM",
    closingTime: "11:00 PM",
    cuisine: "French, Continental",
    rating: 4.4,
    reviews: [
      { id: 1, text: "A slice of Paris in Karachi!" },
      { id: 2, text: "Delightful desserts and cozy atmosphere." }
    ],
    performance: {
      service: 9,
      foodQuality: 9,
      ambiance: 8
    }
  }
];

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledCardMedia = styled(CardMedia)({
  paddingTop: '56.25%', // 16:9 aspect ratio
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

function RestaurantCard({ restaurant, onSelectRestaurant }) {
  return (
    <StyledCard>
      <StyledCardMedia
        image={restaurant.image}
        title={restaurant.name}
      />
      <StyledCardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {restaurant.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {restaurant.cuisine}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <AccessTime fontSize="small" />
          <Typography variant="body2" color="textSecondary" component="span" ml={1}>
            {restaurant.openingTime} - {restaurant.closingTime}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1}>
          <Rating name="read-only" value={restaurant.rating} readOnly size="small" />
          <Typography variant="body2" color="textSecondary" component="span" ml={1}>
            {restaurant.rating}
          </Typography>
        </Box>
      </StyledCardContent>
      <Button size="small" color="primary" onClick={() => onSelectRestaurant(restaurant)}>
        View Details
      </Button>
    </StyledCard>
  );
}

function RestaurantList({ restaurants, onSelectRestaurant }) {
  return (
    <Grid container spacing={3}>
      {restaurants.map((restaurant) => (
        <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
          <RestaurantCard restaurant={restaurant} onSelectRestaurant={onSelectRestaurant} />
        </Grid>
      ))}
    </Grid>
  );
}

function RestaurantDetails({ restaurant }) {
  return (
    <Box>
      <CardMedia
        component="img"
        height="200"
        image={restaurant.image}
        alt={restaurant.name}
      />
      <Typography variant="h4" gutterBottom>{restaurant.name}</Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>{restaurant.cuisine}</Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <AccessTime fontSize="small" />
        <Typography variant="body2" color="textSecondary" component="span" ml={1}>
          {restaurant.openingTime} - {restaurant.closingTime}
        </Typography>
      </Box>
      <Typography variant="h6" gutterBottom>Reviews:</Typography>
      <List>
        {restaurant.reviews.map((review) => (
          <ListItem key={review.id}>
            <ListItemText primary={review.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

function AnalyticsDashboard({ restaurant }) {
  const data = [
    { name: 'Service', value: restaurant.performance.service },
    { name: 'Food Quality', value: restaurant.performance.foodQuality },
    { name: 'Ambiance', value: restaurant.performance.ambiance },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>{restaurant.name} Performance</Typography>
      <Typography variant="subtitle2" gutterBottom>Key metrics based on customer feedback</Typography>
      <Box height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </RechartsBarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

const FloatingActionButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

export default function KarachiRestaurants() {
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openAnalyticsDialog, setOpenAnalyticsDialog] = useState(false);

  const handleExploreMore = () => {
    setShowRestaurants(true);
  };

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setOpenDetailsDialog(true);
  };

  const handleToggleAnalytics = () => {
    if (selectedRestaurant) {
      setOpenAnalyticsDialog(true);
    } else {
      alert("Please select a restaurant first to view analytics.");
    }
  };

  if (!showRestaurants) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{
          background: 'white',
          color: 'black',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Discover Karachi's Culinary Delights
        </Typography>
        <Typography variant="h5" align="center" paragraph>
          Embark on a gastronomic journey through the vibrant food scene of Karachi. From sizzling BBQs to exquisite seafood, uncover the city's best dining experiences.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleExploreMore}
          sx={{
            mt: 3,
            backgroundColor: 'white',
            color: '#2196F3',
            '&:hover': {
              backgroundColor: '#e3f2fd',
            },
          }}
        >
          Explore More
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Explore Karachi's Finest Restaurants
      </Typography>
      <RestaurantList restaurants={restaurants} onSelectRestaurant={handleSelectRestaurant} />
      <FloatingActionButton color="primary" aria-label="analytics" onClick={handleToggleAnalytics}>
        <BarChart />
      </FloatingActionButton>
      <Dialog open={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Restaurant Details</DialogTitle>
        <DialogContent>
          {selectedRestaurant && <RestaurantDetails restaurant={selectedRestaurant} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetailsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAnalyticsDialog} onClose={() => setOpenAnalyticsDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Restaurant Analytics</DialogTitle>
        <DialogContent>
          {selectedRestaurant && <AnalyticsDashboard restaurant={selectedRestaurant} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAnalyticsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
