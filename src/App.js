// src/App.js

import React from 'react';
import USChemicals from './components/USChemicals';
import Dashboard from "./components/Dashboard"
import { Route, Routes } from 'react-router-dom';
// import './App.css';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<USChemicals/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
     </Routes>
     </div>
  );
}

export default App;
