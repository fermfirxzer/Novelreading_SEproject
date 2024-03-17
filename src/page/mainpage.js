




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
import coverImage from '../tempsnip-removebg-preview.png'; // Path to your image

const Mainpage = () => {

    
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
            <div className=' container coverPage background'>
                <div className='container d-flex justify-content-between align-items-center'>
                    <div className='mx-5'>
                        <div className='TextCon'>
                            <div className='coverPageText' style={{ marginBottom: "-2rem" }}>
                                NOVEL
                            </div>
                            <div className='coverPageText'>
                                READING
                            </div>
                        </div>
                       
                        <div style={{fontSize:"2rem" , color:"#ffffff"}} >
                            "Explore Worlds, One Page at a Time"
                        </div>
                       
                    </div>
                    <img src = {coverImage} style={{height:"15rem"}}></img>
                </div>
               
                
            </div>
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
                
                    <a href ="/novel">
                        <button className="border-0 expand-btn mt-3 ">
                            ดูเพิ่มเติม<ExpandMoreSharpIcon />
                        </button>
                    </a>
            </div>
            
        </div>
    );
};

export default Mainpage;
