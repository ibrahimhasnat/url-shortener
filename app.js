const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const Url = require('./model/Url');

const app = express();
app.use(cors());

app.use(express.json({ extends: false }));

// Connect Mongo DB
connectDB();

// Handle Production
if (process.env.NODE_ENV === 'production') {
  // static folder
  app.use(express.static(__dirname + '/public'));

  // SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

// Home Route
app.get('/shorten_list', async (req, res) => {
  try {
    const urls = await Url.find({});
    return res.json(urls);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Define Route
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
