require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const storiesRoute = require('./routes/stories');

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  next();
});

// Routes
app.use('/api/stories', storiesRoute);

// connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Starting Server
    app.listen(process.env.PORT, () =>
      console.log(`Connected to DB & server running at ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error));
