import React, { useState, useEffect } from "react";
import {
  Star,
  MapPin,
  Smile,
  ThumbsUp,
  AlertCircle,
  DollarSign,
} from "lucide-react";
import "./RestaurantFinder.css";

export default function RestaurantFinder() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [minRating, setMinRating] = useState(0);
  const [cuisine, setCuisine] = useState("");
  const [sortOrder, setSortOrder] = useState("rating");

  const cuisineOptions = [
    "Italian",
    "Mexican",
    "Japanese",
    "American",
    "Indian",
  ];
  const IMG_BASE =
    "https://c602-2400-adc1-4a9-a00-47a-8f89-7a8c-c33c.ngrok-free.app/media/res";

  useEffect(() => {
    setLoading(true);
    setError(null);

    const qs = new URLSearchParams();
    if (minRating) qs.set("minRating", minRating);
    if (cuisine) qs.set("cuisine", cuisine);

    fetch(
      `https://c602-2400-adc1-4a9-a00-47a-8f89-7a8c-c33c.ngrok-free.app/api/restaurants?${qs}`,
      { credentials: "include" }
    )
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => {
        const normalized = data.map((r) => ({
          ...r,
          average_rating: parseFloat(r.average_rating) || null,
          avg_food_quality: parseFloat(r.avg_food_quality) || null,
          avg_service: parseFloat(r.avg_service) || null,
          avg_ambiance: parseFloat(r.avg_ambiance) || null,
          avg_sentiment: parseFloat(r.avg_sentiment) || null,
          popularity: parseFloat(r.popularity) || null,
        }));

        const sorted =
          sortOrder === "popularity"
            ? normalized.sort(
                (a, b) => (b.popularity || 0) - (a.popularity || 0)
              )
            : normalized;

        setRestaurants(sorted);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [minRating, cuisine, sortOrder]);

  if (loading)
    return (
      <div className="rf-loading">
        <div className="rf-spinner" />
        <p>Loading restaurants...</p>
      </div>
    );
  if (error)
    return (
      <div className="rf-error">
        <AlertCircle size={32} />
        <h3>Something went wrong</h3>
        <p>{error}</p>
      </div>
    );

  return (
    <div className="rf-container">
      <header className="rf-header">
        <h1>Find Your Next Favorite Restaurant</h1>
        <p>Discover the best dining experiences in your area</p>
      </header>

      <section className="rf-filters">
        <div className="rf-filter-item">
          <label htmlFor="cuisine-select">Cuisine</label>
          <select
            id="cuisine-select"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          >
            <option value="">All Cuisines</option>
            {cuisineOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="rf-filter-item">
          <span className="rf-filter-label">Min Rating:</span>
          <div className="rf-rating-buttons">
            {[0, 3, 3.5, 4, 4.5].map((r) => (
              <button
                key={r}
                className={`rf-button ${
                  minRating === r ? "rf-button-active" : ""
                }`}
                onClick={() => setMinRating(r)}
              >
                {r === 0 ? "All" : `${r}+`}
              </button>
            ))}
          </div>
        </div>

        <div className="rf-filter-item">
          <span className="rf-filter-label">Sort by:</span>
          <div className="rf-sort-buttons">
            {[
              { value: "rating", label: "Rating" },
              { value: "popularity", label: "Popularity" },
            ].map((opt) => (
              <button
                key={opt.value}
                className={`rf-button ${
                  sortOrder === opt.value ? "rf-button-active" : ""
                }`}
                onClick={() => setSortOrder(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rf-restaurant-grid">
        {restaurants.map((rest) => (
          <article key={rest.restaurant_id} className="rf-card">
            <div className="rf-card-image">
              <img
                src={`${IMG_BASE}/${rest.restaurant_id}.jpg`}
                alt={rest.name}
                className="rf-card-img"
                onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
              />
            </div>
            <div className="rf-card-content">
              <div className="rf-card-header">
                <h2>{rest.name}</h2>
                <div className="rf-rating">
                  <Star size={16} />
                  <span>{rest.average_rating?.toFixed(1) ?? "-"}</span>
                </div>
              </div>
              <div className="rf-card-meta">
                <div>
                  <MapPin size={16} />
                  <span>{rest.location_name}</span>
                </div>
                <div>{rest.cuisine_type.join(", ")}</div>
              </div>
              <div className="rf-scores">
                {[
                  ["Food", rest.avg_food_quality],
                  ["Service", rest.avg_service],
                  ["Ambiance", rest.avg_ambiance],
                  ["Sentiment", rest.avg_sentiment],
                ].map(([label, val]) => (
                  <div key={label} className="rf-score">
                    <ThumbsUp size={16} />
                    <span>{label}</span>
                    <div className="rf-score-value">
                      {val?.toFixed(1) ?? "-"}
                    </div>
                  </div>
                ))}
              </div>
              {/* Aspect Analytics */}
              {rest.aspect_analytics?.length > 0 && (
                <div className="rf-aspect-analytics">
                  {rest.aspect_analytics.map((a) => (
                    <div key={a.aspectType} className="rf-aspect-item">
                      <strong>{a.aspectType}</strong>
                      <div className="rf-aspect-score">
                        Sentiment: {a.avgSentimentScore.toFixed(1)}
                      </div>
                      <div className="rf-aspect-counts">
                        <span>Total Reviews: {a.averageCount}</span>
                        <span>Below Avg: {a.belowAverageCount}</span>
                        <span>Excellent: {a.brilliantCount}</span>
                        <span>Good: {a.goodCount}</span>
                        <span>Not Recommended: {a.notRecommendedCount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      {!restaurants.length && (
        <div className="rf-no-results">
          <h3>No restaurants found</h3>
          <p>Try adjusting your filters to see more results</p>
        </div>
      )}
    </div>
  );
}
