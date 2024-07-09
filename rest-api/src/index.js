// src/index.js
const express = require("express");
const app = express();

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Optional: Add CORS middleware if your API will be accessed from different domains
const cors = require("cors");
app.use(cors());

// Import routes
const routes = require("./routes/index");

// Use routes
app.use(routes);

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(4000);
console.log("Server on port 4000");