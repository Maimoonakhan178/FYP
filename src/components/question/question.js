import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Slider,
  Chip,
  CardMedia,
  Container,
} from "@mui/material";

const questions = [
  { id: 1, text: "How spicy do you like your food?", min: 0, max: 10, minLabel: "Mild", maxLabel: "Very Spicy" },
  { id: 2, text: "Do you prefer savory or sweet flavors?", min: 0, max: 10, minLabel: "Savory", maxLabel: "Sweet" },
  { id: 3, text: "How adventurous are you with trying new cuisines?", min: 0, max: 10, minLabel: "Conservative", maxLabel: "Very Adventurous" },
  { id: 4, text: "Do you prefer light meals or hearty dishes?", min: 0, max: 10, minLabel: "Light", maxLabel: "Hearty" },
];

const foodRecommendations = [
  {
    name: "Spicy Tuna Poke Bowl",
    description: "Fresh tuna cubes marinated in a spicy sauce, served over rice with avocado and seaweed.",
    cuisine: "Hawaiian-Japanese Fusion",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Truffle Mushroom Risotto",
    description: "Creamy Arborio rice cooked with wild mushrooms and finished with truffle oil.",
    cuisine: "Italian",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Mango Sticky Rice",
    description: "Sweet sticky rice topped with fresh mango slices and coconut cream.",
    cuisine: "Thai",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Bulgogi Tacos",
    description: "Korean BBQ beef in soft corn tortillas, topped with kimchi slaw.",
    cuisine: "Korean-Mexican Fusion",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
];

const SimpleFlavorProfileQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [recommendation, setRecommendation] = useState(null);

  const handleAnswer = (event, value) => {
    setAnswers([...answers.slice(0, currentQuestion), value]);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      generateRecommendation();
    }
  };

  const generateRecommendation = () => {
    const adventurousness = answers[2];
    const spiciness = answers[0];
    const sweetness = answers[1];

    let recommendation;

    if (adventurousness > 7) {
      recommendation = spiciness > 5 ? foodRecommendations[0] : foodRecommendations[3];
    } else {
      recommendation = sweetness > 5 ? foodRecommendations[2] : foodRecommendations[1];
    }

    setRecommendation(recommendation);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setRecommendation(null);
  };

  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Flavor Profile Quiz
      </Typography>
      {!recommendation ? (
        <Card sx={{ maxWidth: 500, margin: "auto", p: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {questions[currentQuestion].text}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2">{questions[currentQuestion].minLabel}</Typography>
              <Typography variant="body2">{questions[currentQuestion].maxLabel}</Typography>
            </Box>
            <Slider
              min={questions[currentQuestion].min}
              max={questions[currentQuestion].max}
              defaultValue={5}
              value={answers[currentQuestion] || 5}
              onChange={handleAnswer}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={nextQuestion}
              fullWidth
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "Get Recommendation"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ maxWidth: 500, margin: "auto", p: 3, boxShadow: 3 }}>
          <CardMedia
            component="img"
            height="200"
            image={recommendation.imageUrl}
            alt={recommendation.name}
            sx={{ borderRadius: 2, mb: 2 }}
          />
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {recommendation.name}
            </Typography>
            <Chip
              label={recommendation.cuisine}
              sx={{ mb: 2, bgcolor: "secondary.light", color: "white" }}
            />
            <Typography variant="body1" gutterBottom>
              {recommendation.description}
            </Typography>
            <Button variant="outlined" onClick={resetQuiz} fullWidth>
              Take Quiz Again
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default SimpleFlavorProfileQuiz;
