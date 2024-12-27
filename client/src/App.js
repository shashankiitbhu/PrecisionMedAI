import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Placeholder from './components/Placeholder';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Home />
        <Placeholder text="Dashboard Component Coming Soon..." />
        <Placeholder text="Drug Interaction Checker Component Coming Soon..." />
      </main>
      <Footer />
    </div>
  );
};

export default App;
