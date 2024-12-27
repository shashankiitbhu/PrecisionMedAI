const express = require("express");
const router = express.Router();
const axios = require('axios');

require('dotenv').config();
const FDA_API_URL = process.env.FDA_API_URL;
const FDA_API_KEY = process.env.FDA_API_KEY;

// Dummy GET endpoint
router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.fda.gov/drug/event.json?limit=10');
    const drugs = response.data.results.map((drug) => ({
      id: drug.safetyreportid,
      country: drug.primarysourcecountry,
      reportType: drug.reporttype,
      serious: drug.serious,
      reactions: drug.patient?.reaction?.map((r) => r.reactionmeddrapt) || [],
      drugs: drug.patient?.drug?.map((d) => d.drugcharacterization) || [],
    }));
    res.json(drugs);
  } catch (error) {
    console.error('Error fetching drug data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
