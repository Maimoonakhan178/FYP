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
  Fade,
  Zoom,
} from "@mui/material";
import { keyframes } from "@mui/system";

import { questions, foodRecommendations } from "./data/quizData";

// Add subtle hover animation for buttons
const buttonHover = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Add slide-in animation for questions
const slideIn = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const SimpleFlavorProfileQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = (event, value) => {
    setAnswers([...answers.slice(0, currentQuestion), value]);
  };

  const nextQuestion = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        generateRecommendation();
      }
      setIsTransitioning(false);
    }, 500); // Transition delay
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
    <>
  
      <Container
        sx={{
          mt: 4,
          mb: 6,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            animation: `${slideIn} 1s ease-in-out`,
          }}
          marginTop={13}
        >
          Flavor Profile Quiz
        </Typography>
        {!recommendation ? (
          <Card
            sx={{
              maxWidth: 500,
              margin: "auto",
              p: 3,
              boxShadow: 5,
              animation: `${slideIn} 0.7s ease-in-out`,
            }}
          >
            <Fade in={!isTransitioning} timeout={500}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {questions[currentQuestion].text}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">
                    {questions[currentQuestion].minLabel}
                  </Typography>
                  <Typography variant="body2">
                    {questions[currentQuestion].maxLabel}
                  </Typography>
                </Box>
                <Slider
                  min={questions[currentQuestion].min}
                  max={questions[currentQuestion].max}
                  defaultValue={5}
                  value={answers[currentQuestion] || 5}
                  onChange={handleAnswer}
                  sx={{
                    mb: 2,
                    "& .MuiSlider-thumb": {
                      transition: "0.3s",
                      "&:hover": {
                        transform: "scale(1.2)",
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={nextQuestion}
                  fullWidth
                  sx={{
                    animation: `${buttonHover} 2s infinite`,
                    mt: 2,
                  }}
                >
                  {currentQuestion < questions.length - 1
                    ? "Next Question"
                    : "Get Recommendation"}
                </Button>
              </CardContent>
            </Fade>
          </Card>
        ) : (
          <Zoom in={!!recommendation}>
            <Card
              sx={{
                maxWidth: 500,
                margin: "auto",
                p: 3,
                boxShadow: 5,
                animation: `${slideIn} 0.7s ease-in-out`,
              }}
            >
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
                  sx={{
                    mb: 2,
                    bgcolor: "secondary.light",
                    color: "white",
                    fontWeight: "bold",
                    animation: `${buttonHover} 2s infinite`,
                  }}
                />
                <Typography variant="body1" gutterBottom>
                  {recommendation.description}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={resetQuiz}
                  fullWidth
                  sx={{
                    animation: `${buttonHover} 2s infinite`,
                    mt: 2,
                  }}
                >
                  Take Quiz Again
                </Button>
              </CardContent>
            </Card>
          </Zoom>
        )}
      </Container>

    </>
  );
};

export default SimpleFlavorProfileQuiz;
