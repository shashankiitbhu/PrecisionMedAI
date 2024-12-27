import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Function to fetch drug data
export const fetchDrugData = async () => {
  try {
    console.log("Not Error")
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching drug data:', error.message);
    throw error;
  }
};
