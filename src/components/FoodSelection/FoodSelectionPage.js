import React, { useState } from 'react';
import { Container, Button, Checkbox, FormControlLabel, FormGroup, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook

const RestaurantOrder = () => {
  const [step, setStep] = useState(1); // Step 1: Select Restaurants, Step 2: Select Branches, Step 3: Select Food
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedFood, setSelectedFood] = useState([]);

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const restaurants = [
    "Restaurant 1", "Restaurant 2", "Restaurant 3", "Restaurant 4", 
    "Restaurant 5", "Restaurant 6", "Restaurant 7", "Restaurant 8", 
    "Restaurant 9", "Restaurant 10"
  ];

  const branchData = {
    "Restaurant 1": ["Branch 1", "Branch 2"],
    "Restaurant 2": ["Branch 3", "Branch 4"],
    "Restaurant 3": ["Branch 5", "Branch 6"],
    "Restaurant 4": ["Branch 7", "Branch 8"],
    "Restaurant 5": ["Branch 9", "Branch 10"]
  };

  const foodItems = ["Pizza", "Pasta", "Burger", "Sushi", "Salad"];

  // Handle restaurant selection
  const handleRestaurantChange = (event) => {
    const value = event.target.value;
    if (selectedRestaurants.includes(value)) {
      setSelectedRestaurants(selectedRestaurants.filter(item => item !== value));
    } else {
      setSelectedRestaurants([...selectedRestaurants, value]);
    }
  };

  // Handle branch selection
  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  // Handle food selection
  const handleFoodChange = (event) => {
    const value = event.target.value;
    if (selectedFood.includes(value)) {
      setSelectedFood(selectedFood.filter(item => item !== value));
    } else {
      setSelectedFood([...selectedFood, value]);
    }
  };

  // Handle Next button
  const handleNext = () => {
    if (step === 1 && selectedRestaurants.length === 3) {
      setStep(2); // Move to the branch selection step
    } else if (step === 2 && selectedBranch) {
      setStep(3); // Move to the food selection step
    } else if (step === 3 && selectedFood.length > 0) {
      alert(`now you will get personalized recommendations`);
      setStep(1); // Reset to restaurant selection
      setSelectedRestaurants([]);
      setSelectedBranch('');
      setSelectedFood([]);
      navigate('/'); // Redirect to home page after completing the order
    } else {
      alert('Please make all necessary selections.');
    }
  };

  return (
    <Container sx={{
      maxWidth: 800,
      margin: '50px auto',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    }}>
      {step === 1 && (
        <div>
          <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '20px' }}>Select Top 3 Restaurants</Typography>
          <FormGroup sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}>
            {restaurants.map((restaurant, index) => (
              <div key={index} sx={{
                width: '50%',
                padding: '10px',
                boxSizing: 'border-box',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}>
                <FormControlLabel
                  control={<Checkbox value={restaurant} onChange={handleRestaurantChange} />}
                  label={restaurant}
                />
              </div>
            ))}
          </FormGroup>
          <Button sx={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            width: '100%',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          }} onClick={handleNext}>Next</Button>
        </div>
      )}

      {step === 2 && (
        <div>
          <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '20px' }}>Select a Branch</Typography>
          {selectedRestaurants.map((restaurant, index) => (
            <div key={index}>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>{restaurant}</Typography>
              <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                <InputLabel>Select Branch</InputLabel>
                <Select value={selectedBranch} onChange={handleBranchChange}>
                  <MenuItem value="">Select Branch</MenuItem>
                  {branchData[restaurant]?.map((branch, i) => (
                    <MenuItem key={i} value={branch}>{branch}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          ))}
          <Button sx={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            width: '100%',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          }} onClick={handleNext}>Next</Button>
        </div>
      )}

      {step === 3 && (
        <div>
          <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '20px' }}>Select Food Items from {selectedBranch}</Typography>
          <FormGroup sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}>
            {foodItems.map((food, index) => (
              <div key={index} sx={{
                width: '50%',
                padding: '10px',
                boxSizing: 'border-box',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}>
                <FormControlLabel
                  control={<Checkbox value={food} onChange={handleFoodChange} />}
                  label={food}
                />
              </div>
            ))}
          </FormGroup>
          <Button sx={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            width: '100%',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          }} onClick={handleNext}>Finish</Button>
        </div>
      )}
    </Container>
  );
};

export default RestaurantOrder;
