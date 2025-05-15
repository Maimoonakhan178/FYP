import React, { useState, useEffect } from 'react';

const IMG_BASE = 'https://c602-2400-adc1-4a9-a00-47a-8f89-7a8c-c33c.ngrok-free.app/media/dish';
const FALLBACK = 'https://via.placeholder.com/…';

const Dish = () => {
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sortOption, setSortOption] = useState('popularity');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Data state
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hoveredDishId, setHoveredDishId] = useState(null);

  // Helper for toggling array state
  const handleCheckboxChange = (setter, value) => {
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  // Fetch dishes whenever filters change
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Prepare form-data payload
    const formData = new FormData();
    if (searchQuery) formData.append('search', searchQuery);
    selectedCuisines.forEach(c => formData.append('cuisines', c));
    selectedPrices.forEach(p => formData.append('price_ranges', p));
    selectedRatings.forEach(r => formData.append('ratings', r));
    formData.append('sort_by', sortOption);

    fetch('https://c602-2400-adc1-4a9-a00-47a-8f89-7a8c-c33c.ngrok-free.app/api/dishes/search', {
      method: 'POST',
      body: formData,
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then(data => setDishes(data))
      .catch(err => setError(err.message || 'Failed to fetch dishes'))
      .finally(() => setLoading(false));
  }, [searchQuery, selectedCuisines, selectedPrices, selectedRatings, sortOption]);

  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      paddingBottom: '50px'
    },
    header: {
      background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
      color: 'white',
      padding: '40px 20px',
      marginBottom: '30px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center'
    },
    headerTitle: {
      fontSize: '32px',
      fontWeight: '700',
      marginBottom: '8px'
    },
    headerSubtitle: {
      fontSize: '16px',
      fontWeight: '400',
      opacity: '0.9',
      maxWidth: '600px',
      margin: '0 auto'
    },
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      flexDirection: 'row',
      gap: '30px'
    },
    mobileFilterBtn: {
      display: 'none',
      width: '100%',
      padding: '12px',
      backgroundColor: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      marginBottom: '20px',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px'
    },
    filterColumn: {
      width: '280px',
      flexShrink: '0',
      position: 'sticky',
      top: '20px',
      alignSelf: 'flex-start'
    },
    filterPanel: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e2e8f0'
    },
    resultsColumn: {
      flex: '1',
    },
    resultsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    resultsTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1e293b'
    },
    searchInput: {
      position: 'relative',
      marginBottom: '24px'
    },
    searchInputField: {
      width: '100%',
      padding: '10px 12px 10px 40px',
      borderRadius: '8px',
      border: '1px solid #cbd5e1',
      fontSize: '15px',
      transition: 'all 0.2s',
      backgroundColor: 'white'
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '10px',
      color: '#64748b'
    },
    sectionTitle: {
      fontSize: '15px',
      fontWeight: '600',
      color: '#334155',
      marginBottom: '16px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    checkboxContainer: {
      marginBottom: '24px'
    },
    checkboxGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      fontSize: '15px',
      color: '#475569'
    },
    checkbox: {
      marginRight: '10px',
      width: '18px',
      height: '18px',
      accentColor: '#3b82f6'
    },
    select: {
      width: '100%',
      padding: '10px 12px',
      borderRadius: '8px',
      border: '1px solid #cbd5e1',
      fontSize: '15px',
      backgroundColor: 'white',
      color: '#475569'
    },
    selectedFilters: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: '20px',
      padding: '0 0 16px 0',
      borderBottom: '1px solid #e2e8f0'
    },
    filterBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 10px',
      backgroundColor: '#ebf5ff',
      color: '#1e40af',
      borderRadius: '9999px',
      fontSize: '13px',
      fontWeight: '500',
      marginRight: '8px',
      marginBottom: '8px'
    },
    filterBadgeRemove: {
      marginLeft: '6px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      backgroundColor: 'rgba(30, 64, 175, 0.1)',
      transition: 'all 0.2s'
    },
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px'
    },
    dishCard: {
      backgroundColor: 'white',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      height: '450px',
      transition: 'transform 0.3s, box-shadow 0.3s'
    },
    dishCardHovered: {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 20px rgba(0, 0, 0, 0.12)'
    },
    dishImageContainer: {
      position: 'relative',
      height: '180px',
      overflow: 'hidden'
    },
    dishImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s'
    },
    dishImageHovered: {
      transform: 'scale(1.05)'
    },
    priceTag: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      backgroundColor: 'white',
      color: '#2563eb',
      fontWeight: '700',
      padding: '6px 12px',
      borderRadius: '9999px',
      fontSize: '14px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    cardContent: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      flex: '1'
    },
    dishTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '8px',
      display: '-webkit-box',
      WebkitLineClamp: '2',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    cuisineBadge: {
      display: 'inline-block',
      backgroundColor: '#ebf5ff',
      color: '#1e40af',
      fontSize: '12px',
      fontWeight: '500',
      padding: '3px 10px',
      borderRadius: '9999px',
      marginBottom: '12px'
    },
    detailsRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    },
    categoryLabel: {
      fontSize: '14px',
      color: '#64748b'
    },
    ratingContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    star: {
      color: '#facc15',
      fontSize: '16px'
    },
    emptyStar: {
      color: '#e5e7eb',
      fontSize: '16px'
    },
    ratingText: {
      fontSize: '14px',
      color: '#64748b',
      marginLeft: '4px'
    },
    description: {
      fontSize: '14px',
      color: '#64748b',
      marginBottom: '12px',
      flex: '1',
      display: '-webkit-box',
      WebkitLineClamp: '3',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    restaurantInfo: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#475569',
      marginBottom: '16px'
    },
    orderButton: {
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      padding: '10px',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      marginTop: 'auto'
    },
    orderButtonHover: {
      backgroundColor: '#1d4ed8'
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '300px'
    },
    loader: {
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #2563eb',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      animation: 'spin 1s linear infinite'
    },
    '@keyframes spin': {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' }
    },
    errorContainer: {
      backgroundColor: '#fef2f2',
      borderRadius: '10px',
      padding: '24px',
      textAlign: 'center',
      color: '#b91c1c'
    },
    errorTitle: {
      fontWeight: '600',
      marginBottom: '8px',
      fontSize: '18px'
    },
    errorMessage: {
      fontSize: '14px'
    },
    noResultsContainer: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '40px',
      textAlign: 'center',
      gridColumn: '1 / -1',
      border: '1px solid #e2e8f0'
    },
    noResultsImage: {
      width: '120px',
      height: '120px',
      marginBottom: '16px',
      opacity: '0.5',
      margin: '0 auto'
    },
    noResultsTitle: {
      fontWeight: '600',
      fontSize: '18px',
      color: '#475569',
      marginBottom: '8px'
    },
    noResultsMessage: {
      color: '#64748b',
      fontSize: '14px'
    },
    '@media (max-width: 768px)': {
      mainContent: {
        flexDirection: 'column',
        gap: '16px'
      },
      filterColumn: {
        width: '100%',
        position: 'static'
      },
      mobileFilterBtn: {
        display: 'flex'
      }
    }
  };

  // Rating Stars component
  const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    return (
      <div style={styles.ratingContainer}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={i < fullStars ? styles.star : styles.emptyStar}>★</span>
        ))}
        <span style={styles.ratingText}>{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Badge component for selected filters
  const FilterBadge = ({ label, onRemove }) => (
    <div style={styles.filterBadge}>
      {label}
      <div style={styles.filterBadgeRemove} onClick={onRemove}>×</div>
    </div>
  );

  // Create a random placeholder image URL for each dish
  const getPlaceholderImage = (dishId) => {
    // Use the dish ID to create a consistent but seemingly random image
    const imageNumber = (parseInt(dishId, 10) % 10) + 1;
    return `/api/placeholder/400/300?text=Dish+${imageNumber}`;
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>🍽️ Discover Delicious Dishes</h1>
          <p style={styles.headerSubtitle}>Explore a world of flavors with our curated selection of restaurant favorites</p>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Mobile filter toggle button */}
        <button 
          style={styles.mobileFilterBtn}
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        >
          {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'} 
          {mobileFiltersOpen ? '▲' : '▼'}
        </button>

        {/* Filters panel */}
        <div 
          style={{
            ...styles.filterColumn, 
            display: window.innerWidth > 768 || mobileFiltersOpen ? 'block' : 'none'
          }}
        >
          <div style={styles.filterPanel}>
            {/* Search input */}
            <div style={styles.searchInput}>
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={styles.searchInputField}
              />
              <span style={styles.searchIcon}>🔍</span>
            </div>

            {/* Selected filters */}
            {(selectedCuisines.length > 0 || selectedPrices.length > 0 || selectedRatings.length > 0) && (
              <div style={styles.selectedFilters}>
                {selectedCuisines.map(c => (
                  <FilterBadge 
                    key={`cuisine-${c}`} 
                    label={c} 
                    onRemove={() => setSelectedCuisines(prev => prev.filter(x => x !== c))} 
                  />
                ))}
                {selectedPrices.map(p => (
                  <FilterBadge 
                    key={`price-${p}`} 
                    label={`Up to ${p}`} 
                    onRemove={() => setSelectedPrices(prev => prev.filter(x => x !== p))} 
                  />
                ))}
                {selectedRatings.map(r => (
                  <FilterBadge 
                    key={`rating-${r}`} 
                    label={`${r} stars`} 
                    onRemove={() => setSelectedRatings(prev => prev.filter(x => x !== r))} 
                  />
                ))}
              </div>
            )}

            {/* Sort selection */}
            <div style={{marginBottom: '24px'}}>
              <h3 style={styles.sectionTitle}>Sort By</h3>
              <select
                value={sortOption}
                onChange={e => setSortOption(e.target.value)}
                style={styles.select}
              >
                <option value="popularity">Popularity</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Cuisine filters */}
            <div style={styles.checkboxContainer}>
              <h3 style={styles.sectionTitle}>Cuisine</h3>
              <div style={styles.checkboxGroup}>
                {['Pakistani', 'Italian', 'Japanese', 'Indian', 'Chinese'].map(cuisine => (
                  <label key={cuisine} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedCuisines.includes(cuisine)}
                      onChange={() => handleCheckboxChange(setSelectedCuisines, cuisine)}
                      style={styles.checkbox}
                    />
                    {cuisine}
                  </label>
                ))}
              </div>
            </div>

            {/* Price range filters */}
            <div style={styles.checkboxContainer}>
              <h3 style={styles.sectionTitle}>Price Range</h3>
              <div style={styles.checkboxGroup}>
                {['500', '1000', '1500', '2000'].map(price => (
                  <label key={price} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedPrices.includes(price)}
                      onChange={() => handleCheckboxChange(setSelectedPrices, price)}
                      style={styles.checkbox}
                    />
                    Up to PKR {price}
                  </label>
                ))}
              </div>
            </div>

            {/* Rating filters */}
            <div style={styles.checkboxContainer}>
              <h3 style={styles.sectionTitle}>Rating</h3>
              <div style={styles.checkboxGroup}>
                {[5, 4, 3, 2, 1].map(rating => (
                  <label key={rating} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedRatings.includes(rating.toString())}
                      onChange={() => handleCheckboxChange(setSelectedRatings, rating.toString())}
                      style={styles.checkbox}
                    />
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={i < rating ? styles.star : styles.emptyStar}>★</span>
                    ))}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results panel */}
        <div style={styles.resultsColumn}>
          {/* Results header */}
          <div style={styles.resultsHeader}>
            <h2 style={styles.resultsTitle}>
              {loading ? 'Searching...' : 
                dishes.length > 0 ? `${dishes.length} Dishes Found` : 'No Dishes Found'}
            </h2>
          </div>

          {/* Results display */}
          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={{
                ...styles.loader,
                animation: 'spin 1s linear infinite',
              }}></div>
            </div>
          ) : error ? (
            <div style={styles.errorContainer}>
              <h3 style={styles.errorTitle}>Error loading dishes</h3>
              <p style={styles.errorMessage}>{error}</p>
            </div>
          ) : (
            <div style={styles.cardsGrid}>
              {dishes.length === 0 ? (
                <div style={styles.noResultsContainer}>
                  <img 
                    src="/api/placeholder/120/120?text=No+Results"
                    alt="No results" 
                    style={styles.noResultsImage}
                  />
                  <h3 style={styles.noResultsTitle}>No dishes found</h3>
                  <p style={styles.noResultsMessage}>Try adjusting your filters for more results</p>
                </div>
              ) : (
                dishes.map(dish => {
                  const isHovered = hoveredDishId === dish.dish_id;
                  const imgUrl = dish.image || `${IMG_BASE}/${dish.dish_id}.jpg`;
                  return (
                    <div 
                      key={dish.dish_id} 
                      style={{
                        ...styles.dishCard,
                        ...(isHovered ? styles.dishCardHovered : {})
                      }}
                      onMouseEnter={() => setHoveredDishId(dish.dish_id)}
                      onMouseLeave={() => setHoveredDishId(null)}
                    >
                      <div style={styles.dishImageContainer}>
                        <img 
                          src={imgUrl}
                          alt={dish.dish_name}
                          style={{
                            ...styles.dishImage,
                            ...(isHovered ? styles.dishImageHovered : {})
                          }}
                        />
                        <div style={styles.priceTag}>
                          PKR {dish.price}
                        </div>
                      </div>

                      <div style={styles.cardContent}>
                        <h3 style={styles.dishTitle}>{dish.dish_name}</h3>
                        
                        <div style={styles.cuisineBadge}>
                          {dish.cuisines.join(', ')}
                        </div>
                        
                        <div style={styles.detailsRow}>
                          <span style={styles.categoryLabel}>{dish.category}</span>
                          {(dish.avg_rating || dish.rating) && (
                            <RatingStars rating={dish.avg_rating || dish.rating} />
                          )}
                        </div>
                        
                        <p style={styles.description}>{dish.description}</p>
                        
                        <div style={styles.restaurantInfo}>
                          {dish.restaurant} · {dish.restaurant_location}
                        </div>
                        
                        <button 
                          style={{
                            ...styles.orderButton,
                            ...(isHovered ? styles.orderButtonHover : {})
                          }}
                        >
                          Order Now
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dish;