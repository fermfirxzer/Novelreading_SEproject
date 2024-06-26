
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './index.css';
import Mainpage from './page/mainpage.js';
import Signup from './page/Signup.js';
import Readnovel from './page/Readnovel.js'
import Authorinfo from './page/authorinfo.js';
import Readchapter from './page/readchapter.js';
import Uploadnovel from './page/writer/uploadnovel.js';
import Managewriting from './page/writer/managewriting.js';
import Managechapter from './page/managechapter.js';
import Login from './page/writer/login.js';
import Register  from './page/writer/register.js';
import Profile from './page/profile.js';
import Viewnovel from './page/writer/viewnovel.js';
import Uploadchapter from './page/writer/uploadchapter.js';
import Myreading from './page/myreading.js';
import Novel from './page/novel.js';
import Search from './page/search.js';
function App() {
    
  
  return (
      <Router>
          <Routes>
            <Route path="/" element={<Mainpage/>} />
            <Route path="/signin" element={<Signup/>} />
            <Route path="/readnovel/:novelid" element={<Readnovel/>} />
            <Route path="/readchapter/:novelid/:chapterid" element={<Readchapter/>} />
            <Route path="/writer/upload" element={<Uploadnovel/>} />
            <Route path="/writer/managewriting" element={<Managewriting/>} />
            <Route path="/writer/managechapter" element={<Managechapter/>} />
            <Route path="/writer/login" element={<Login/>} />
            <Route path="/writer/register" element={<Register/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/writer/viewnovel" element={<Viewnovel/>} />
            <Route path="/writer/uploadchapter" element={<Uploadchapter />} />
            <Route path="/myreading" element={<Myreading/>}/>
            <Route path="/novel" element={<Novel/>}/>
            <Route path="/novel/:penname" element={<Novel/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/search/:category" element={<Search/>}/>
          </Routes>
      </Router>
    
  );
}

export default App;

