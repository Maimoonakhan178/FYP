import React, { useState } from "react";
import Lottie from "react-lottie";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as animationData from "./Animation - 1735323792812.json";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append("email", email);
      form.append("password", password);

      const res = await fetch("http://127.0.0.1:5000/api/signin", {
        method: "POST",
        body: form,
      });
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.detail || "Login failed");
      }

      // body = { message, ip, name }
      onLogin({ email, name: body.name, ip: body.ip });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper sx={{ padding: 4, maxWidth: 400, width: "100%" }}>
        <Lottie options={lottieOptions} height={120} width={120} />
        <Typography variant="h5" align="center" gutterBottom>
          Log In
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
