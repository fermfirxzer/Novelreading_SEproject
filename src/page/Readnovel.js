


import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/authContextuser';
import axios from 'axios';
import NavbarReactBootstrap from '../component/Navbar.js';
import { Link, useParams } from 'react-router-dom';
import Swipercate from '../Swipercate.js';
import '../index.css';
import CommentNovel from '../component/CommentNovel';
import BookIcon from '@mui/icons-material/Book';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const Readnovel = () => {
    const { novelid } = useParams();
    const { currentUser } = useContext(AuthContext)
    const [writerid, setWriterid] = useState(currentUser ? currentUser.writer_id : null);
    const [novelData, setNovelData] = useState(null);
    const [category, setCategory] = useState([]);
    const [chapter, setchapter] = useState([]);
    const [recommend, setrecommend] = useState(null);
    const fetchbookmark = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/font/fetchbookmark/${writerid}/${novelid}`);
            console.log(response.data)
            setIsBooked(response.data);

        } catch (err) {
            console.log(err)

        }


    }
    const fetchlike = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/font/fetchlike/${writerid}/${novelid}`);
            console.log(response.data)
            setIslikeClicked(response.data);
        } catch (err) {
            console.log(err)

        }
    }
    useEffect(() => {
        const fetchnovel = async () => {
            const response = await axios.get(`http://localhost:5000/api/font/fetchnovel/${novelid}`)
            if (response.data.length > 1) {
                setNovelData(response.data[0])
                setCategory(response.data[1]);
            } else {
                setNovelData(response.data[0])
            }

        }
        const fetchchapter = async () => {
            const response = await axios.get(`http://localhost:5000/api/font/fetchAllchapter/${novelid}`)
            setchapter(response.data)
            console.log(response.data)
        }
        scrollToTop();
        fetchnovel();
        fetchchapter();
        if (writerid) {
            fetchbookmark();
            fetchlike();
        }
    }, [novelid])
    useEffect(() => {
        const fetchRecommendations = async () => {
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
            fetchRecommendations();
        }
    }, [novelData, category])

    const [islikeClicked, setIslikeClicked] = useState(false);
    const handlelikeClick = async () => {
        if (writerid) {
            try {
                if (!islikeClicked) {
                    setIslikeClicked(true);
                    await axios.post("http://localhost:5000/api/font/addlike/", { writerid: writerid, novelid: novelid });
                } else {
                    setIslikeClicked(false);
                    await axios.post("http://localhost:5000/api/font/removelike/", { writerid: writerid, novelid: novelid });
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            seterrlogin("Please login to Likes novel")
            setTimeout(() => {
                seterrlogin(null);
            }, 10000);
        }
    };

    const [isBooked, setIsBooked] = useState(false);
    const handleClickBooked = async () => {
        if (writerid) {
            try {
                if (!isBooked) {
                    setIsBooked(true);
                    await axios.post("http://localhost:5000/api/font/addbookmark/", { writerid: writerid, novelid: novelid });
                } else {
                    setIsBooked(false);
                    await axios.post("http://localhost:5000/api/font/removebookmark/", { writerid: writerid, novelid: novelid });
                }
            } catch (err) {
                console.log(err);
            }
            console.log(isBooked)
        } else {
            seterrlogin("Please login to Bookmarks novel")
            setTimeout(() => {
                seterrlogin(null);
            }, 10000);
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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
    const [currentPage, setCurrentPage] = useState(0);
    const chapterperpage = 10;
    const totalPages = chapter ? Math.floor(chapter.length / chapterperpage) : 0;
    console.log(totalPages)
    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };
    const [errlogin, seterrlogin] = useState(null);
    
    return (

        <div style={{ backgroundColor: '#f4f4f4', marginTop: '4rem' }} className='px-0 mx-0 bgcolor'>
            <NavbarReactBootstrap />

            <div>
                <div className="reading-novel-container d-lg-flex ">
                    <div className='col-lg-4 col-md-12 px-0 mx-0'>
                        <div className='reading-novel-img-con '>
                            {novelData && <img src={novelData.novel_img != null ? `/uploads/novel/${novelData.novel_img}` : "/uploads/novel/osu icon.jpg"} className='reading-novel-img' alt="Novel Cover" />}
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-12 px-0 mx-0'>
                        <div className='reading-novel-info py-5'>
                            <div className='reading-novel-name'>
                                {novelData && <p>{novelData.novel_name}</p>}
                            </div>
                            <div className='reading-novel-author'>
                                {novelData && <img src={novelData.writer_img ? `/uploads/profile/${novelData.writer_img}` : "/uploads/novel/osu icon.jpg"} className='author-profile' alt="Author Profile" />}
                                {novelData && <p>{novelData.writer_name}</p>}

                            </div>
                            <div className='reading-novel-describe'>
                                {novelData && <p>{novelData.novel_desc} </p>}
                            </div>
                            <div className='function-container'>
                                <button className='heart-btn' onClick={handlelikeClick}>
                                    <img src={islikeClicked ? 'https://cdn-icons-png.flaticon.com/128/4926/4926592.png' : 'https://1146890965.rsc.cdn77.org/web/newux/assets/images/rating/heart_darkgrey14.png'} alt="Heart Icon" className='search-icon' />
                                </button>
                                <button className='add-playlist' onClick={handleClickBooked}>
                                    <BookIcon style={{ color: isBooked ? '#00cbc3' : 'black' }}></BookIcon>
                                    <span style={{ margin: '0px 8px', color: isBooked ? '#00cbc3' : 'black' }} >
                                        {isBooked ? 'เพิ่มแล้ว' : 'เพิ่มเข้าขั้น'}
                                    </span>
                                </button>
                                <button className='readnow'>
                                    <a href={chapter.length>0?`/readchapter/${novelid}/1`:""} className='text-decoration-none text-dark'>
                                        <img src="https://cdn-icons-png.flaticon.com/128/159/159604.png" className='search-icon' alt="Read Icon" />

                                        <span style={{ margin: '0px 8px' }}>อ่านเลย</span>
                                    </a>

                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='container pb-3' >
                    <div className='container d-flex p-3' style={{ backgroundColor: "#fff" }}>
                        {category && category.map((category, index) => (
                            <div key={index} className='mx-2'>
                                <a href={`/search/${category.category_name}`}>
                                    <button className={index === 0 ? "maincatebtn rounded-pill p-1 px-2" : "catebtn rounded-pill p-1 px-2"}>{category.category_name}</button>

                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                {errlogin && <p className='text-danger text-center'>{errlogin}</p>}
                <div className='container-lg pb-5 mb-0' >
                    <div className='reading-novel-info mb-5'>
                        <div className='card border-0 p-3'>
                            <div className='card-body d-flex '>
                                <div className="mt-2 border-end " style={{ width: '50%' }}>
                                    <h2 >ข้อมูลนักเขียน </h2>
                                    <div className='d-flex justify-content-between '>

                                    </div>
                                    <div className='d-flex justify-content-between mt-2'>
                                        {novelData && <span><strong>ผู้เขียน : </strong><a className="link" href={`/novel/${novelData.penname}`}> {novelData.penname}</a></span>}

                                    </div>

                                </div>

                                <div className="mt-2 ms-3" style={{ width: '50%' }}>
                                    <h2>เผยแพร่ </h2>
                                    {novelData && <div>
                                        <strong>วันที่เผยแพร่ : </strong> {novelData.novel_date}
                                    </div>}


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='reading-novel-chapter pt-5'>
                        {chapter && <div className='header px-5 mx-3'>
                            ตอนทั้งหมด ({chapter.length})
                        </div>}
                        <div id="chapterContainer">
                            {chapter && chapter.slice(currentPage * 10).map(chapterItem => (
                                <div className='chapter px-5' key={chapterItem.chapter_id}>
                                    <Link to={`/readchapter/${novelid}/${chapterItem.chapter_id}`} className="no-underline">
                                        <g style={{ color: '#00cbc3', fontSize: '18px' }}>#{chapterItem.chapter_id}</g> {chapterItem.chapter_title}
                                    </Link>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '15px' }}>

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
                            {!chapter && <p className='ms-5'>Loading...</p>}
                        </div>

                        <div id="pagination" className="chapter-btn-container">
                            <button onClick={handlePrevPage} disabled={currentPage === 0} className='chapter-btn'><NavigateBeforeIcon></NavigateBeforeIcon></button>
                            <span>หน้าที่ {currentPage + 1}</span>
                            <button onClick={handleNextPage} disabled={currentPage >= totalPages} className='chapter-btn'><NavigateNextIcon></NavigateNextIcon></button>
                        </div>
                    </div>
                    <div className='related-novel-container'>
                        <div className='header'>
                            เรื่องที่คุณอาจสนใจ
                        </div>
                        {recommend && <div className='related-novel'>
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
