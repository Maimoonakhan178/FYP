import React, { useState, useEffect } from 'react';
import './RestaurantCardSection.css';
import placeholder from './placeholder.jpg'; // fallback image

// Base URL for dish images
const IMG_BASE = 'https://c602-2400-adc1-4a9-a00-47a-8f89-7a8c-c33c.ngrok-free.app/media/dish';

export default function RestaurantCardSection({ searchQuery }) {
  const stored = localStorage.getItem('user');
  const user = stored ? JSON.parse(stored) : {};
  const location = user.location || 'your area';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      setResults([]);
      return;
    }
    setLoading(true);

    const q = `${searchQuery.toLowerCase()} at ${location}`;
    const form = new FormData();
    form.append('query', q);

    fetch('https://c602-2400-adc1-4a9-a00-47a-8f89-7a8c-c33c.ngrok-free.app/api/search', {
      method: 'POST',
      body: form,
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(Array.isArray(data.results) ? data.results : []);
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [searchQuery, location]);

  if (loading) {
    return <div className="rc-loading">Loading recommendations…</div>;
  }
  if (!results.length) {
    return null;
  }

  return (
    <section className="restaurantSection">
      <h2 className="sectionTitle">Recommended for you</h2>
      <div className="cardGrid">
        {results.map((r, i) => {
          const lat = parseFloat(r.location_latitude);
          const lon = parseFloat(r.location_longitude);
          const latText = !isNaN(lat) ? lat.toFixed(4) : r.location_latitude;
          const lonText = !isNaN(lon) ? lon.toFixed(4) : r.location_longitude;

          // Determine image URL or fallback
          const imgUrl =
            `${IMG_BASE}/${r.dish_id}.jpg`;
          
          return (
            <div key={i} className="card">
              <div className="cardImage">
                <img
                  src={imgUrl}
                  alt={r.dish_name}
                  className="cardImageImg"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = placeholder;
                  }}
                />
              </div>
              <div className="cardBody">
                <h3 className="cardTitle">
                  {r.restaurant_name} — {r.location_name}
                </h3>
                <p className="cardSubtitle">
                  <strong>Dish:</strong> {r.dish_name}
                </p>
                <p className="cardMeta">
                  <strong>Price:</strong> {Number(r.price).toLocaleString()} PKR
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
