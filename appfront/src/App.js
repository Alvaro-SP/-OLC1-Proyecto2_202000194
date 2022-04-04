import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import logo from './logo.svg';


import { Home } from "./components/appfront/Principal";
import { Symbols } from "./components/appfront/SymbolsTable";
import { ErrorT } from "./components/appfront/Errors";
import { Arbol } from "./components/appfront/ArbolDeriva";

import { Yoo } from "./components/appfront/me";
import { NotFound } from "./components/appfront/NotFound";

function App() {
  
  return (
    
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/me" element={<Yoo/>} />
          <Route exact path="/symbols" element={<Symbols/>} />
          <Route exact path="/Errores" element={<ErrorT/>} />
          <Route exact path="/Arbol" element={<Arbol/>} />
          <Route path="*" element = {<NotFound/>} />
        </Routes>
    </Router>

  );
}

export default App;
