// ==============================================
// server.js - Express + Mongoose + Handlebars
// ==============================================
const express = require('express');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const flightRoutes = require('./controllers/flight.controller');
const passengerRoutes = require('./controllers/passenger.controller');
const seatRoutes = require('./controllers/seat.controller');
const userRoutes = require('./controllers/user.controller');
const adminRoutes = require('./controllers/admin.controller');

const app = express();
const PORT = 3000;

// ===== 1⃣ CONNECT TO MONGODB =====
mongoose.connect('mongodb://127.0.0.1:27017/airlinedb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// ===== 2⃣ CONFIGURE HANDLEBARS =====
app.engine('handlebars', engine({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// ===== 3⃣ MIDDLEWARE =====
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ===== 4⃣ ROUTES =====
app.get('/', (req, res) => {
  res.render('users/login', { title: 'Bing Bong Airlines'});
});

app.use('/admin', adminRoutes);
app.use('/flights', flightRoutes);
app.use('/passengers', passengerRoutes);
app.use('/seats', seatRoutes);
app.use('/users', userRoutes);

// ===== 5⃣ START SERVER =====
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});