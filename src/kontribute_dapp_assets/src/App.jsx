import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "../assets/main.css";
import Stories from './Stories';
import { HomeList, NavBar } from './containers';

// this is the launch page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/world-of-bonsai" element={<Stories />} />
      </Routes>
    </Router>
  );
}

export default App;

function Home() {
  return (
    <div>
    <NavBar />
    <div className="bonsai__home">
      <HomeList />
    </div>
    </div>
  )
}
