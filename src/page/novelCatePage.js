




import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

import NavbarReactBootstrap from '../component/Navbar.js';

import Swipercate from '../Swipercate.js';

import '../index.css';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import axios from 'axios';


const NovelCatePage = () => {

    const [expandedRows, setExpandedRows] = useState(18);

    const handleExpand = () => {
        setExpandedRows(expandedRows + 15);
    };

    const mainCategories = [
    'Romantic',
    'Funny',
    'Drama',
    'Boy love',
    'Girl love',
    'Period',
    'Feel good',
    'Short story',
    'Action',
    'Mysterious',
    'Love novel',
    'Fantasy',
    'Sci-fi',
    'Investigate',
    'Horror',

  ];


    const getRandomColor = () => {
        const colors = [
            "#FF0000", "#FF5733", "#FFC300", "#FFED97", "#80FFDB",
            "#1B6CA8", "#003D5B", "#5C4B51", "#7D1935", "#F76C6C",
            "#F4A460", "#FFD700", "#B2FF59", "#0C7C59", "#036D19",
            "#4A235A", "#9B59B6", "#663399", "#AED6F1", "#3498DB",
            "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#FF1744",
            "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
            "#3F51B5", "#2196F3", "#00BCD4", "#009688", "#4CAF50",
            "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
            "#FF0000", "#FF5733", "#FFC300", "#FFED97", "#80FFDB",
            "#1B6CA8", "#003D5B", "#5C4B51", "#7D1935", "#F76C6C",
            "#F4A460", "#FFD700", "#B2FF59", "#0C7C59", "#036D19",
            "#4A235A", "#9B59B6", "#663399", "#AED6F1", "#3498DB",
            "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#FF1744",
            "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
            "#3F51B5", "#2196F3", "#00BCD4", "#009688", "#4CAF50",
            "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
            "#4b61ea", "#ff574a", "#00cbc3", "#ff9c2c", "#7962fa",
            "#ed306b", "#ff9fc7", "#88a2d2", "#f0c4c6", "#187c9a",
            "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
            "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
        ];
        const randomIndex = Math.floor(Math.random() * colors.length);

        return colors[randomIndex];
    };

    const [novel, setNovel] = useState(null);
    const [totalPages, setTotalpage] = useState(0)
    const [page, setPage] = useState(0);
    const fetchtotalpage = async () => {
        const totalpage = await axios.get("http://localhost:5000/api/font/noveltotalpage/");
        setTotalpage(totalpage.data);
    }
    const [activeTab, setActiveTab] = useState('mostview');
    const fetchData = async (tab) => {
        try {
            const getnovel = await axios.get(`http://localhost:5000/api/font/novelgetnovel/${page}/${tab}`)
            setNovel(getnovel.data);
            console.log(novel)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchData(activeTab);
    }, [page])
    useEffect(() => {
        fetchtotalpage();
        fetchData("mostview");
    }, [])


    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === "mostview") {
            fetchData("mostview");
        } else {
            fetchData("lastest");
        }
        setPage(0)
    };
    const handlePageChange = (e) => {
        setPage(Number(e.target.value));
    }
    const handleNewerClick = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    const handleOlderClick = () => {
        if (page < totalPages - 1) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div style={{ marginTop: '4rem', marginBottom: '15rem' }} >
            <NavbarReactBootstrap />
            <div className='container category-name-con mb-5' style={{ marginTop: '8rem', fontSize: "2rem" }}>
                <a>นิยายทั้งหมด</a>
            </div>
            <div className="container mb-5 mt-3 border-bottom d-flex">
                <span className={`clickable-tab ${activeTab === 'mostview' ? 'active' : ''}`} onClick={() => handleTabClick('mostview')}>
                    <h3>ยอดนิยม</h3>
                </span>
                <span className={`clickable-tab ${activeTab === 'lastest' ? 'active' : ''}`} onClick={() => handleTabClick('lastest')}>
                    <h3>มาใหม่</h3>
                </span>
            </div>
            <div className="container my-3">
                <div className="row">
                    <div className="col-md-9">
                        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">
                            {novel && novel.map((novel) => (
                                <div key={novel.novel_id} className="col">
                                    <Card style={{ width: '11.5rem', height: '20rem' }}>
                                        <div className=''>
                                            <a href={`/readnovel/${novel.novel_id}`}>
                                                <img src={novel.novel_img ? `/uploads/novel/${novel.novel_img}` : "/uploads/novel/osu icon.jpg"} style={{ height: '13rem', width: "100%" }} alt="Description" />
                                            </a>
                                        </div>
                                        <Card.Body>
                                            <div className='d-flex flex-column justify-content-between' style={{ height: "100%" }} >
                                                <div>
                                                    <a href={`/readnovel/${novel.novel_id}`} className='no-underline'>
                                                        <Card.Subtitle>{novel.novel_name.length > 30 ? `${novel.novel_name.slice(0, 25)}...` : novel.novel_name}</Card.Subtitle>
                                                    </a>
                                                </div>
                                                <div>
                                                    <a href="/authorinfo" className='no-underline author'>
                                                        <Card.Subtitle className="mt-1">{novel.penname.length > 20 ? `${novel.penname.slice(0, 15)}...` : novel.penname}</Card.Subtitle>
                                                    </a>
                                                    <Card.Text className="d-flex align-items-center" style={{ fontSize: "14px" }}>
                                                        <FormatListBulletedTwoToneIcon style={{ color: '#a1a1a1' }} />
                                                        {novel.novel_chaptercount}
                                                        <FavoriteSharpIcon style={{ color: '#a1a1a1' }} />
                                                        {novel.novel_rating}
                                                    </Card.Text>
                                                </div>

                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </div>
                        <div className='row mt-5 flex'>
                            <div className='col-md-2 col-4 text-center mr-4'>
                                <button type="button" className='btn btn-secondary btn-block' onClick={handleNewerClick}> Previous</button>
                            </div>
                            <div className='col-md-8 col-4'>
                                <select className='form-control' onChange={handlePageChange} value={page}>

                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <option key={index} value={index}>{index + 1}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-md-2 col-4 text-center'>
                                <button type="button" className='btn btn-secondary btn-block' onClick={handleOlderClick}> Next</button>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row ">
                            <h4 className='m-3 category-name-con'>หมวดหมู่นิยาย</h4>
                            {mainCategories.map((category, index) => (
                                <div key={index} className="col-5 mb-3 mx-2" >
                                    <a href={`/search/${category}`}>
                                        <button className="btn btn-primary btn-block rounded-pill border-0 p-3" style={{ backgroundColor: getRandomColor(), width: "9rem" }}>{category} </button>
                                    </a>
                                </div>

                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>

    );
};

export default NovelCatePage;
