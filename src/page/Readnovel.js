

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import React, { useState } from 'react';

import NavbarReactBootstrap from '../component/Navbar.js';
import { Link } from 'react-router-dom';

import Swipercate from '../Swipercate.js';
import '../index.css';


const Readnovel= () => {
    // const [showSignup, setShowSignup] = useState(false);
    
    // const handleShowSignIn = () => {
    //     console.log("signin");
    //     setShowSignup(true);
    // }
    // const handleCloseSignIn = () => setShowSignup(false);

    const novel = {
       
        penname: 'John Doe',
        category: 'Fantasy',
        publishedDate: '2023-02-15',
      };

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

  
    const sampleComments = [
        { displayname: 'Alice', 
          profileImage: 'https://1417094351.rsc.cdn77.org/publicassets/2156800/profile_picture/profile_picture.gif?1941564742',
          body: 'Great website! ',
        },
        { displayname: 'Bob', 
          profileImage: 'https://1417094351.rsc.cdn77.org/publicassets/2156800/profile_picture/profile_picture.gif?1941564742',
          body: 'Nice work!' 
        },
        { displayname: 'Charlie',
          profileImage: 'https://1417094351.rsc.cdn77.org/publicassets/2156800/profile_picture/profile_picture.gif?1941564742',
          body: 'I love this!' 
        },
      ];

      const commentPerPage = 10;
      const totalPagesComments = Math.ceil(sampleComments.length / commentPerPage);
  
  
      const [currentPageComment, setCurrentPageComment] = useState(1);
      const handleNextPageComment = () => {
          setCurrentPageComment(prevPage => prevPage + 1);
      };
  
      const handlePrevPageComment = () => {
          setCurrentPageComment(prevPage => prevPage - 1);
      };
      const startIndexComment = (currentPageComment - 1) * commentPerPage;
      const endIndexComment = currentPageComment * commentPerPage;
  
      const currentComment = sampleComments.slice(startIndexComment, endIndexComment);
  return (
    
    <div style={{backgroundColor : '#f4f4f4' , marginTop: '4rem' }} className='px-0 mx-0'>
        <NavbarReactBootstrap />
       
        <div >
            <div className="reading-novel-container d-lg-flex">
                    
                    <div className='col-lg-4 col-md-12 px-0 mx-0'>
                        <div className='  reading-novel-img-con '>
                            <img src="https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2" className='reading-novel-img' alt="Novel Cover" />
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-12 px-0 mx-0'>
                        <div className='reading-novel-info py-5'>
                            <div className='reading-novel-name'>
                            <p>รักที่ไม่คู่ควร (มี ebook)</p>
                            </div>
                            <div className='reading-novel-author'>
                            <img src="https://1417094351.rsc.cdn77.org/publicassets/3624374/profile_picture/profile_picture.gif?2025751278" className='author-profile' alt="Author Profile" />
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
                                <img src={isClicked ? 'https://cdn-icons-png.flaticon.com/128/4926/4926592.png' : 'https://1146890965.rsc.cdn77.org/web/newux/assets/images/rating/heart_darkgrey14.png'} alt="Heart Icon" className='search-icon' />
                            </button>
                            <button className='add-playlist'>
                                <img src="https://cdn-icons-png.flaticon.com/128/7794/7794603.png" className='search-icon' alt="Playlist Icon" />
                                <span style={{ margin: '0px 8px' }}>เพิ่มเข้าขั้น</span>
                            </button>
                            <button className='readnow'>
                                <img src="https://cdn-icons-png.flaticon.com/128/159/159604.png" className='search-icon' alt="Read Icon" />
                                <span style={{ margin: '0px 8px' }}>อ่านเลย</span>
                            </button>
                            </div>
                        </div>
                    </div>
                
            </div>

            <div className='container-lg pb-5 mb-0'>
                <div className='reading-novel-info mb-5'>
                    <div className='card border-0'>
                        <div className='card-body'>
                            <div className="mt-2">
                                <strong>ข้อมูลนักเขียน : </strong> {novel.penname}
                            </div>
                            
                            <div className="mt-2">
                                <strong>วันที่เผยแพร่ : </strong> {novel.publishedDate}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='reading-novel-chapter '>
                    <div className='header px-5 mx-3'>
                        ตอนทั้งหมด ({chapters.length}) 
                    </div>
                    <div id ="chapterContainer " >
                        {currentChapters.map(index => (
                                <div className='chapter  px-5' >
                            
                                <Link to="/readchapter" className="no-underline"><g style={{color:'#00cbc3', fontSize:'18px'}}>#{index}</g> กหฟกหฟกหฟกหฟ </Link>
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
                <div className='reading-novel-comment pb-5 px-4'>
                    <div className="container mt-5">
                        <div className='header pt-5'>ความคิดเห็นทั้งหมด ({sampleComments.length})</div>
                        {currentComment.map((comment, index) => (
                            <div className='card mb-3 ' key={index}>
                                <div className="card-body d-flex">
                                    <img
                                        src={comment.profileImage}
                                        className="rounded-circle mr-3"
                                        alt="Profile"
                                        style={{ width: '50px', height: '50px' ,marginRight:'1.5rem'}}
                                    />
                                    <div className='ml-5'>
                                        <h5 className="card-title">{comment.displayname}</h5>
                                        <p className="card-text">{comment.body}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div id="pagination" className="chapter-btn-container">
                            <button onClick={handlePrevPageComment} disabled={currentPageComment === 1} className='chapter-btn'><NavigateBeforeIcon></NavigateBeforeIcon></button>
                            <span>หน้าที่ {currentPage}</span>
                            <button onClick={handleNextPageComment} disabled={currentPageComment === totalPagesComments} className='chapter-btn'><NavigateNextIcon></NavigateNextIcon></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
       
      
        
       


    
    </div>
    
  );
};

export default Readnovel;
