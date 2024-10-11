const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/jobboardDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('Connected to MongoDB successfully');
});

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = connection;