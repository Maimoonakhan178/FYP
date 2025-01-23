import React, { useState } from "react";
import "./RecentActivity.css"; // Assuming you use this for styles
import bgImage from "./r.jpg";
import bgImage1 from "./r (1).jpg";
import bgImage2 from "./r (2).jpg";
import bgImage3 from "./r (3).jpg";
import bgImage4 from "./r (4).jpg";
import bgImage5 from "./r (5).jpg";
import bgImage6 from "./r (6).jpg";
import bgImage7 from "./r (7).jpg";

const RecentActivity = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showAll, setShowAll] = useState(false); // Track whether to show all activities

  const activities = [
    {
      user: "Mario E.",
      action: "wrote a review",
      time: "Just now",
      title: "Earl of Sandwich",
      rating: 5,
      image: bgImage,
      description:
        "Easily one of the best fast-food sandwich chains in the U.S., Earl of Sandwich is a must-try.",
    },
    {
      user: "Mario E.",
      action: "added a photo",
      time: "Just now",
      title: "Earl of Sandwich",
      rating: 4,
      image: bgImage1,
      description: null,
    },
    {
      user: "Stacey I.",
      action: "added a photo",
      time: "Just now",
      title: "Raising Cane's Chicken Fingers",
      rating: 4,
      image: bgImage2,
      description: null,
    },
    {
      user: "Anna P.",
      action: "checked in",
      time: "5 mins ago",
      title: "The Coffee House",
      rating: 5,
      image: bgImage3,
      description: "A cozy place for a morning coffee and quick breakfast.",
    },
    {
      user: "John D.",
      action: "wrote a review",
      time: "10 mins ago",
      title: "Sushi World",
      rating: 3,
      image: bgImage4,
      description: "The sushi was okay, but the service could be better.",
    },
    {
      user: "Linda K.",
      action: "added a photo",
      time: "15 mins ago",
      title: "Burger Shack",
      rating: 4,
      image: bgImage5,
      description: null,
    },
    {
      user: "Mark T.",
      action: "liked a review",
      time: "20 mins ago",
      title: "Pasta Paradise",
      rating: 5,
      image: bgImage6,
      description: "This pasta was absolutely delicious!",
    },
    {
      user: "Sophia R.",
      action: "added a review",
      time: "30 mins ago",
      title: "Pizza Express",
      rating: 4,
      image: bgImage7,
      description: "Great pizza, but the crust was a bit too thick for my taste.",
    },
    {
      user: "Tom W.",
      action: "added a photo",
      time: "45 mins ago",
      title: "Ice Cream Corner",
      rating: 5,
      image: bgImage,
      description: "Cards will appear with a clean, modern look, with smooth hover animations and subtle color transitions.",
    },
  ];

  const openPopup = (activity) => {
    setSelectedActivity(activity);
  };

  const closePopup = () => {
    setSelectedActivity(null);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedActivities = showAll ? activities : activities.slice(0, 6);

  return (
    <div className="recent-activity">
      <h2>Recent Activity</h2>
      <div className="activity-cards">
        {displayedActivities.map((activity, index) => (
          <div
            className="activity-card"
            key={index}
            onClick={() => openPopup(activity)}
          >
            <div className="activity-header">
              <strong>{activity.user}</strong> {activity.action} •{" "}
              <span className="activity-time">{activity.time}</span>
            </div>
            <img
              className="activity-image"
              src={activity.image}
              loading="lazy"
              alt={activity.title}
            />
            <div className="activity-content">
              <h3>{activity.title}</h3>
              <div className="activity-rating">
                <span>{"★".repeat(activity.rating)}</span>
                <span>{"☆".repeat(5 - activity.rating)}</span>
              </div>
              {activity.description && (
                <p className="activity-description">{activity.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {activities.length > 6 && !showAll && (
        <button className="btn btn-primary" onClick={toggleShowAll}>
          Show More
        </button>
      )}

      {/* Popup Modal */}
      {selectedActivity && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>
              ✖
            </button>
            <h2>{selectedActivity.title}</h2>
            <img
              src={selectedActivity.image}
              alt={selectedActivity.title}
              loading="lazy"
              className="popup-image"
            />
            <p>
              <strong>User:</strong> {selectedActivity.user}
            </p>
            <p>
              <strong>Action:</strong> {selectedActivity.action}
            </p>
            <p>
              <strong>Time:</strong> {selectedActivity.time}
            </p>
            <p>
              <strong>Rating:</strong>{" "}
              <span>{"★".repeat(selectedActivity.rating)}</span>
              <span>{"☆".repeat(5 - selectedActivity.rating)}</span>
            </p>
            {selectedActivity.description && (
              <p>
                <strong>Description:</strong> {selectedActivity.description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
