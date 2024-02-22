import React, { useState,useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {  FaBell } from 'react-icons/fa'; 
import ModeIcon from '@mui/icons-material/Mode';
import { Link } from 'react-router-dom';
import "./style.scss" ;
import { AuthContext } from '../context/authContextuser.jsx';
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
   

    
    <Navbar className="custom-navbar" bg="white" variant="dark" expand="lg" style={{ margin: '10px', borderBottom: '1px solid black', padding: '10px' }}>
    <Navbar.Brand href="/" style={{ color: 'black', marginLeft: '30px' }}>NovelReading</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <button className="navbar-toggler text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#basic-navbar-nav" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      Menu
    </button>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="">
        <Nav.Link href="/novel" style={{ color: 'black' }}>นิยาย</Nav.Link>
        <Nav.Link href="/cartoon" style={{ color: 'black' }}>การ์ตูน</Nav.Link>
    
      </Nav>
    
      
        {!currentUser ? (
          <Nav className=''>
          <Nav.Link id="sign-in-btn" style={{ color: 'black', width: "auto" }} onClick={onSignInClick} className="signinbtn">
            เข้าสู่ระบบ / สมัครสมาชิก
          </Nav.Link>
          </Nav>
        ):null }
        <input id="searchinput" type="text" placeholder="Search" className="search-input" /> 
        {1?( <>
        
          <Nav className='user-info-box'>
          <ul className='nav navbar-nav user-info'>
            <li className='hidden-xs user-item'>dad</li>
            <li className='hidden-xs user-item'>da</li>
            <li className='hidden-xs user-item'>da</li>
            <li className='hidden-xs user-item'><Link to="/writer/login">writer</Link></li>
          </ul>
          </Nav>
        </>):null}
    

    
  </Navbar.Collapse>
      
    </Navbar>
  );
};

export default NavbarReactBootstrap;
