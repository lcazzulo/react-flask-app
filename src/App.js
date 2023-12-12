import React /*, { useState, useEffect } */from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Temperature from "./components/Temperature";
import NoPage from "./components/NoPage";

function App() {
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="temperature" element={<Temperature />}></Route>
            
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
