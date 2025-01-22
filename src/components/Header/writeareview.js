import React, { useState } from "react";
import { Button, TextField, Box, Rating, Typography } from "@mui/material";

const WriteReview = ({ onSubmitReview }) => {
  const [review, setReview] = useState("");
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(""); // For displaying error messages

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleSubmit = () => {
    if (!review || rating === 0) {
      setError("Please provide a review and a rating.");
      return;
    }
    setError(""); // Clear any previous errors
    onSubmitReview({ review, rating, image });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '500px', margin: 'auto' }}>
      <TextField
        label="Write your review"
        multiline
        rows={4}
        value={review}
        onChange={handleReviewChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Rating
          name="rating"
          value={rating}
          onChange={handleRatingChange}
          size="large"
          sx={{ marginRight: 2 }}
        />
        <span>Rating: {rating}</span>
      </Box>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginBottom: "15px" }}
      />
      {image && <img src={image} alt="Preview" style={{ width: '100px', marginBottom: '10px' }} />}
      
      {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>} {/* Display error message */}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ borderRadius: 2, width: '100%' }}
      >
        Submit Review
      </Button>
    </Box>
  );
};

export default WriteReview;
