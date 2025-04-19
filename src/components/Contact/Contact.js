import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent! ✅");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Container maxWidth="md" sx={{ my: 4, textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom marginTop={13}>
        Contact Us
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={3}>
        Have questions or feedback? Drop us a message below.
      </Typography>

      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Your Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Your Message"
              name="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: "20px" }}>
              Send Message
            </Button>
          </Box>
        </Grid>

        {/* Google Maps */}
        <Grid item xs={12} md={6}>
          <Box sx={{ width: "100%", height: "100%", borderRadius: "10px", overflow: "hidden", boxShadow: 3 }}>
            <iframe
              title="Google Map"
              width="100%"
              height="250"
              frameBorder="0"
              style={{ border: 0, borderRadius: "10px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.6541162326165!2d67.03657437595833!3d24.861462746899867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e5f6aab0853%3A0xd97f26cf0b4a5f3f!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1614084000000"
              allowFullScreen
            ></iframe>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
