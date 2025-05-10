import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users/:id" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
