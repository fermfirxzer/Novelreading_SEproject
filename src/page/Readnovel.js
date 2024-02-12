

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import React, { useState, useEffect } from 'react';

import NavbarReactBootstrap from '../component/Navbar.js';
import { Link } from 'react-router-dom';
import Signup from './Signup.js';
import Swipercate from '../Swipercate.js';
import '../index.css';

const Readnovel= () => {
    const [showSignup, setShowSignup] = useState(false);
    const showSignin = document.getElementById("sign-in-btn");
    const closeSignin = document.getElementById("close-signin-btn");
    const [closeSignup, setCloseSignup] = useState(false);
    const handleShowSignIn = () => {
        console.log("signin");
        setShowSignup(true);
    }
    const handleCloseSignIn = () => setShowSignup(false);



    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
      setIsClicked(!isClicked);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const chaptersPerPage = 10;
    const chapters = Array.from({ length:33 }, (_, index) => index + 1); // Example array of chapters

    const totalPages = Math.ceil(chapters.length / chaptersPerPage);

    const startIndex = (currentPage - 1) * chaptersPerPage;
    const endIndex = currentPage * chaptersPerPage;
    const currentChapters = chapters.slice(startIndex, endIndex);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };
  return (
    
    <div style={{backgroundColor : '#f4f4f4'}}>
        <NavbarReactBootstrap onSignInClick={handleShowSignIn} />
        {showSignup && <Signup onSignInClick={handleCloseSignIn}/>}
        <div >
            <div className='reading-novel-container'>
                <div className='reading-novel-img-con'>
                    <img src="https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2" className='reading-novel-img'/>
                </div>
                <div className='reading-novel-info'>
                    <div className='reading-novel-name'>
                        <p >รักที่ไม่คู่ควร (มี ebook)</p>
                    </div>
                    <div className='reading-novel-author'>
                        <img src="https://1417094351.rsc.cdn77.org/publicassets/3624374/profile_picture/profile_picture.gif?2025751278" className='author-profile'></img>
                        <p>ระรินรัก</p>
                        <button className='follow-btn'>
                            ติดตาม
                        </button>
                    </div>
                    <div className='reading-novel-describe'>
                        <p>sdadjohwenjknsvkanbnldfsjfkjsdfljflsdjflsjflsdjlfsdjflssdadjohwenjknsvkanbnldadjohwenjknsvkanbnldfsjfkjsdfljflsdjflsjflsdjlfsdjflssdadjohwenjknsvkanbndadjohwenjknsvkanbnldfsjfkjsdfljflsdjflsjflsdjlfsdjflssdadjohwenjknsvkanbndfsjfkjsdfljflsdjflsjflsdjlfsdjflsdjsdadjohwenjknsvkanbnldfsjfkjsdfljflsdjflsjflsdjlfsdjfl </p>
                    </div>
                    <div className='function-container'>
                        <button className='heart-btn' onClick={handleClick}>
                        <img src={isClicked ? 'https://cdn-icons-png.flaticon.com/128/4926/4926592.png' : 'https://1146890965.rsc.cdn77.org/web/newux/assets/images/rating/heart_darkgrey14.png'}alt="Icon"className='search-icon'/>
                        </button>
                        <button className='add-playlist'>
                            <img src ="https://cdn-icons-png.flaticon.com/128/7794/7794603.png" className='search-icon'></img>
                            <span style={{margin:'0px 8px'}}>เพิ่มเข้าขั้น</span>
                        </button>
                        <button className='readnow'>
                            <img src ="https://cdn-icons-png.flaticon.com/128/159/159604.png" className='search-icon'></img>
                            <span style={{margin:'0px 8px'}}>อ่านเลย</span>
                        </button>

                    </div>
                </div>
            </div>


            <div className='container-lg'>
                <div className='reading-novel-infodsadsa'>
                    <div>
                        <span>ข้อมูลนักเขียน</span>
                        <div></div>
                        <div></div>
                    </div>
                    <div>
                        <span>เผยแพร่</span>
                        <div></div>
                        <div></div>
                        
                    </div>
                </div>
                <div className='reading-novel-chapter'>
                    <div className='header'>
                        ตอนทั้งหมด ({chapters.length}) 
                    </div>
                    <div id ="chapterContainer">
                        {currentChapters.map(chapter => (
                                <div className='chapter' >
                            
                                <Link to="/readchapter" className="no-underline"><g style={{color:'#00cbc3', fontSize:'18px'}}>#1 </g> กหฟกหฟกหฟกหฟ </Link>
                                <div style={{display:'flex'}}>
                                    <div style={{marginRight:'15px'}}>
                                        <span style={{marginRight:'5px'}}>
                                            <CommentTwoToneIcon></CommentTwoToneIcon>
                                        </span>
                                        <span>23</span>
                                    </div>
                                    <div >
                                        <span style={{marginRight:'5px'}}>
                                            <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
                                        </span>
                                        <span>1.23k</span>
                                    </div>
                                    
                                </div>
                                
                            </div>
                    ))}
                    </div>
                    <div id="pagination" className="chapter-btn-container">
                        <button onClick={handlePrevPage} disabled={currentPage === 1} className='chapter-btn'><NavigateBeforeIcon></NavigateBeforeIcon></button>
                        <span>หน้าที่ {currentPage}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className='chapter-btn'><NavigateNextIcon></NavigateNextIcon></button>
                    </div>
                </div>
                <div className='related-novel-container'>
                    <div className='header'>
                        เรื่องที่คุณอาจสนใจ
                    </div>
                    <div className='related-novel'>
                        <Swipercate></Swipercate>
                    </div>
                </div>
                <div className='reading-novel-comment'>
                    <div className='header'>
                        ความคิดเห็นทั้งหมด (433)
                    </div>
                    <div className='comment' >
                        บทที่ 1 กหฟกหฟกหฟกหฟ
                    </div>
                    <div className='comment' >
                        บทที่ 2 กหฟกหฟกหฟกหฟ
                    </div>
                </div>
            </div>
        </div>
        
       
      
        
       


    <footer>
        &copy; 2024 NovelReading. All rights reserved.
    </footer>
    </div>
    
  );
};

export default Readnovel;
