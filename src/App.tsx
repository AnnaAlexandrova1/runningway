import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DrowRaceResult from "./pages/DrowRaceResult/DrowRaceResult";
import Layout from "./components/Layout";

function App() {
  return (
      <Router>
          <Layout>
              <Routes>
                  <Route path="/" element={<DrowRaceResult />} />
              </Routes>
          </Layout>
      </Router>
  );
}

export default App;
