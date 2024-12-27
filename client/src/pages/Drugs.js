import React, { useState, useEffect } from 'react';
import { fetchDrugData } from '../api/api';
import DrugEventsCard from '../components/DrugEventsCard'

const DrugList = () => {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDrugs = async () => {
      try {
        const data = await fetchDrugData();
        console.log(data);
        setDrugs(data || []); // Assuming `results` contains the drug list
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch drug data');
        setLoading(false);
      }
    };

    getDrugs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
     DrugEventsCard({drugs})
  );
};

export default DrugList;
