




import React, { useState, useEffect } from 'react';

import NavbarReactBootstrap from './Navbar.js';
import Swiperslide from './Swiperslide';
import Swipercate from './Swipercate.js';
import Signup from './Signup.js';
import './index.css';
const Mainpage = () => {
    const [showSignup, setShowSignup] = useState(false);
    const showSignin = document.getElementById("sign-in-btn");
    const closeSignin = document.getElementById("close-signin-btn");
    const [closeSignup, setCloseSignup] = useState(false);
    const handleShowSignIn = () => {
        console.log("signin");
        setShowSignup(true);
    }
    const handleCloseSignIn = () => setShowSignup(false);
  return (
    <div>
        <NavbarReactBootstrap onSignInClick={handleShowSignIn} />
        {showSignup && <Signup onSignInClick={handleCloseSignIn}/>}
        
        
        <Swiperslide></Swiperslide>
 
        <div className="container-lg">
            
            <div className='category-container'>
                <div className='category-name-con'>
                    <a>Love Novel</a>  
                </div>    
                    <div className ="clearfix">
                    <div className='category-swiper-container'>
                        <Swipercate></Swipercate>
                    </div>
                </div>       
            </div>
            <div className='category-container'>
                <div className='category-name-con'>
                    <a >แฟนตาซี/sci-fi/ไลท์โนเวล</a>  
                </div>    
                    <div className ="clearfix">
                    <div className='category-swiper-container'>
                        <Swipercate></Swipercate>
                    </div>
                </div>      
            </div>
            <div className='category-container'>
                <div className='category-name-con'>
                    <a>สืบสวน/ลึกลับ/สยองขวัญ</a>  
                </div>    
                    <div className ="clearfix">
                    <div className='category-swiper-container'>
                        <Swipercate></Swipercate>
                    </div>
                </div>       
            </div>
            <div className='category-container'>
                <div className='category-name-con'>
                    <a>Boy Love </a>  
                </div>    
                    <div className ="clearfix">
                    <div className='category-swiper-container'>
                        <Swipercate></Swipercate>
                    </div>
                </div>      
            </div>
            <div className='category-container'>
                <div className='category-name-con'>
                    <a>Girl Love </a>  
                </div>    
                    <div className ="clearfix">
                    <div className='category-swiper-container'>
                        <Swipercate></Swipercate>
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

export default Mainpage;
