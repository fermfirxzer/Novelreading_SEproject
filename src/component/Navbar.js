import React, { useState, useContext, useEffect } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModeIcon from '@mui/icons-material/Mode';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../context/authContextuser';
import '../component/navbar.scss';
import axios from 'axios';

const NavbarReactBootstrap = ({ onSignInClick, isLoggedIn }) => {
  const { currentUser, logout } = useContext(AuthContext)
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  const navigate = useNavigate()
  const onClicklogout = () => {
    logout();
    navigate("/")
  }
  const writerid = currentUser?.writer_id || null;
  const [writerinfo, setwriterinfo] = useState(null);
  useEffect(() => {

    const fetchwriter = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/font/fetchwriter/${writerid}`)
          setwriterinfo(res.data);
        } catch (err) {
          console.log(err)
        }
      
    }
    if(writerid){
      fetchwriter();
    }
  }, [writerid])
  const handleIconClick = (event) => {
    event.stopPropagation();
    // Handle the click event for profile, writing, notification icons
  };
  return (
    <>
      <Navbar className="fixed-top " expand="lg" style={{ backgroundColor: "#030916", borderBottom: '1px solid black', padding: '15px', width: '100%' }}>
        <Navbar.Brand href="/" style={{ marginLeft: '30px', color: "#fff" }}>NovelReading</Navbar.Brand>
        <Navbar.Toggle className="flex align-items-center " aria-controls="basic-navbar-nav" >

          <MenuIcon className='mt-2 mx-2' style={{ color: '#fff' }} />
        </Navbar.Toggle>



        <Navbar.Collapse id="basic-navbar-nav" style={{ justifyContent: 'space-between' }}>
          <Nav className="mr-auto flex navleft" >
            <Nav.Link href="/novel" className="bordercustom" >นิยาย</Nav.Link>
          </Nav>

          <Nav className="ml-auto navright">
            <div className="search-container">
              <a href="/search">
                <button className="search-btn " onClick={toggleSearch} style={{ cursor: 'pointer' }}>
                  <img className="search-icon" src="https://1146890965.rsc.cdn77.org/web/newux/dist/assets/images/ic-search@2x.png?t_143" alt="Button Image" />
                </button>
              </a>

            </div>
            {!currentUser && (
              <Nav.Link href="/writer/login" className="bordercustom">เข้าสู่ระบบ / สมัครสมาชิก</Nav.Link>
            )}
            {currentUser && (
              <div className="d-none d-lg-flex" style={{ right: '50px' }}>

                <Nav.Link href="/writer/managewriting" style={{ color: 'black', marginRight: '10px', background: '#dddddd', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <ModeIcon className="search-btn" />
                </Nav.Link>

                <Dropdown align="end" className='mt-2 mx-3' >
                  <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ color: 'black', marginRight: '10px', background: '#dddddd', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/profile-X.png?t_144" className="search-btn" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-menu">
                    <Dropdown.Item href="/profile" className='w-auto'>
                      {writerinfo&&<img src={writerinfo.image?`/uploads/profile/${writerinfo.writer_img}` : `/uploads/novel/osu icon.jpg`} className="search-btn" />}
                      <span className='mx-3'>{currentUser.writer_name}</span>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/writer/managewriting">My Writing</Dropdown.Item>
                    <Dropdown.Item href="/myreading">My Reading</Dropdown.Item>
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