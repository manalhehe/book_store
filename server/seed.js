const mongoose = require('mongoose');
require('dotenv').config();

// Define Schema (Must match your server.js)
const Book = mongoose.model('Book', new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  image: String,
  genre: String,
  createdAt: { type: Date, default: Date.now }
}));

// A list of 20 stable OpenLibrary IDs to rotate through
const imageIds = [
  '8225266', '12711613', '12913958', '12725455', '12884200', 
  '10636294', '12613143', '12630132', '13401550', '12558501',
  '12818862', '12718131', '13144212', '12831888', '12836247',
  '12730105', '12852238', '12708304', '12821210', '9269962'
];

const genres = ['Fiction', 'Sci-Fi', 'Self-Help', 'Mystery', 'History', 'Business', 'Philosophy'];

async function seed100Books() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for 100 book injection...");

    await Book.deleteMany({}); // Clear old data to avoid 404 image errors

    const booksToInsert = [];

    for (let i = 1; i <= 100; i++) {
      const randomImg = imageIds[Math.floor(Math.random() * imageIds.length)];
      const randomGenre = genres[Math.floor(Math.random() * genres.length)];
      
      booksToInsert.push({
        title: `Book Haven Volume ${i}`,
        author: `Author Excellence ${i}`,
        price: Math.floor(Math.random() * (35 - 10) + 10), // Random price between 10 and 35
        image: `https://covers.openlibrary.org/b/id/${randomImg}-L.jpg`,
        genre: randomGenre
      });
    }

    await Book.insertMany(booksToInsert);
    console.log("✅ Successfully injected 100 books into MongoDB!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed100Books();