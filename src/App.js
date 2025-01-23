import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup/signup";
import Login from "./components/Signup/login";
import HeroSection from "./components/Hero Section/HeroSection";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RecentActivity from "./components/Recent activity/RecentActivity";
import RestaurantCardSection from "./components/Restaurant Card Section/RestaurantCardSection";
import NewsletterSubscribe from "./components/Newsletter/NewsletterSubscribe";
import TopPicks from "./components/TopPicker/TopPicks";
import Blog from "./components/blog/blog";

const App = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Tracks the search query
  const [hasSearched, setHasSearched] = useState(false); // Tracks if the user has searched

  const handleSearch = (query) => {
    setSearchQuery(query || ""); // Update query, fallback to empty string if undefined
    setHasSearched(true); // Mark that a search was performed
  };

  return (
    <Router>
      <Routes>
        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        {/* Main Website */}
        <Route path="/blog" element={<Blog />} />
        {/* Main Website */}
        <Route
          path="/"
          element={
            <div>
              <Header />
              <HeroSection onSearch={handleSearch} />
              {hasSearched ? (
                <RestaurantCardSection searchQuery={searchQuery} />
              ) : (
                <>
           
                  <RestaurantCardSection searchQuery="" />
                </>
              )}
              <RecentActivity />
              <TopPicks />
              <NewsletterSubscribe />
              <Footer />
            </div>
          }
        />
        {/* Redirect unknown routes to /signup */}
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>

    </Router>
  );
};

export default App;
