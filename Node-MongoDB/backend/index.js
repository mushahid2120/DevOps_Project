const express = require('express');
const path = require('path');
const cors = require('cors');
const { MongoClient } = require('mongodb');

// Constants
const publicPath = path.join(__dirname, 'public');
const app = express();
const port = 4000;
const url = 'mongodb://mydb:27017'; // MongoDB connection URL
let db; // Global database variable

// Middleware
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Connect to MongoDB once on server startup
MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db('node-react'); // Assign database instance
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit if unable to connect
  });

// Routes
app.get('/home', (req, res) => {
  res.send('Welcome to my page');
});

app.get('/page', (req, res) => {
  res.sendFile(`${publicPath}/index.html`);
});

app.post('/submit', async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: 'No data received' });
  }
  try {
    await storeData(data);
    res.redirect('/page');
  } catch (error) {
    console.error('Error storing data:', error);
    res.status(500).json({ error: 'Failed to store data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Webserver is running on port: ${port}`);
});

// Function to store data in MongoDB
async function storeData(data) {
  try {
    const collection = db.collection('node-react-collection');
    await collection.insertOne({ Response: data });
    console.log('Data inserted:', data);
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error;
  }
}
