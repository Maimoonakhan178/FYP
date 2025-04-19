import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/Hero Section/HeroSection";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RecentActivity from "./components/Recent activity/RecentActivity";
import RestaurantCardSection from "./components/Restaurant Card Section/RestaurantCardSection";
import NewsletterSubscribe from "./components/Newsletter/NewsletterSubscribe";
import TopPicks from "./components/TopPicker/TopPicks";
import RestaurantRecommendationCarousel from './components/RestaurantRecommendation/RestaurantRecommendationCarousel';
import Survey from "./components/question/Survey";
import Restaurants from "./components/Restaurant -temp/restaurant";
import ChatbotComponent from "./components/chatbot/chatbot";
import Recommendation from "./components/Recommendation/Recommendation";
import Contact from "./components/Contact/Contact";
import RestaurantProfile  from "./components/Restaurant -temp/restaurantprofile";




const App = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Tracks the search query
  const [hasSearched, setHasSearched] = useState(false); // Tracks if the user has searched

  const handleSearch = (query) => {
    setSearchQuery(query || ""); // Update query, fallback to empty string if undefined
    setHasSearched(true); // Mark that a search was performed
  };

  return (
    <Router>
      <Header /> {/* Header always visible */}
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <HeroSection onSearch={handleSearch} />
              {hasSearched && <RestaurantCardSection searchQuery={searchQuery} />}
              <RecentActivity />
              <TopPicks />
              <NewsletterSubscribe />
              <Footer />
              <ChatbotComponent /> {/* Chatbot added */}
            </>
          }
        />

        {/* Header Routes */}
        <Route path="/restaurant" element={<><Restaurants /><Footer /></>} />
        <Route path="/restaurant" element={<><Restaurants /><Footer /></>} />
        <Route path="/recommendation" element={<><Recommendation /><Footer /></>} />
        <Route path="/contact" element={<><Contact /><Footer /></>} />

        {/* Footer Routes */}

        <Route path="/survey" element={<><Survey /><Footer /></>} />
        <Route path="/restaurantrecommendation" element={<><RestaurantRecommendationCarousel /><Footer /></>} />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<><HeroSection onSearch={handleSearch} /><Footer /></>} />
      </Routes>
    </Router>
  );
};

export default App;
