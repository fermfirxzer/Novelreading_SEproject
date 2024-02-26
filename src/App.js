
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './index.css';
import Mainpage from './page/mainpage.js';
import Signup from './page/Signup.js';
import Readnovel from './page/Readnovel.js'
import Authorinfo from './page/authorinfo.js';
import Readchapter from './page/readchapter.js';
import Writer_upload from './page/writer/writerupload.js';
import Managewriting from './page/writer/managewriting.js';
import Managechapter from './page/managechapter.js';
import Writer_login from './page/writer/writerlogin.js';
import Writer_register from './page/writer/writer_register.js';
import Profile from './page/profile.js';
import Writingnovel from './page/writer/writingnovel.js';
import Writingepisode from './page/writer/writingepisode.js';
function App() {
    
  
  return (
      <Router>
          <Routes>
            <Route path="/" element={<Mainpage/>} />
            <Route path="/signin" element={<Signup/>} />
            <Route path="/readnovel" element={<Readnovel/>} />
            <Route path="/authorinfo" element={<Authorinfo/>} />
            <Route path="/readchapter" element={<Readchapter/>} />
            <Route path="/writer/upload" element={<Writer_upload/>} />
            <Route path="/writer/managewriting" element={<Managewriting/>} />
            <Route path="/writer/managechapter" element={<Managechapter/>} />
            <Route path="/writer/login" element={<Writer_login/>} />
            <Route path="/writer/register" element={<Writer_register/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/writer/writingnovel" element={<Writingnovel/>} />
            <Route path="/writer/writingepisode" element={<Writingepisode/>} />
          </Routes>
      </Router>
    
  );
}

export default App;
