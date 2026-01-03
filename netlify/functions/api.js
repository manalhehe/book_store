const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Replace with your real MONGO_URI from your .env
mongoose.connect(process.env.MONGO_URI);

const Book = mongoose.model('Book', new mongoose.Schema({
  title: String, author: String, price: Number, image: String, genre: String
}));

// Your existing API routes go here
app.get('/.netlify/functions/api/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

module.exports.handler = serverless(app);