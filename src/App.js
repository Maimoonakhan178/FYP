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
import Survey from "./components/question/question";

// Helper function to check authentication
const isAuthenticated = () => !!localStorage.getItem('user');

// ProtectedRoute component to protect routes and include Header
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? (
    <>
      <Header /> {/* Only render Header if authenticated */}
      {children} {/* Render children (protected routes) */}
    </>
  ) : (
    <Navigate to="/login" /> // Redirect to login if not authenticated
  );
};

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
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/survey" element={<Survey />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div>
                <HeroSection onSearch={handleSearch} />
                {hasSearched ? (
                  <RestaurantCardSection searchQuery={searchQuery} />
                ) : (
                  <p style={{ textAlign: "center", margin: "20px 0", fontSize: "18px" }}>
                    Use the search bar above to recommend restaurants.
                  </p>
                )}
                <RecentActivity />
                <TopPicks />
                <NewsletterSubscribe />
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes to /signup */}
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
};

export default App;
