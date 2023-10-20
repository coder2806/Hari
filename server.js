const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 8000; // Choose the port you want to run the server on

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define the MongoDB connection
mongoose.connect('your-mongodb-connection-string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a MongoDB schema for the booking data
const bookingSchema = new mongoose.Schema({
  name: String,
  num: String,
  email: String,
  ticketType: String,
  numTravelers: Number,
  paymentMethod: String,
});

// Create a MongoDB model
const Booking = mongoose.model('Booking', bookingSchema);

// Serve static files (e.g., your HTML, CSS, and images)
app.use(express.static('public'));

// Handle form submission
app.post('/book_travel', (req, res) => {
  const bookingData = new Booking({
    name: req.body.name,
    num: req.body.num,
    email: req.body.email,
    ticketType: req.body['ticket-type'],
    numTravelers: req.body.num_travelers,
    paymentMethod: req.body['payment-method'],
  });

  // Save the booking data to MongoDB
  bookingData.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving booking data.');
    } else {
      res.send(`Thank you, ${req.body.name}, for booking a ${req.body['ticket-type']} ticket for ${req.body.num_travelers} travelers.`);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
