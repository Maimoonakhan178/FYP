const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const reviews = []; // Temporary in-memory storage for reviews

app.post('/api/reviews', (req, res) => {
  const { review } = req.body;

  if (!review) {
    return res.status(400).json({ message: 'Review content is required' });
  }

  const newReview = {
    id: reviews.length + 1,
    text: review,
    date: new Date(),
  };

  reviews.push(newReview);
  console.log('New Review:', newReview);

  res.status(201).json({ message: 'Review saved successfully', review: newReview });
});

app.get('/api/reviews', (req, res) => {
  res.json(reviews);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
