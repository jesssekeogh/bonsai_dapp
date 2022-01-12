import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "../assets/main.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;


function Home() {
  return (
    <div className="bonsai__home">
      <h1> This is the Home page</h1>
      <p>Bonsai World</p>
    </div>
  )
}
