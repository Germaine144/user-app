import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile'; 
import AddUser from './components/AddUserForm';
import { UserProvider } from './context/UserContext';
import NavBar from './components/NavBar';

function App() {
  return (
    <UserProvider>
      <Router>
        <NavBar />
        <div className="App p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users/:id" element={<UserProfile />} />
            <Route path="/add-user" element={<AddUser />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
