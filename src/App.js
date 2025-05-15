// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Home/Search
import HeroSection from "./components/Hero Section/HeroSection";
import RestaurantCardSection from "./components/Restaurant Card Section/RestaurantCardSection";
import RecentActivity from "./components/Recent activity/RecentActivity";
import TopPicks from "./components/TopPicker/TopPicks";
import NewsletterSubscribe from "./components/Newsletter/NewsletterSubscribe";
import ChatbotComponent from "./components/chatbot/chatbot";

// Auth
import SignUpPage from "./components/Signup/signup";
import LoginPage from "./components/Signup/login";

// Wizard steps
import RestaurantBrandSelection from "./components/Signup/RestaurantBrandSelection";
import RestaurantBranchSelection from "./components/Signup/RestaurantBranchSelection";
import FoodSelectionPage from "./components/Signup/FoodSelectionPage";

// New pages for header nav
import Restaurants from "./components/Restaurant/restaurant";
import Dish from "./components/Dish/Dish";
import Contact from "./components/Contact/Contact";
import RestaurantRecommendation from "./components/Recommendation/RestaurantRecommendation";
import DishRecommendation from "./components/Recommendation/DishRecommendation";

function App() {
  const [userEmail, setUserEmail] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem("userEmail");
    if (raw) {
      try {
        setUserEmail(raw);
      } catch {}
    }
  }, []);

  const handleSearch = (q) => {
    setSearchQuery(q);
    setHasSearched(true);
  };

  return (
    <Router>
      <MainRoutes
        userEmail={userEmail}
        saveUser={null}
        searchQuery={searchQuery}
        hasSearched={hasSearched}
        onSearch={handleSearch}
      />
    </Router>
  );
}

function MainRoutes({ userEmail, saveUser, searchQuery, hasSearched, onSearch }) {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  const isWizard = [
    "/select-restaurants",
    "/select-branches",
    "/food-selection",
  ].includes(path);
  const isAuth = ["/signup", "/login"].includes(path);

  const RequireAuth = ({ userEmail, children }) => {
    if (!userEmail) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const RedirectIfAuthenticated = ({ userEmail, children }) => {
    if (userEmail) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const hideChrome = isWizard || isAuth;

  return (
    <>
      {!hideChrome && (
        <Header
          onLogout={() => {
            navigate("/login", { replace: true });
          }}
        />
      )}

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <RequireAuth userEmail={userEmail}>
              <>
                <HeroSection onSearch={onSearch} />
                {hasSearched && (
                  <RestaurantCardSection searchQuery={searchQuery} />
                )}
                <RecentActivity />
                <TopPicks />
                <NewsletterSubscribe />
                <ChatbotComponent />
                <Footer />
              </>
            </RequireAuth>
          }
        />

        {/* RESTAURANTS LIST PAGE */}
        <Route
          path="/restaurant"
          element={
            <>
              <Restaurants />
              <Footer />
            </>
          }
        />

        {/* RECOMMENDATION PAGE */}
        <Route
          path="/dish"
          element={
            <>
              <Dish />
              <Footer />
            </>
          }
        />

        <Route
          path="/restaurant-recommendation"
          element={
            <>
              <RestaurantRecommendation />
              <Footer />
            </>
          }
        />
        <Route
          path="/dish-recommendation"
          element={
            <>
              <DishRecommendation />
              <Footer />
            </>
          }
        />

        {/* CONTACT PAGE */}
        <Route
          path="/contact"
          element={
            <>
              <Contact />
              <Footer />
            </>
          }
        />

        {/* SIGNUP */}
        <Route
          path="/signup"
          element={
            <RedirectIfAuthenticated userEmail={userEmail}>
              <SignUpPage
                onSuccess={({ email }) => {
                  navigate("/select-restaurants", { replace: true });
                }}
              />
            </RedirectIfAuthenticated>
          }
        />

        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated userEmail={userEmail}>
              <LoginPage
                onLogin={({ email, name, ip }) => {
                  navigate("/", { replace: true });
                }}
              />
            </RedirectIfAuthenticated>
          }
        />

        {/* WIZARD STEP 1 */}
        <Route
          path="/select-restaurants"
          element={<RestaurantBrandSelection />}
        />

        {/* WIZARD STEP 2 */}
        <Route
          path="/select-branches"
          element={<RestaurantBranchSelection />}
        />

        {/* WIZARD STEP 3 */}
        <Route
          path="/food-selection"
          element={
            <FoodSelectionPage
              onComplete={() => {
                navigate("/", { replace: true });
              }}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
