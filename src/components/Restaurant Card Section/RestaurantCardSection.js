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
// import { CardActions } from '@mui/material';

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
  const user = JSON.parse(localStorage.getItem("user"));
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let sanitizedSearchQuery = searchQuery?.toLowerCase() || "";
      let filtered = [];
      sanitizedSearchQuery+=" at location of "+ user.location;
      console.log(sanitizedSearchQuery);
      try {
        // Create a new FormData object
        const form = new FormData();
        form.append('query', sanitizedSearchQuery); // Add query to form

        // Send the POST request
        const response = await fetch('https://ai.myedbox.com/api/api/search', {
          method: 'POST',
          body: form,
        });

        const data = await response.json();

        if (response.ok) {
          filtered = data.results;
          console.log(filtered);
        } else {
          console.log(data.message || 'Search failed. Please try again.');
        }
      } catch (err) {
        console.log('An error occurred while searching. Please try again.');
      }

      // Update the state
      setFilteredRestaurants(filtered);
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]); // Dependency array includes `searchQuery`

  return (
    <div className="restaurantSection">
      {filteredRestaurants.length > 0 && (
        <div className="cardContainer">
          {filteredRestaurants.map((restaurant, index) => (
            <div key={index} className="card">
              <img
              src={`https://ai.myedbox.com/api/api/${restaurant.image ? restaurant.image : bgImage}`}
              alt={restaurant.restaurant_name}
              className="cardImage"
              />

              <div className="cardContent">
                <h3>{restaurant.restaurant_name +" " +restaurant.location_name + " (" + restaurant.popularity_score  + ")"}
                </h3>
                <p>{restaurant.dish_name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* {filteredRestaurants.length === 0 && searchQuery && (
        <p>No restaurants found for "{searchQuery}"</p>
      )} */}
    </div>
  );
};

export default RestaurantCardSection;

