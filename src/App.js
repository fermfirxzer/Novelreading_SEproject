import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './index.css';
import Mainpage from './page/mainpage.js';
import Signup from './page/Signup.js';
import Readnovel from './page/Readnovel.js'
import Authorinfo from './page/authorinfo.js';
import Readchapter from './page/readchapter.js';
import Authorupload from './page/authorupload.js';
import Managewriting from './page/managewriting.js';
import Managechapter from './page/managechapter.js';
function App() {
    
  
  return (
      <Router>
          <Routes>
            <Route path="/" element={<Mainpage/>} />
            <Route path="/signin" element={<Signup/>} />
            <Route path="/readnovel" element={<Readnovel/>} />
            <Route path="/authorinfo" element={<Authorinfo/>} />
            <Route path="/readchapter" element={<Readchapter/>} />
            <Route path="/authorupload" element={<Authorupload/>} />
            <Route path="/managewriting" element={<Managewriting/>} />
            <Route path="/managechapter" element={<Managechapter/>} />
          </Routes>
      </Router>
    
  );
}

export default App;
