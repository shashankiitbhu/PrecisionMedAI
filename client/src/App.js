import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DrugList from './pages/Drugs';
import Dashboard from './pages/Dashboard';
import Timetable from './components/Timetable';

const App = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Timetable />
    </div>
  );
};

export default App;
