import React from "react";
import "./TopPicks.css";
import Card from "./best (1).jpg";
import Card1 from "./best (2).jpg";
import Card2 from "./best (3).jpg";
const recommendations = [
  {
    id: 1,
    title: "Best Italian Pizza",
    description: "Hand-picked authentic Italian pizzas with fresh ingredients.",
    image: Card2,
  },
  {
    id: 2,
    title: "Award-Winning Burgers",
    description: "Juicy, mouth-watering burgers voted best in town.",
    image: Card,
  },
  {
    id: 3,
    title: "Exquisite Sushi Rolls",
    description: "Delightful sushi rolls crafted by expert chefs.",
    image: Card1,
  },
];

const TopPicks = () => {
  return (
    <div className="top-picks-container">
      <h2>🍽️ Top Picks For You</h2>
      <p className="top-picks-subtitle">
        Discover the most recommended dishes and restaurants.
      </p>
      <div className="top-picks-grid">
        {recommendations.map((item) => (
          <div key={item.id} className="top-picks-card">
            <img src={item.image} alt={item.title} className="top-picks-image" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPicks;
