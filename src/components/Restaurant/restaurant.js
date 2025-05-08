import React, { useState, useEffect } from "react";
import { Star, Clock, MapPin, DollarSign } from "lucide-react";
import "./RestaurantFinder.css"; // We'll create this CSS file separately

// Card component for each restaurant
const RestaurantCard = ({ restaurant }) => {
  const navigate = (url) => {
    window.location.href = url;
  };

  // Function to render price level with dollar signs
  const renderPriceLevel = (level) => {
    switch(level) {
      case "Budget": return <span><DollarSign size={14} /></span>;
      case "Mid-range": return <span><DollarSign size={14} /><DollarSign size={14} /></span>;
      case "Expensive": return <span><DollarSign size={14} /><DollarSign size={14} /><DollarSign size={14} /></span>;
      default: return <span><DollarSign size={14} /></span>;
    }
  };

  // Function to create star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="star filled" size={16} />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<Star key="half" className="star half-filled" size={16} />);
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="star empty" size={16} />);
    }
    
    return stars;
  };

  return (
    <div 
      className="restaurant-card" 
      onClick={() => navigate(`http://127.0.0.1:5000/api/restaurant/${encodeURIComponent(restaurant.name)}`)}
    >
      <div 
        className="card-image" 
        style={{ backgroundImage: `url(${restaurant.image || "/placeholder.jpg"})` }}
      >
        {restaurant.isPromoted && <span className="promoted-badge">Featured</span>}
      </div>
      <div className="card-content">
        <h3 className="restaurant-name">{restaurant.name}</h3>
        
        <div className="rating-container">
          <div className="star-rating">
            {renderStars(restaurant.average_rating)}
          </div>
          <span className="rating-text">
            {restaurant.average_rating.toFixed(1)} ({restaurant.reviews_count || 0})
          </span>
        </div>
        
        <div className="restaurant-details">
          <div className="detail-item">
            <MapPin size={14} className="detail-icon" />
            <span>{restaurant.location_name}</span>
          </div>
          
          <div className="detail-item price-level">
            {renderPriceLevel(restaurant.priceCategory)}
          </div>
          
          {restaurant.isOpenNow && (
            <div className="detail-item open-now">
              <Clock size={14} className="detail-icon" />
              <span>Open Now</span>
            </div>
          )}
        </div>
        
        <div className="cuisine-tags">
          {restaurant.cuisine_type.map((cuisine, idx) => (
            <span key={idx} className="cuisine-tag">{cuisine}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Restaurants page
export default function RestaurantFinder() {
  // server data
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // client-side filters
  const [activeFilters, setActiveFilters] = useState(["All"]);
  const filters = ["All", "Open Now", "Top Rated", "Delivery", "Outdoor Seating"];

  // backend filters
  const [minRating, setMinRating] = useState(0.0);
  const [cuisine, setCuisine] = useState("");
  const [sortOrder, setSortOrder] = useState("rating");

  // fetch on mount or when backend filters change
  useEffect(() => {
    setLoading(true);
    setError(null);

    const qs = new URLSearchParams();
    if (minRating) qs.set("minRating", minRating.toString());
    if (cuisine) qs.set("cuisine", cuisine);
    if (sortOrder) qs.set("sort", sortOrder);

    fetch(`http://127.0.0.1:5000/api/restaurants?${qs.toString()}`, { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
        }
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          return res.json();
        } else {
          const body = await res.text();
          throw new Error(`Expected JSON but got ${contentType} - ${body.substring(0,200)}...`);
        }
      })
      .then((data) => {
        // Process the data to add isOpenNow flag
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentTime = currentHour * 60 + currentMinutes;
        
        const processedData = data.map(restaurant => {
          // Assuming restaurant has openTime and closeTime in "HH:MM" format
          let isOpenNow = false;
          
          if (restaurant.openTime && restaurant.closeTime) {
            const [openHour, openMin] = restaurant.openTime.split(':').map(Number);
            const [closeHour, closeMin] = restaurant.closeTime.split(':').map(Number);
            
            const openTimeMinutes = openHour * 60 + openMin;
            const closeTimeMinutes = closeHour * 60 + closeMin;
            
            isOpenNow = currentTime >= openTimeMinutes && currentTime <= closeTimeMinutes;
          }
          
          return {
            ...restaurant,
            isOpenNow
          };
        });
        
        setRestaurants(processedData);
      })
      .catch((err) => {
        console.error("Fetch /api/restaurants failed:", err);
        setError(err.message || "Failed to load restaurants");
      })
      .finally(() => setLoading(false));
  }, [minRating, cuisine, sortOrder]);

  // toggle client-side filters
  const toggleFilter = (filter) => {
    if (filter === "All") return setActiveFilters(["All"]);
    setActiveFilters((prev) => {
      const next = prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev.filter((f) => f !== "All"), filter];
      return next.length ? next : ["All"];
    });
  };

  // apply client-side filtering
  const filteredRestaurants = restaurants.filter((r) => {
    if (activeFilters.includes("All")) return true;
    
    return activeFilters.every((filter) => {
      switch(filter) {
        case "Open Now": 
          return r.isOpenNow;
        case "Top Rated": 
          return r.average_rating >= 4.0;
        case "Delivery": 
          return r.hasDelivery;
        case "Outdoor Seating": 
          return r.hasOutdoorSeating;
        default: 
          return true;
      }
    });
  });

  return (
    <div className="restaurant-finder">
      <div className="header">
        <h1>Discover Karachi's Finest Dining</h1>
        <p>Find and explore the best restaurants tailored to your taste</p>
      </div>

      <div className="filters-section">
        <div className="search-options">
          <div className="rating-filter">
            <label htmlFor="min-rating">Min Rating:</label>
            <input
              id="min-rating"
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
            />
            <span className="rating-value">{minRating.toFixed(1)}</span>
          </div>
          
          <div className="cuisine-filter">
            <input
              type="text"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              placeholder="Search by cuisine..."
              className="cuisine-input"
            />
          </div>
          
          <div className="sort-filter">
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              className="sort-select"
            >
              <option value="rating">Sort by Rating</option>
              <option value="reviews">Sort by Most Reviewed</option>
              <option value="newest">Sort by Newest</option>
            </select>
          </div>
        </div>
        
        <div className="filter-tags">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-tag ${activeFilters.includes(filter) ? 'active' : ''}`}
              onClick={() => toggleFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Discovering restaurants...</p>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      )}

      {/* Results */}
      {!loading && !error && (
        <>
          <div className="results-info">
            <p>Found {filteredRestaurants.length} restaurants</p>
          </div>
          
          <div className="restaurants-grid">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.restaurant_id} restaurant={restaurant} />
              ))
            ) : (
              <div className="no-results">
                <p>No restaurants match your filters</p>
                <button className="reset-button" onClick={() => {
                  setActiveFilters(["All"]);
                  setMinRating(0);
                  setCuisine("");
                }}>
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}