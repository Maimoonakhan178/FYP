import React, { useState } from 'react';
import "./rec.css";

// Simulated restaurant data
const restaurants = [
  { id: 1, name: "Pizza Palace", cuisine: "Italian", dishes: ["Margherita Pizza", "Pepperoni Pizza", "Pasta Carbonara"], priceRange: "$$", rating: 4.5, location: { lat: 40.7128, lng: -74.0060 } },
  { id: 2, name: "Sushi Sensation", cuisine: "Japanese", dishes: ["California Roll", "Salmon Nigiri", "Miso Soup"], priceRange: "$$$", rating: 4.7, location: { lat: 40.7112, lng: -74.0055 } },
  { id: 3, name: "Burger Bliss", cuisine: "American", dishes: ["Classic Cheeseburger", "Veggie Burger", "Onion Rings"], priceRange: "$", rating: 4.2, location: { lat: 40.7135, lng: -74.0070 } },
  { id: 4, name: "Taco Fiesta", cuisine: "Mexican", dishes: ["Beef Tacos", "Chicken Quesadilla", "Guacamole"], priceRange: "$", rating: 4.3, location: { lat: 40.7140, lng: -74.0065 } },
  { id: 5, name: "Curry House", cuisine: "Indian", dishes: ["Chicken Tikka Masala", "Vegetable Biryani", "Naan Bread"], priceRange: "$$", rating: 4.6, location: { lat: 40.7120, lng: -74.0050 } }
];

// Simulated user location
const userLocation = { lat: 40.7128, lng: -74.0060 };

// Calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function AIFoodRecommender() {
  const [preferences, setPreferences] = useState({
    cuisine: "",
    dietary: "none",
    spiceLevel: "mild",
    price: "moderate",
    minRating: 4.0, // Minimum rating
    maxDistance: 10 // Max distance in km
  });
  const [recommendations, setRecommendations] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const aiRecommendations = getAIRecommendation(preferences, userLocation);
    setRecommendations(aiRecommendations);
  };

  // Get AI recommendations based on user preferences
  function getAIRecommendation(preferences, userLocation) {
    const filteredRestaurants = restaurants
      .filter(restaurant => {
        // Check cuisine
        const cuisineMatch = preferences.cuisine ? restaurant.cuisine.toLowerCase().includes(preferences.cuisine.toLowerCase()) : true;

        // Check dietary restrictions
        const dietaryMatch = preferences.dietary === "none" || restaurant.dishes.some(dish => dish.toLowerCase().includes(preferences.dietary.toLowerCase()));

        // Check price range
        const priceMatch = (preferences.price === "budget" && restaurant.priceRange === "$") ||
                           (preferences.price === "moderate" && restaurant.priceRange === "$$") ||
                           (preferences.price === "luxury" && restaurant.priceRange === "$$$") ||
                           preferences.price === "none"; 

        // Check minimum rating
        const ratingMatch = restaurant.rating >= preferences.minRating;

        // Calculate distance and check max distance
        const distance = calculateDistance(userLocation.lat, userLocation.lng, restaurant.location.lat, restaurant.location.lng);
        const distanceMatch = distance <= preferences.maxDistance;

        return cuisineMatch && dietaryMatch && priceMatch && ratingMatch && distanceMatch;
      })
      .map(restaurant => {
        // Calculate the distance from the user's location
        const distance = calculateDistance(userLocation.lat, userLocation.lng, restaurant.location.lat, restaurant.location.lng);
        return { ...restaurant, distance };
      })
      .sort((a, b) => a.distance - b.distance); // Sort by proximity

    return filteredRestaurants;
  }

  return (
    <div className="ai-food-recommender">
      <div className="container">
        <div className="form">
          <h1>AI Food Recommender</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="cuisine">Preferred Cuisine:</label>
              <input
                type="text"
                id="cuisine"
                name="cuisine"
                value={preferences.cuisine}
                onChange={handleInputChange}
                placeholder="e.g., Italian, Japanese, Mexican"
                className="input"
              />
            </div>
            <div>
              <label htmlFor="dietary">Dietary Restriction:</label>
              <select
                id="dietary"
                name="dietary"
                value={preferences.dietary}
                onChange={handleInputChange}
                className="select"
              >
                <option value="none">None</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten-free</option>
              </select>
            </div>
            <div>
              <label htmlFor="spiceLevel">Spice Level:</label>
              <select
                id="spiceLevel"
                name="spiceLevel"
                value={preferences.spiceLevel}
                onChange={handleInputChange}
                className="select"
              >
                <option value="mild">Mild</option>
                <option value="medium">Medium</option>
                <option value="spicy">Spicy</option>
              </select>
            </div>
            <div>
              <label htmlFor="price">Price Range:</label>
              <select
                id="price"
                name="price"
                value={preferences.price}
                onChange={handleInputChange}
                className="select"
              >
                <option value="budget">Budget</option>
                <option value="moderate">Moderate</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
            <div>
              <label htmlFor="minRating">Minimum Rating:</label>
              <input
                type="number"
                id="minRating"
                name="minRating"
                value={preferences.minRating}
                onChange={handleInputChange}
                min="1"
                max="5"
                step="0.1"
                className="input"
              />
            </div>
            <div>
              <label htmlFor="maxDistance">Max Distance (km):</label>
              <input
                type="number"
                id="maxDistance"
                name="maxDistance"
                value={preferences.maxDistance}
                onChange={handleInputChange}
                min="1"
                className="input"
              />
            </div>
            <button type="submit" className="button">Get AI Recommendations</button>
          </form>
          {recommendations.length > 0 && (
            <div className="recommendation">
              <h2>AI Recommendations</h2>
              <ul>
                {recommendations.map((restaurant) => (
                  <li key={restaurant.id}>
                    <h3>{restaurant.name}</h3>
                    <p>Cuisine: {restaurant.cuisine}</p>
                    <p>Price Range: {restaurant.priceRange}</p>
                    <p>Rating: {restaurant.rating} / 5</p>
                    <p>Distance: {restaurant.distance.toFixed(2)} km</p>
                    <p>Featured Dishes: {restaurant.dishes.join(", ")}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AIFoodRecommender;
