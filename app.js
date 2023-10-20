// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost/your-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a MongoDB schema and model
const travelSchema = new mongoose.Schema({
  name: String,
  num: String,
  email: String,
  ticketType: String,
  numTravelers: Number,
  paymentMethod: String,
});

const Travel = mongoose.model('Travel', travelSchema);

// Configure middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., HTML, CSS, images)
app.use(express.static('public'));

// Define a route to handle form submissions
app.post('/book_travel', (req, res) => {
  const formData = req.body;

  // Create a new Travel document and save it to MongoDB
  const travelData = new Travel({
    name: formData.name,
    num: formData.num,
    email: formData.email,
    ticketType: formData['ticket-type'],
    numTravelers: formData.num_travelers,
    paymentMethod: formData['payment-method'],
  });

  travelData.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while saving your data.');
    } else {
      res.status(200).send('Data has been successfully saved.');
    }
  });
});

// Start the Express.js server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
