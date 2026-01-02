const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const ImageKit = require('imagekit');

const app = express();

// --- 1. MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- 2. CONFIGURATION IMAGEKIT ---
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// --- 3. MODÈLES MONGODB ---

// Modèle Livre
const Book = mongoose.model('Book', new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  genre: String,
  createdAt: { type: Date, default: Date.now }
}));

// Modèle Utilisateur
const User = mongoose.model('User', new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}));

// Modèle Commande (Order) - CRUCIAL pour le Dashboard
const Order = mongoose.model('Order', new mongoose.Schema({
  customerName: String,
  email: String,
  address: String,
  items: Array,
  total: Number,
  status: { type: String, default: 'Paid' },
  createdAt: { type: Date, default: Date.now }
}));

// --- 4. ROUTES D'AUTHENTIFICATION ---

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: "Email déjà utilisé" });

    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès !" });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ user: { email: user.email } });
    } else {
      res.status(401).json({ error: "Identifiants incorrects" });
    }
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// --- 5. ROUTES DES LIVRES ---

app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Livre supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 6. ROUTES DES COMMANDES ---

// Enregistrer une vente (Appelé par CheckoutPage.jsx)
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la commande" });
  }
});

// Récupérer les ventes (Appelé par AdminDashboard.jsx)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Erreur récupération orders" });
  }
});

// Auth ImageKit
app.get('/api/imagekit-auth', (req, res) => {
  res.send(imagekit.getAuthenticationParameters());
});

// --- 7. CONNEXION ET EXPORT (Correction Spéciale Vercel) ---
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connecté'))
  .catch(err => console.error('❌ Erreur de connexion :', err));

// On n'appelle app.listen que si on n'est pas sur Vercel (production)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`🚀 Serveur local : http://localhost:${PORT}`));
}

// L'exportation est ce qui empêche l'erreur "Function has crashed"
module.exports = app;