import React, { useState, useEffect } from "react";
import "./RestaurantCardSection.css";
import bgImage from "./bg.jpg"; 
import bgImage1 from "./karachi-grill-restaurant.jpg"; 
import bgImage2 from "./foodie.jpg"; 
import bgImage3 from "./taste.jpeg"; 
import bgImage4 from "./bk.jpg"; 
import bgImage5 from "./delight.jpg"; 
//import CardActions from '@mui/material/CardActions';
// or
import { CardActions } from '@mui/material';

// Mock data for restaurants
const restaurantData = {
  biryani: [
    { name: "Biryani House", description: "Delicious and spicy biryani.", image: bgImage },
    { name: "Biryani King", description: "Authentic Hyderabadi biryani.", image: bgImage },
  ],
  burger: [
    { name: "Burger King", description: "Juicy burgers with crispy fries.", image: bgImage4 },
    { name: "Burger Delight", description: "Best burgers in town.", image: bgImage5 },
  ],
  topRestaurants: [
    { name: "Karachi Grill", description: "Top-rated steakhouse in Karachi.", image: bgImage1 },
    { name: "The Foodie", description: "A top choice for food lovers.", image: bgImage2 },
    { name: "Taste of Karachi", description: "Best of Pakistani cuisine.", image: bgImage3 },
  ],
};



const RestaurantCardSection = ({ searchQuery }) => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    const sanitizedSearchQuery = searchQuery?.toLowerCase() || "";
    let filtered = [];

    // Filter restaurants based on search query
    if (sanitizedSearchQuery.includes("biryani")) {
      filtered = restaurantData.biryani;
    } else if (sanitizedSearchQuery.includes("burger")) {
      filtered = restaurantData.burger;
    } else if (sanitizedSearchQuery.includes("top 10")) {
      filtered = restaurantData.topRestaurants;
    } else if (!sanitizedSearchQuery) {
      // If no query, show nothing
      filtered = [];
    }

    setFilteredRestaurants(filtered);
  }, [searchQuery]);

  return (
    <div className="restaurantSection">
      {filteredRestaurants.length > 0 && (
        <div className="cardContainer">
          {filteredRestaurants.map((restaurant, index) => (
            <div key={index} className="card">
              <img src={restaurant.image} alt={restaurant.name} className="cardImage" />
              <div className="cardContent">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {filteredRestaurants.length === 0 && searchQuery && (
        <p>No restaurants found for "{searchQuery}"</p>
      )}
    </div>
  );
};

export default RestaurantCardSection;
