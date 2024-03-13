

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarReactBootstrap from '../component/Navbar.js';
import { Link, useParams } from 'react-router-dom';
import Swipercate from '../Swipercate.js';
import '../index.css';
import CommentNovel from '../component/CommentNovel';
import BookIcon from '@mui/icons-material/Book';
const Readnovel = () => {
    const { novelid } = useParams();
    const [novelData, setNovelData] = useState(null);
    const [category, setCategory] = useState(null);
    const [chapter, setchapter] = useState(null);
    const [recommend,setrecommend]=useState(null);
    useEffect(() => {
        const fetchnovel = async () => {
            const response = await axios.get(`http://localhost:5000/api/font/fetchnovel/${novelid}`)
            console.log(response.data)
            setNovelData(response.data[0])
            setCategory(response.data[1]);
        }
        const fetchchapter = async () => {
            const response = await axios.get(`http://localhost:5000/api/font/fetchAllchapter/${novelid}`)
            setchapter(response.data)
            console.log(response.data)
        }
        fetchnovel();
        fetchchapter();
        
    }, [novelid])
    useEffect(()=>{
        const fetchRecommendations=async()=>{
            if (category && category.length > 0) {
                const category_tosend = category[0].category_name;
                try {
                    const response = await axios.get(`http://localhost:5000/api/font/fetchnovelbycategoryrandom/${category_tosend}`);
                    setrecommend(response.data);
                } catch (err) {
                    console.log(err);
                }
            }    
           
        }
        if (novelData) {
            console.log(category[0].category_name)
            fetchRecommendations();
        }
    },[novelData,category])
    
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    const [isBooked, setIsBooked] = useState(false);
    const handleClickBooked = () => {
        setIsBooked(!isBooked);
    };

    const [isFollowedPenname, setIsFollowedPenname] = useState(false);
    const [isFollowedWriter, setIsFollowedWriter] = useState(false);
    const handleClickFollowed = (target) => {
        if (target === 'penname') {
            setIsFollowedPenname(!isFollowedPenname);
        } else if (target === 'writer') {
            setIsFollowedWriter(!isFollowedWriter);
        }
    };
    const [currentPage, setCurrentPage] = useState(1);
    const chaptersPerPage = 10;

    const totalPages = chapter?Math.ceil(chapter.length / chaptersPerPage):0;

    const startIndex = (currentPage - 1) * chaptersPerPage;
    const endIndex = currentPage * chaptersPerPage;
    

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    return (

        <div style={{ backgroundColor: '#f4f4f4', marginTop: '4rem' }} className='px-0 mx-0'>
            <NavbarReactBootstrap />

            <div  >
                <div className="reading-novel-container d-lg-flex ">
                    <div className='col-lg-4 col-md-12 px-0 mx-0'>
                        <div className='  reading-novel-img-con '>
                            {novelData && <img src={novelData.novel_img!=null?`/uploads/novel/${novelData.novel_img}`:"/uploads/novel/osu icon.jpg"} className='reading-novel-img' alt="Novel Cover" />}
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-12 px-0 mx-0'>
                        <div className='reading-novel-info py-5'>
                            <div className='reading-novel-name'>
                                {novelData && <p>{novelData.novel_name}</p>}
                            </div>
                            <div className='reading-novel-author'>
                                <img src="https://1417094351.rsc.cdn77.org/publicassets/3624374/profile_picture/profile_picture.gif?2025751278" className='author-profile' alt="Author Profile" />
                                <p>ระรินรัก</p>
                                <button className='follow-btn' style={{ color: isFollowedPenname ? '#00cbc3' : '#fff', borderColor: isFollowedPenname ? '#00cbc3' : '#fff', width: isFollowedPenname ? '100px' : '' }} onClick={() => handleClickFollowed('penname')}>
                                    {isFollowedPenname ? 'ติดตามแล้ว' : 'ติดตาม'}
                                </button>
                            </div>
                            <div className='reading-novel-describe'>
                                {novelData && <p>{novelData.novel_desc} </p>}
                            </div>
                            <div className='function-container'>
                                <button className='heart-btn' onClick={handleClick}>
                                    <img src={isClicked ? 'https://cdn-icons-png.flaticon.com/128/4926/4926592.png' : 'https://1146890965.rsc.cdn77.org/web/newux/assets/images/rating/heart_darkgrey14.png'} alt="Heart Icon" className='search-icon' />
                                </button>
                                <button className='add-playlist'>
                                    <BookIcon style={{ color: isBooked ? '#00cbc3' : 'black' }}></BookIcon>
                                    <span style={{ margin: '0px 8px', color: isBooked ? '#00cbc3' : 'black' }} onClick={handleClickBooked}>
                                        {isBooked ? 'เพิ่มแล้ว' : 'เพิ่มเข้าขั้น'}
                                    </span>
                                </button>
                                <button className='readnow'>
                                    <img src="https://cdn-icons-png.flaticon.com/128/159/159604.png" className='search-icon' alt="Read Icon" />
                                    <a href='/readchapter' className='text-decoration-none text-dark'>
                                        <span style={{ margin: '0px 8px' }}>อ่านเลย</span>
                                    </a>

                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='container-lg pb-5 mb-0'>
                    <div className='reading-novel-info mb-5'>
                        <div className='card border-0 p-3'>
                            <div className='card-body d-flex '>
                                <div className="mt-2 border-end " style={{ width: '50%' }}>
                                    <h2 >ข้อมูลนักเขียน </h2>
                                    <div className='d-flex justify-content-between '>
                                        {novelData && <span><strong>นามปากกา :  </strong> {novelData.penname}</span>}
                                        <button className='follow-btn me-5' style={{ color: isFollowedPenname ? '#00cbc3' : '#000', borderColor: isFollowedPenname ? '#00cbc3' : '#000', width: isFollowedPenname ? '100px' : '' }}
                                            onClick={() => handleClickFollowed('penname')}>
                                            {isFollowedPenname ? 'ติดตามแล้ว' : 'ติดตาม'}
                                        </button>
                                    </div>
                                    <div className='d-flex justify-content-between mt-2'>
                                        {novelData && <span><strong>ผู้เขียน : </strong> {novelData.penname}</span>}
                                        <button className='follow-btn me-5' style={{ color: isFollowedWriter ? '#00cbc3' : '#000', borderColor: isFollowedWriter ? '#00cbc3' : '#000', width: isFollowedWriter ? '100px' : '' }}
                                            onClick={() => handleClickFollowed('writer')}>
                                            {isFollowedWriter ? 'ติดตามแล้ว' : 'ติดตาม'}
                                        </button>
                                    </div>

                                </div>

                                <div className="mt-2 ms-3" style={{ width: '50%' }}>
                                    <h2>เผยแพร่ </h2>
                                    {novelData && <div>
                                        <strong>วันที่เผยแพร่ : </strong> {novelData.novel_date}
                                    </div>}
                                    {/* <div className='mt-2'>
                                        <strong>วันที่แก้ไขล่าสุด : </strong> {novel.publishedDate}
                                    </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='reading-novel-chapter pt-5'>
                        {chapter && <div className='header px-5 mx-3'>
                            ตอนทั้งหมด ({chapter.length})
                        </div>}
                        <div id="chapterContainer">
                            {chapter && chapter.map(chapterItem => (
                                <div className='chapter px-5' key={chapterItem.chapter_id}>
                                    <Link to={`/readchapter/${novelid}/${chapterItem.chapter_id}`} className="no-underline">
                                        <g style={{ color: '#00cbc3', fontSize: '18px' }}>#{chapterItem.chapter_id}</g> {chapterItem.chapter_title}
                                    </Link>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '15px' }}>
                                            <span style={{ marginRight: '5px' }}>
                                                <CommentTwoToneIcon />
                                            </span>
                                            <span>{chapterItem.chapter_comment}</span>
                                        </div>
                                        <div>
                                            <span style={{ marginRight: '5px' }}>
                                                <VisibilityOutlinedIcon />
                                            </span>
                                            <span>{chapterItem.chapter_views}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {!chapter && <p>Loading...</p>}
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
                        {recommend&&<div className='related-novel'>
                            <Swipercate novelsData={recommend}></Swipercate>
                        </div>}
                    </div>
                    <CommentNovel novelid={novelid} chapterid={0}></CommentNovel>
                </div>
            </div>
        </div>

    );
};

export default Readnovel;
