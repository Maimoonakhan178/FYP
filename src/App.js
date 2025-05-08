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

function App() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {}
    }
  }, []);

  // Sync state + localStorage
  const saveUser = (u) => {
    if (u) localStorage.setItem("user", JSON.stringify(u));
    else localStorage.removeItem("user");
    setUser(u);
  };

  const handleSearch = (q) => {
    setSearchQuery(q);
    setHasSearched(true);
  };

  return (
    <Router>
      <MainRoutes
        user={user}
        saveUser={saveUser}
        searchQuery={searchQuery}
        hasSearched={hasSearched}
        onSearch={handleSearch}
      />
    </Router>
  );
}

function MainRoutes({
  user,
  saveUser,
  searchQuery,
  hasSearched,
  onSearch,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  const isWizard = [
    "/select-restaurants",
    "/select-branches",
    "/food-selection",
  ].includes(path);
  const isAuth = ["/signup", "/login"].includes(path);

  // if not logged in and not on auth, send to login
  if (!user && !isAuth) {
    return <Navigate to="/login" replace />;
  }

  // If fully onboarded, block wizard & auth
  if (user?.onboarded && (isWizard || isAuth)) {
    return <Navigate to="/" replace />;
  }
  // If signed up but not finished wizard, block home & other non-wizard
  if (user && !user.onboarded && !isWizard) {
    return <Navigate to="/select-restaurants" replace />;
  }

  const hideChrome = isWizard || isAuth;

  return (
    <>
      {!hideChrome && (
        <Header
          user={user}
          onLogout={() => {
            saveUser(null);
            navigate("/login", { replace: true });
          }}
        />
      )}

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
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
            <SignUpPage
              onSuccess={({ email }) => {
                saveUser({ email, onboarded: false });
                navigate("/select-restaurants", { replace: true });
              }}
            />
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            <LoginPage
              onLogin={({ email, name, ip }) => {
                saveUser({ email, name, ip, onboarded: true });
                navigate("/", { replace: true });
              }}
            />
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
                saveUser({ ...user, onboarded: true });
                navigate("/", { replace: true });
              }}
            />
          }
        />

        {/* CATCH-ALL */}
        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} replace />}
        />
      </Routes>
    </>
  );
}

export default App;
