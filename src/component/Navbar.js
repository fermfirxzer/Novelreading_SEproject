import React, { useState,useContext } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import {  FaBell } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import ModeIcon from '@mui/icons-material/Mode';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../context/authContextuser';
import '../component/navbar.scss';

const NavbarReactBootstrap = ({ onSignInClick, isLoggedIn }) => {
  const {currentUser,logout}=useContext(AuthContext)
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  const navigate = useNavigate()
  const onClicklogout=()=>{
    logout();
    navigate("/")
  }
  const handleIconClick = (event) => {
    event.stopPropagation();
    // Handle the click event for profile, writing, notification icons
  };
  
  return (
    <>
      <Navbar className= "fixed-top " bg="light" variant="dark" expand="lg" style={{  borderBottom: '1px solid black', padding: '15px', width:'100%'}}>
        <Navbar.Brand href="/" style={{ color: 'black', marginLeft: '30px' }}>NovelReading</Navbar.Brand>
        <Navbar.Toggle  className= "flex align-items-center " aria-controls="basic-navbar-nav" >
                {currentUser && ( 
                  <div className = "flex align-item-center" >
                    <Nav.Link href="/notifications" onClick={handleIconClick}  style={{ margin:'5px',color: 'black', background: '#dddddd', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <FaBell />
                    </Nav.Link>
                    <Nav.Link href="/writer/managewriting" onClick={handleIconClick}  style={{margin:'5px', color: 'black', background: '#dddddd', borderRadius: '50%',  width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <ModeIcon/>
                    </Nav.Link>
                    <Dropdown  align="end" className='mt-2 mx-2' onClick={handleIconClick}>
                      <Dropdown.Toggle   variant="primary" id="dropdown-basic" style={{ color: 'black', marginRight: '10px', background: '#dddddd', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                          <img src = "https://1146890965.rsc.cdn77.org/web/newux/assets/images/profile-X.png?t_144" className="search-btn mt-2" style={{  width: '35px', height: '35px' }}/>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="dropdown-menu" >
                        <Dropdown.Item href="/profile" >
                            <img src = "https://1146890965.rsc.cdn77.org/web/newux/assets/images/profile-X.png?t_144" className="search-btn"/>
                            <span className='mx-3'>display name</span>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="/writer/managewriting">My Writing</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">My Reading</Dropdown.Item>
                        <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-4">Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )} 
             
               <MenuIcon className='mt-2 mx-2' style={{ color: 'black' }} />  
        </Navbar.Toggle>
        
    
        
        <Navbar.Collapse id="basic-navbar-nav" style = {{justifyContent:'space-between'}}>
          <Nav className="mr-auto flex navleft" >
            <Nav.Link href="/novel" className = "bordercustom" >นิยาย</Nav.Link>
            <Nav.Link href="/cartoon" className = "bordercustom">การ์ตูน</Nav.Link>
           
          </Nav>
          
          <Nav className="ml-auto navright">
              <div className="search-container">
                  {showSearch && (
                    <input id="searchinput" type="text" placeholder="Search" className="search-input" />
                  )}
                  <button className="search-btn " onClick={toggleSearch} style={{ cursor: 'pointer' }}>
                    <img className="search-icon" src="https://1146890965.rsc.cdn77.org/web/newux/dist/assets/images/ic-search@2x.png?t_143" alt="Button Image" />
                  </button>
              </div>      
              {!currentUser && (
              <Nav.Link href="/writer/login" className="bordercustom">เข้าสู่ระบบ / สมัครสมาชิก</Nav.Link>
              )}
              {currentUser && ( 
                <div className = "d-none d-lg-flex" style={{right: '50px' }}>
                  <Nav.Link href="/notifications" style={{ color: 'black', marginRight: '10px', background: '#dddddd', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FaBell />
                  </Nav.Link>
                  <Nav.Link href="/writer/managewriting" style={{ color: 'black', marginRight: '10px', background: '#dddddd', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ModeIcon className="search-btn"/>
                  </Nav.Link>
                  
                  <Dropdown  align="end" className='mt-2 mx-3' >
                      <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ color: 'black', marginRight: '10px', background: '#dddddd', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                          <img src = "https://1146890965.rsc.cdn77.org/web/newux/assets/images/profile-X.png?t_144" className="search-btn"/>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="dropdown-menu">
                        <Dropdown.Item href="/profile" className='w-auto'>
                            <img src = "https://1146890965.rsc.cdn77.org/web/newux/assets/images/profile-X.png?t_144" className="search-btn"/>
                            <span className='mx-3'>display name</span>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="/writer/managewriting">My Writing</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">My Reading</Dropdown.Item>
                        <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-4" onClick={onClicklogout}>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
                </div>
              )} 
          </Nav>
         
              
           
        
        </Navbar.Collapse>
      </Navbar>
      
    </>
  );
};

export default NavbarReactBootstrap;