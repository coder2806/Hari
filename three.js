const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost/Booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define schemas and models for each page's data
const page1Schema = new mongoose.Schema({
  // Define data fields specific to page 1
  "name": String,
  "Password": String,
  "email": String,
  "num_travelers": Number,
});

const Page1Model = mongoose.model('Page1Data', page1Schema);

const page2Schema = new mongoose.Schema({
  // Define data fields specific to page 2
  "name": String,
  "Password": String,
  "email": String,
  "num_travelers": Number,
});

const Page2Model = mongoose.model('Page2Data', page2Schema);

const page3Schema = new mongoose.Schema({
  // Define data fields specific to page 3
  "name": String,
  "email": String,
  "subject": String,
  "message": String,
});

const Page3Model = mongoose.model('Page3Data', page3Schema);

// Configure body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Define routes to serve webpages and handle form submissions for each page
app.get('/sign_up', (req, res) => {
  res.sendFile(__dirname + '/book.html');
});

app.get('/log_in', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/contact.html');
});

app.post('/sign_up', (req, res) => {
  const newData = new Page1Model({
    "name": req.body.name,
    "Password": req.body.Password,
    "email": req.body.email,
    "num_travelers": req.body.num_travelers,
  });

  newData.save((err) => {
    if (err) {
      console.error('Error saving data for Page 1 to MongoDB:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/index.html'); // Redirect to index.html
    }
  });
});

app.post('/log_in', (req, res) => {
  const newData = new Page2Model({
    "name": req.body.name,
    "Password": req.body.Password,
    "email": req.body.email,
    "num_travelers": req.body.num_travelers,
  });

  newData.save((err) => {
    if (err) {
      console.error('Error saving data for Page 2 to MongoDB:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/index.html'); // Redirect to index.html
    }
  });
});

app.post('/contact', (req, res) => {
  const newData = new Page3Model({
    "name": req.body.name,
    "email": req.body.email,
    "subject": req.body.subject,
    "message": req.body.message,
  });

  newData.save((err) => {
    if (err) {
      console.error('Error saving data for Page 3 to MongoDB:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/index.html'); // Redirect to index.html
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
