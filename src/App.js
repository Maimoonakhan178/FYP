import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import RestaurantProfile from "./components/Restaurant -temp/restaurantprofile";
import SignUpPage from "./components/Signup/signup";
import LoginPage from './components/Signup/login';
import FoodSelection from './components/FoodSelection/FoodSelectionPage';

const App = () => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [hasSearched, setHasSearched] = useState(false); 
  const [loggedIn, setLoggedIn] = useState(false);  // Declare loggedIn state here

  const handleSearch = (query) => {
    setSearchQuery(query || ""); 
    setHasSearched(true); 
  };

  return (
    <Router>
      <MainRoutes 
        handleSearch={handleSearch} 
        searchQuery={searchQuery} 
        hasSearched={hasSearched} 
        loggedIn={loggedIn}  // Pass loggedIn as prop
        setLoggedIn={setLoggedIn}  // Pass setLoggedIn as prop
      />
    </Router>
  );
};

// Main routes component
const MainRoutes = ({ handleSearch, searchQuery, hasSearched, loggedIn, setLoggedIn }) => {
  const location = useLocation();

  // Check if the current page is '/food-selection' or '/login' or '/signup' to avoid rendering the header
  const isNoHeaderPage = location.pathname === "/food-selection" || location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {/* Render header only if it's not the food-selection, login, or signup page */}
      {!isNoHeaderPage && <Header />}

      <Routes>
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
              <ChatbotComponent />
            </>
          }
        />

        <Route path="/restaurant" element={<><Restaurants /><Footer /></>} />
        <Route path="/recommendation" element={<><Recommendation /><Footer /></>} />
        <Route path="/contact" element={<><Contact /><Footer /></>} />
        <Route path="/survey" element={<><Survey /><Footer /></>} />
        <Route path="/restaurantrecommendation" element={<><RestaurantRecommendationCarousel /><Footer /></>} />

        {/* Routes for Signup and Login */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
        
        {/* Conditionally render the food selection page */}
        {loggedIn && <Route path="/food-selection" element={<FoodSelection />} />}

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<><HeroSection onSearch={handleSearch} /><Footer /></>} />
      </Routes>
    </>
  );
};

export default App;
