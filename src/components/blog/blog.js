import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const Blog = () => {
  const [posts] = useState([
    {
      title: "The Future of Web Development",
      date: "January 5, 2025",
      excerpt:
        "Web development is evolving at a rapid pace. In this post, we explore the latest trends and tools...",
      author: "John Doe",
    },
    {
      title: "How to Build a Responsive Website",
      date: "January 3, 2025",
      excerpt:
        "A responsive website adjusts its layout based on the screen size of the device. This guide will help you get started...",
      author: "Jane Smith",
    },
    {
      title: "Understanding JavaScript ES6 Features",
      date: "December 30, 2024",
      excerpt:
        "ES6 introduced many new features to JavaScript. In this post, we’ll cover the most important updates...",
      author: "James Bond",
    },
  ]);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ marginBottom: 4, fontWeight: "bold" }}
      >
        Blog
      </Typography>
      <Grid container spacing={4}>
        {posts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: 2 }}
                >
                  {post.date}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  {post.excerpt}
                </Typography>
                <Button variant="contained" color="primary" size="small">
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Blog;
