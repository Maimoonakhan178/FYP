import React, { useState } from "react";
import { TextField, Button, Typography, Box, IconButton, Rating } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const WriteReview = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !review || rating === 0) {
      alert("Please fill in all fields including rating.");
      return;
    }
    alert("Thank you for your review!");
    setTitle("");
    setReview("");
    setRating(0);
    setImage(null);
  };

  return (
    <>
      {/* Centered Modal Without Background Blur */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicked inside
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Write a Review
        </Typography>
        <Rating
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Review"
          multiline
          rows={4}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
        </Button>

        {/* Image Preview */}
        {image && (
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <img
              src={image}
              alt="Uploaded Preview"
              style={{
                width: "100%",
                maxHeight: 150,
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          </Box>
        )}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default WriteReview;
