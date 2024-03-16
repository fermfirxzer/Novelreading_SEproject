




import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

import NavbarReactBootstrap from '../component/Navbar.js';
import Swiperslide from '../Swiperslide.js';
import Swipercate from '../Swipercate.js';
import Signup from './Signup.js';
import Login from './login.js'
import '../index.css';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import axios from 'axios';

const Mainpage = () => {

    const novelsData = [
        { id: 1, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 10, views: 1000 },
        { id: 2, imageUrl: "https://cdn.readawrite.com/articles/14149/14148253/thumbnail/tiny.gif?7", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 3, imageUrl: "https://cdn.readawrite.com/articles/13628/13627508/thumbnail/tiny.gif?3", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 100, views: 1000 },
        { id: 4, imageUrl: "https://cdn.readawrite.com/articles/14087/14086620/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 5, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 10, views: 1000 },
        { id: 6, imageUrl: "https://cdn.readawrite.com/articles/14184/14183780/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 11, views: 1000 },
        { id: 1, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 11, views: 1000 },
        { id: 2, imageUrl: "https://cdn.readawrite.com/articles/14149/14148253/thumbnail/tiny.gif?7", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 3, imageUrl: "https://cdn.readawrite.com/articles/13628/13627508/thumbnail/tiny.gif?3", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 11, views: 1000 },
        { id: 4, imageUrl: "https://cdn.readawrite.com/articles/14087/14086620/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 11, views: 1000 },
        { id: 5, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 6, imageUrl: "https://cdn.readawrite.com/articles/14184/14183780/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 1, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 2, imageUrl: "https://cdn.readawrite.com/articles/14149/14148253/thumbnail/tiny.gif?7", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 12, views: 1000 },
        { id: 3, imageUrl: "https://cdn.readawrite.com/articles/13628/13627508/thumbnail/tiny.gif?3", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 4, imageUrl: "https://cdn.readawrite.com/articles/14087/14086620/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 5, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 6, imageUrl: "https://cdn.readawrite.com/articles/14184/14183780/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 1, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 2, imageUrl: "https://cdn.readawrite.com/articles/14149/14148253/thumbnail/tiny.gif?7", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 3, imageUrl: "https://cdn.readawrite.com/articles/13628/13627508/thumbnail/tiny.gif?3", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 4, imageUrl: "https://cdn.readawrite.com/articles/14087/14086620/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 5, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 6, imageUrl: "https://cdn.readawrite.com/articles/14184/14183780/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 1, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 2, imageUrl: "https://cdn.readawrite.com/articles/14149/14148253/thumbnail/tiny.gif?7", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 3, imageUrl: "https://cdn.readawrite.com/articles/13628/13627508/thumbnail/tiny.gif?3", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 4, imageUrl: "https://cdn.readawrite.com/articles/14087/14086620/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 5, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 6, imageUrl: "https://cdn.readawrite.com/articles/14184/14183780/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 1, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 2, imageUrl: "https://cdn.readawrite.com/articles/14149/14148253/thumbnail/tiny.gif?7", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 3, imageUrl: "https://cdn.readawrite.com/articles/13628/13627508/thumbnail/tiny.gif?3", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 4, imageUrl: "https://cdn.readawrite.com/articles/14087/14086620/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 5, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 6, imageUrl: "https://cdn.readawrite.com/articles/14184/14183780/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 1, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 2, imageUrl: "https://cdn.readawrite.com/articles/14149/14148253/thumbnail/tiny.gif?7", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 3, imageUrl: "https://cdn.readawrite.com/articles/13628/13627508/thumbnail/tiny.gif?3", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 4, imageUrl: "https://cdn.readawrite.com/articles/14087/14086620/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 5, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 6, imageUrl: "https://cdn.readawrite.com/articles/14184/14183780/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 1, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 2, imageUrl: "https://cdn.readawrite.com/articles/14149/14148253/thumbnail/tiny.gif?7", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 3, imageUrl: "https://cdn.readawrite.com/articles/13628/13627508/thumbnail/tiny.gif?3", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 4, imageUrl: "https://cdn.readawrite.com/articles/14087/14086620/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 5, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 6, imageUrl: "https://cdn.readawrite.com/articles/14184/14183780/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 1, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 2, imageUrl: "https://cdn.readawrite.com/articles/14149/14148253/thumbnail/tiny.gif?7", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 3, imageUrl: "https://cdn.readawrite.com/articles/13628/13627508/thumbnail/tiny.gif?3", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 4, imageUrl: "https://cdn.readawrite.com/articles/14087/14086620/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 5, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 6, imageUrl: "https://cdn.readawrite.com/articles/14184/14183780/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 1, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 2, imageUrl: "https://cdn.readawrite.com/articles/14149/14148253/thumbnail/tiny.gif?7", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 3, imageUrl: "https://cdn.readawrite.com/articles/13628/13627508/thumbnail/tiny.gif?3", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 4, imageUrl: "https://cdn.readawrite.com/articles/14087/14086620/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 5, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 6, imageUrl: "https://cdn.readawrite.com/articles/14184/14183780/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 1, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 2, imageUrl: "https://cdn.readawrite.com/articles/14149/14148253/thumbnail/tiny.gif?7", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 3, imageUrl: "https://cdn.readawrite.com/articles/13628/13627508/thumbnail/tiny.gif?3", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 4, imageUrl: "https://cdn.readawrite.com/articles/14087/14086620/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 5, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 6, imageUrl: "https://cdn.readawrite.com/articles/14184/14183780/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 1, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 2, imageUrl: "https://cdn.readawrite.com/articles/14149/14148253/thumbnail/tiny.gif?7", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 3, imageUrl: "https://cdn.readawrite.com/articles/13628/13627508/thumbnail/tiny.gif?3", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 4, imageUrl: "https://cdn.readawrite.com/articles/14087/14086620/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 5, imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 6, imageUrl: "https://cdn.readawrite.com/articles/14184/14183780/thumbnail/tiny.gif?1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        // Add more novels as needed
    ];
    const [expandedRows, setExpandedRows] = useState(18);

    const handleExpand = () => {
        setExpandedRows(expandedRows + 15);
    };
    const [lovenovel, setLovenovel] = useState(null);
    const [scifi, setscifi] = useState(null)
    const [Mysterious,setMysterious]=useState(null);
    const [Action,setAction]=useState(null);
    const [Lastest,setLastest]=useState(null)
    const fetchCategoryNovel = async (category, setCategory) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/font/fetchnovelbycategory/${category}`);
            setCategory(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    const fetchlasted=async()=>{
        try{
            const limit=12;
            const response=await axios.get(`http://localhost:5000/api/font/fetchnovellasted/${limit}`);
            setLastest(response.data);
            console.log(Lastest)
        }catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        const categoriesToFetch = [
            { category: 'Love%20novel', setCategory: setLovenovel },
            { category: 'sci-fi', setCategory: setscifi },
            { category: 'Mysterious', setCategory: setMysterious },
            { category: 'Action', setCategory: setAction },  
        ];
        categoriesToFetch.forEach(async (categoryObject) => {
            await fetchCategoryNovel(categoryObject.category, categoryObject.setCategory);
        });
        fetchlasted();
    
    }, []);

    
    return (
        <div style={{ marginTop: '4rem', marginBottom: '15rem' }}>
            <NavbarReactBootstrap />
            <Swiperslide></Swiperslide>

            <div className="container-lg mb-5">

                <div className='category-container'>
                    <div className='category-name-con'>
                        <a>Love Novel</a>
                    </div>
                    <div className="clearfix">
                        <div className='category-swiper-container'>
                            <Swipercate novelsData={lovenovel}></Swipercate>
                        </div>
                    </div>
                </div>
                <div className='category-container'>
                    <div className='category-name-con'>
                        <a >Sci-fi</a>
                    </div>
                    <div className="clearfix">
                        <div className='category-swiper-container'>
                            <Swipercate novelsData={scifi}></Swipercate>
                        </div>
                    </div>
                </div>
                <div className='category-container'>
                    <div className='category-name-con'>
                        <a>Action</a>
                    </div>
                    <div className="clearfix">
                        <div className='category-swiper-container'>
                            <Swipercate novelsData={Action}></Swipercate>
                        </div>
                    </div>
                </div>
                <div className='category-container'>
                    <div className='category-name-con'>
                        <a>Mysterious</a>
                    </div>
                    <div className="clearfix">
                        <div className='category-swiper-container'>
                            <Swipercate novelsData={Mysterious}></Swipercate>
                        </div>
                    </div>
                </div>
            
            </div>
            <div className="container my-5">
                <div className='category-name-con mb-3'>
                    <a>Lastest Novel </a>
                </div>
                <div className="clearfix">
                        <div className='category-swiper-container'>
                            <Swipercate novelsData={Lastest}></Swipercate>
                        </div>
                    </div>
                    {/* <div className="row row-cols-1 row-cols-md-3 row-cols-lg-6 g-4">
                        {novelsData.slice(0, expandedRows).map((novel) => (
                            <div key={novel.id} className="col">
                                <Card style={{ width: '12rem' }}>
                                    <div className='mb-2'>
                                        <a href="/readnovel">
                                            <img src={novel.imageUrl} style={{ width: '100%' }} alt="Description" />
                                        </a>
                                    </div>
                                    <Card.Body >

                                        <a href="/readnovel" className='no-underline'>
                                            <Card.Subtitle >{novel.name}</Card.Subtitle>
                                        </a>
                                        <a href="/authorinfo" className='no-underline author'>
                                            <Card.Subtitle className="mt-1 mb-2 ">{novel.author}</Card.Subtitle>
                                        </a>

                                        <Card.Text className="d-flex align-items-center" style={{ fontSize: "14px" }}> <FormatListBulletedTwoToneIcon style={{ color: '#a1a1a1' }} /> {novel.chapterCount}  <FavoriteSharpIcon style={{ color: '#a1a1a1' }} /> {novel.rating}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))} 
                    </div>  */}
                {expandedRows < novelsData.length && (
                    <a href ="/novel">
                        <button className="border-0 expand-btn mt-3 ">
                            ดูเพิ่มเติม<ExpandMoreSharpIcon />
                        </button>
                    </a>
                   
                )}
            </div>
         







        </div>
    );
};

export default Mainpage;
