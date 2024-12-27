import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DrugList from './pages/Drugs';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DrugList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
