import React from "react";

const RestaurantProfile = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      {/* Restaurant Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px", background: "#fff", padding: "15px", borderRadius: "8px", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" }}>
        <img
          src="https://source.unsplash.com/100x100/?restaurant"
          alt="Restaurant Logo"
          style={{ borderRadius: "50%", width: "60px", height: "60px" }}
        />
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", margin: "0" }}>Sisterita</h2>
          <p style={{ color: "#666", margin: "5px 0" }}>Breakfast & Brunch, New American, Thai</p>
          <p style={{ color: "green", fontWeight: "bold" }}>Open: 8:00 AM - 2:30 PM</p>
        </div>
      </div>

      {/* Reviews & Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "red", fontSize: "20px" }}>★★★★★</span>
          <p style={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>4.6 (772 reviews)</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ background: "red", color: "white", padding: "8px 12px", borderRadius: "5px", border: "none" }}>Write a Review</button>
          <button style={{ background: "#eee", padding: "8px 12px", borderRadius: "5px", border: "none" }}>Add Photo</button>
          <button style={{ background: "#eee", padding: "8px 12px", borderRadius: "5px", border: "none" }}>Share</button>
        </div>
      </div>

      {/* Updates from Business */}
      <div style={{ marginTop: "30px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>Updates From This Business</h3>
        <div style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
          <div style={{ width: "200px", background: "white", borderRadius: "8px", overflow: "hidden", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" }}>
            <img
              src="https://source.unsplash.com/200x150/?brunch"
              alt="Event"
              style={{ width: "100%", height: "120px", objectFit: "cover" }}
            />
            <div style={{ padding: "10px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: "bold" }}>Join us on Mother’s Day!!</h4>
              <p style={{ fontSize: "14px", color: "#666" }}>Enjoy our breakfast and lunch from 8 am to 2:30 pm...</p>
            </div>
          </div>

          <div style={{ width: "200px", background: "white", borderRadius: "8px", overflow: "hidden", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" }}>
            <img
              src="https://source.unsplash.com/200x150/?cafe"
              alt="Event"
              style={{ width: "100%", height: "120px", objectFit: "cover" }}
            />
            <div style={{ padding: "10px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: "bold" }}>We're open on St. Patrick’s Day!</h4>
              <p style={{ fontSize: "14px", color: "#666" }}>Join us from 8 am to 2:30 pm on March 17...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Section */}
      <div style={{ marginTop: "30px", background: "white", padding: "15px", borderRadius: "8px", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>Order Food</h3>
        <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
          <button style={{ borderBottom: "2px solid red", paddingBottom: "5px" }}>Takeout</button>
          <button style={{ color: "#888" }}>Delivery</button>
        </div>
        <p style={{ marginTop: "10px", color: "#666" }}>No Fees • Pick up in <span style={{ fontWeight: "bold" }}>10-20 mins</span></p>
        <button style={{ background: "red", color: "white", width: "100%", padding: "10px", borderRadius: "5px", border: "none", marginTop: "10px" }}>
          Start Order
        </button>
      </div>

      {/* Contact Info */}
      <div style={{ marginTop: "15px", color: "#0073e6" }}>
        <a href="https://sisterita.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", fontWeight: "bold" }}>
          sisterita.com
        </a>
        <p style={{ color: "#333", marginTop: "5px" }}>(415) 649-1919</p>
      </div>
    </div>
  );
};

export default RestaurantProfile;
