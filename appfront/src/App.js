import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';

import { Home } from "./components/appfront/Principal";
import { Yoo } from "./components/appfront/me";
import { NotFound } from "./components/appfront/NotFound";


function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/me" element={<Yoo/>} />
          <Route path="*" element = {<NotFound/>} />
        </Routes>
    </Router>
  );
}

export default App;
