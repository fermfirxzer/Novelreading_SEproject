

import React , { useState, useEffect }from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../index.css';
const NavbarReactBootstrap = ({ onSignInClick }) => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  return (
    
    <Navbar bg="white" variant="dark" expand="lg" style={{ margin: '10px', borderBottom: '1px solid black', padding: '10px' }}>
    <Navbar.Brand href="/" style={{ color: 'black', marginLeft: '30px' }}>NovelReading</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        
        <Nav.Link href="/novel" style={{ color: 'black' }}>นิยาย</Nav.Link>
        <Nav.Link href="/cartoon" style={{ color: 'black' }}>การ์ตูน</Nav.Link>
      </Nav>
      <Nav className="ml-auto"  >
        
        <button id="sign-in-btn" onClick={onSignInClick} className="signinbtn">
          เข้าสู่ระบบ / สมัครสมาชิก
        </button>
       
         <div className="search-container">
            <button className="search-btn"onClick={toggleSearch} style={{ cursor: 'pointer' }} >
            <img className="search-icon" src="https://1146890965.rsc.cdn77.org/web/newux/dist/assets/images/ic-search@2x.png?t_143" alt="Button Image" />
            </button>
            {showSearch && (
              <input id = "searchinput" type="text" placeholder="Search" className="search-input" />
            )}
          </div>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  
  );
};

export default NavbarReactBootstrap;

