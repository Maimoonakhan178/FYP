import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import Header from "../Header/Header"; // Import Header
import Footer from "../Footer/Footer"; // Import Footer

// Styled Card Component
const StyledCard = styled(Card)({
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  overflow: "hidden",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  backgroundColor: "#fff",
  border: "1px solid #ddd",
});

// Styled Button for Read More
const StyledButton = styled(Button)({
  backgroundColor: "#FF7043", // Orange color
  color: "#fff",
  "&:hover": {
    backgroundColor: "#FF5722", // Darker orange on hover
  },
  padding: "8px 20px",
  borderRadius: "24px",
});

const Blog = () => {
  const [posts] = useState([
    {
      title: "Best Vegan Restaurants in Town",
      date: "January 5, 2025",
      excerpt:
        "Looking for the best vegan-friendly places to eat? Here are some top-rated vegan restaurants that offer delicious and sustainable meals...",
      author: "John Doe",
      rating: 4.5,
    },
    {
      title: "5 Easy Recipes for Healthy Meals",
      date: "January 3, 2025",
      excerpt:
        "Want to cook healthy meals at home? These 5 easy recipes are perfect for anyone who wants to eat nutritious without spending too much time...",
      author: "Jane Smith",
      rating: 4.7,
    },
    {
      title: "The Best Comfort Foods for Cold Days",
      date: "December 30, 2024",
      excerpt:
        "When it's cold outside, there's nothing better than a warm, comforting meal. Check out our list of the best comfort foods that will make your day...",
      author: "James Bond",
      rating: 4.8,
    },
  ]);

  return (
    <>
      <Header /> {/* Add Header */}
      <Container sx={{ marginTop: 6, paddingBottom: 6 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            marginBottom: 4,
            fontWeight: "bold",
            color: "#333",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Food Recommendations
        </Typography>
        <Grid container spacing={4}>
          {posts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard>
                <CardContent sx={{ padding: 4 }}>
                  <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#FF7043" }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: 2, fontSize: "14px", color: "#777" }}
                  >
                    {post.date} | Author: {post.author}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ marginBottom: 2, color: "#555" }}
                  >
                    {post.excerpt}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 2,
                      color: "#FF7043",
                    }}
                  >
                    Rating: {post.rating} / 5
                  </Typography>
                  <StyledButton variant="contained" size="small">
                    Read More
                  </StyledButton>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer /> {/* Add Footer */}
    </>
  );
};

export default Blog;
