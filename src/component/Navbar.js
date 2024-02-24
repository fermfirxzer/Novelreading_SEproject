import React, { useState,useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {  FaBell } from 'react-icons/fa'; 
import ModeIcon from '@mui/icons-material/Mode';
import MenuIcon from '@mui/icons-material/Menu';
const NavbarReactBootstrap = ({ onSignInClick, isLoggedIn }) => {
  const [showSearch, setShowSearch] = useState(false);
  const { currentUser,logout } = useContext(AuthContext);
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  const handlelogout=async e=>{
  
    try {
        await logout();
        
    } catch (err) {
        
    }
  }
  return (
    <>
      <Navbar bg="white" variant="dark" expand="lg" style={{ margin: '10px', borderBottom: '1px solid black', padding: '10px' }}>
        <Navbar.Brand href="/" style={{ color: 'black', marginLeft: '30px' }}>NovelReading</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" >
          <MenuIcon style={{ color: 'black' }} />
        </Navbar.Toggle>
       
        <Navbar.Collapse id="basic-navbar-nav" style = {{justifyContent:'space-between'}}>
          <Nav className="mr-auto" >
            <Nav.Link href="/novel" style={{ color: 'black' }}>นิยาย</Nav.Link>
            <Nav.Link href="/cartoon" style={{ color: 'black' }}>การ์ตูน</Nav.Link>
           
          </Nav>
          
          <Nav className="ml-auto">
            <div className="search-container">
              
              {showSearch && (
                <input id="searchinput" type="text" placeholder="Search" className="search-input" />
              )}
              <button className="search-btn" onClick={toggleSearch} style={{ cursor: 'pointer' }}>
                <img className="search-icon" src="https://1146890965.rsc.cdn77.org/web/newux/dist/assets/images/ic-search@2x.png?t_143" alt="Button Image" />
              </button>
            </div>
              {!isLoggedIn && (
                <button id="sign-in-btn" onClick={onSignInClick} className="signinbtn">
                  เข้าสู่ระบบ / สมัครสมาชิก
                </button>
              )}
            
              {isLoggedIn && (
                <div style={{ display:'flex',position: 'absolute', top: '10px', right: '50px' }}>
                  <Nav.Link href="/notifications" style={{ color: 'black', marginRight: '10px', background: '#dddddd', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FaBell />
                  </Nav.Link>
                  <Nav.Link href="/managewriting" style={{ color: 'black', marginRight: '10px', background: '#dddddd', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ModeIcon className="search-btn"/>
                  </Nav.Link>
                  <Nav.Link href="/profile" style={{ color: 'black', marginRight: '10px', background: '#dddddd', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src = "https://1146890965.rsc.cdn77.org/web/newux/assets/images/profile-X.png?t_144" className="search-btn"/>
                  </Nav.Link>
                </div>
              )}
          </Nav>
        </>):null}
    

    
  </Navbar.Collapse>
      
    </Navbar>
  );
};

export default NavbarReactBootstrap;
