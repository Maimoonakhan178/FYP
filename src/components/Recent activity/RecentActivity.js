import React, { useState } from "react";
import { Card, CardContent, CardMedia, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box, Grid } from "@mui/material";
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
  const [showAll, setShowAll] = useState(false);

  const activities = [
    {
      user: "Mario E.",
      action: "wrote a review",
      time: "Just now",
      title: "Earl of Sandwich",
      rating: 5,
      image: bgImage,
      description: "Easily one of the best fast-food sandwich chains in the U.S., Earl of Sandwich is a must-try.",
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

  const closePopup = () => setSelectedActivity(null);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedActivities = showAll ? activities : activities.slice(0, 6);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Recent Activity
      </Typography>
      <Grid container spacing={2}>
        {displayedActivities.map((activity, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ cursor: "pointer" }} onClick={() => openPopup(activity)}>
              <CardMedia
                component="img"
                alt={activity.title}
                height="140"
                image={activity.image}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="body1" fontWeight="bold">
                  {activity.user} {activity.action}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {activity.time}
                </Typography>
                <Typography variant="h6">{activity.title}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {"★".repeat(activity.rating)}{"☆".repeat(5 - activity.rating)}
                </Typography>
                {activity.description && (
                  <Typography variant="body2" color="textSecondary">
                    {activity.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Show More / Show Less Button */}
      {activities.length > 6 && (
        <Button variant="contained" sx={{ mt: 3 }} onClick={toggleShowAll}>
          {showAll ? "Show Less" : "Show More"}
        </Button>
      )}

      {/* Popup Modal */}
      {selectedActivity && (
        <Dialog open={true} onClose={closePopup} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedActivity.title}</DialogTitle>
          <DialogContent>
            <img
              src={selectedActivity.image}
              alt={selectedActivity.title}
              style={{ width: "100%", marginBottom: "16px" }}
            />
            <Typography variant="body1">
              <strong>User:</strong> {selectedActivity.user}
            </Typography>
            <Typography variant="body1">
              <strong>Action:</strong> {selectedActivity.action}
            </Typography>
            <Typography variant="body1">
              <strong>Time:</strong> {selectedActivity.time}
            </Typography>
            <Typography variant="body1">
              <strong>Rating:</strong>{" "}
              <span>{"★".repeat(selectedActivity.rating)}</span>
              <span>{"☆".repeat(5 - selectedActivity.rating)}</span>
            </Typography>
            {selectedActivity.description && (
              <Typography variant="body1">
                <strong>Description:</strong> {selectedActivity.description}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closePopup} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default RecentActivity;
