import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// CSS
import "../assets/main.css";

// pages:
import Stories from './Stories';

// containers & components:
import { HomeList, NavBar } from './containers';
import { Auth } from './components';

// this is the launch page:

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
      <Auth />
    </div>
    </div>
  )
}
