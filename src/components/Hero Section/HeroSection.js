import React, { useState } from "react";
import "./HeroSection.css";


const HeroSection = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() === "") {
      console.log("Please enter a search query");
    } else {
      onSearch(searchQuery); // Pass the search query to the parent
    }
  };

  return (
    <div className="heroImage">
      <div className="heroContent">
        <h1>Welcome to Foodie's Paradise</h1>
        <p>Explore the best food spots in your city</p>

        <div className="search-container">
          <input
            type="text"
            className="searchBar"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for restaurants..."
          />
          <button className="searchButton" onClick={handleSearchClick}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
