const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require('axios');

require('dotenv').config();
const FDA_API_URL = process.env.FDA_API_URL;
const FDA_API_KEY = process.env.FDA_API_KEY;

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/drugs", require("./routes/drugs"));

app.get('/api/drugs/search', async (req, res) => {
  const { name } = req.query;
  try {
    const response = await axios.get(`${FDA_API_URL}/drug/event.json`, {
      params: { search: name, limit: 10 },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//TODO:
//Store Data for Engineering: Set up MongoDB to save fetched data for further processing.
//Enhance API: Build filters (e.g., by date, severity, etc.) to refine results.
