import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages:
import Stories from './Stories';
import Auth from './Auth';

// this is the launch page:

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/world-of-bonsai" element={<Stories />} />
      </Routes>
    </Router>
  );
}

export default App;
