import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DrugList from './pages/Drugs';
import Dashboard from './pages/Dashboard';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/events" element={<DrugList />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
