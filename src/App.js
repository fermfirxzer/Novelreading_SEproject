import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Mainpage from './mainpage';
import NavbarReactBootstrap from './Navbar.js'
import Signup from './Signup.js';
import Readnovel from './Readnovel.js'
import Authorinfo from './Authorinfo.js'
function App() {
    
  
  return (
      
      <Router>
        
          <Routes>
            <Route path="/" element={<Mainpage/>} />
            <Route path="/signin" element={<Signup/>} />
            <Route path="/readnovel" element={<Readnovel/>} />
            <Route path="/authorinfo" element={<Authorinfo/>} />

          </Routes>
      </Router>
    
  );
}

export default App;
