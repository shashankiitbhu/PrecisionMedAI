const express = require("express");
const router = express.Router();
const axios = require('axios');

require('dotenv').config();
const FDA_API_URL = process.env.FDA_API_URL;
const FDA_API_KEY = process.env.FDA_API_KEY;

// Dummy GET endpoint
router.get('/events', async (req, res) => {
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
// Drug Label Endpoint
router.get('/drug-labels', async (req, res) => {
  const searchQuery = req.query.search || '';
  try {
    const response = await axios.get(`https://api.fda.gov/drug/label.json?search=openfda.generic_name:${searchQuery}&limit=10`);
    const listDrugs = response.data.results.map((drug) => ({
      id: drug.id,
      name: drug.openfda.brand_name || 'N/A',
      generic_name: drug.openfda.generic_name || 'N/A',
      indications: drug.indications_and_usage || 'N/A',
      dosage: drug.dosage_and_administration || 'N/A',
      warnings: drug.warnings || 'N/A',
      adverse_reactions: drug.adverse_reactions || 'N/A',
      active_ingredient: drug.active_ingredient || 'N/A',
      contraindications: drug.contraindications || 'N/A',
      pharmacologic_class: drug.pharmacologic_class || 'N/A',
      marketing_status: drug.openfda.marketing_status || 'N/A',
      manufacturer: drug.openfda.manufacturer_name || 'N/A',
      boxed_warning: drug.boxed_warning || 'N/A',
    }));
    res.json(listDrugs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error fetching drug labels');
  }
});

// Device Events Endpoint
router.get('/device-events', async (req, res) => {
  try {
    const response = await axios.get(`https://api.fda.gov/device/event.json?limit=10`);
    res.json(response.data.results);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error fetching device events');
  }
});

// Drug Recall Endpoint
router.get('/drug-recalls', async (req, res) => {
  try {
    const response = await axios.get(`https://api.fda.gov/drug/enforcement.json?limit=10`);
    res.json(response.data.results);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error fetching drug recalls');
  }
});

const extractDrugData = (data) => {
  return {
    drug_name: data.openfda.brand_name || 'N/A',
    generic_name: data.openfda.generic_name || 'N/A',
    indications: data.indications_and_usage || 'N/A',
    dosage: data.dosage_and_administration || 'N/A',
    warnings: data.warnings || 'N/A',
    adverse_reactions: data.adverse_reactions || 'N/A',
    active_ingredient: data.active_ingredient || 'N/A',
    contraindications: data.contraindications || 'N/A',
    pharmacologic_class: data.pharmacologic_class || 'N/A',
    marketing_status: data.openfda.marketing_status || 'N/A',
    manufacturer: data.openfda.manufacturer_name || 'N/A',
  };
}

module.exports = router;
module.exports = router;
