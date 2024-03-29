
import React, { useState, useEffect } from 'react';
import "./readingchapter.scss"
import { Card } from 'react-bootstrap';
import NavbarReactBootstrap from "../component/Navbar";
import axios from 'axios';
import '../index.css';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import { useParams } from 'react-router-dom';
const Search = () => {

    const [value, setValue] = useState(null);
    const { category: initialCategory } = useParams();
    const [category, setCategory] = useState(initialCategory || null);
    const [novel, setnovel] = useState(null);
    const [order,setOrder]=useState("newest");
    const handlecategoryClick = (name) => {
        if (name === category) {
            setCategory(null);
        } else {
            setCategory(name);
        }

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
    const [totalPages, setTotalpage] = useState(0)
    const [page, setPage] = useState(0);
    const fetchtotalpage = async (tab) => {
        try {
            const totalpage = await axios.get(`http://localhost:5000/api/search/totalpage/${value}/${category}`);
            setTotalpage(totalpage.data);
            console.log("this", totalpage.data)
        } catch (err) {
            console.log(err)
        }
    }
    const search = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/search/${value}/${category}/${order}/${page}`)
            setnovel(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Optional: Smooth scrolling animation
        });
    };
    useEffect(() => {
        setPage(0);
        fetchtotalpage();
        search();
        scrollToTop();
    }, [category,order])
    useEffect(()=>{
        search();
        scrollToTop();
    },[page])
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
        <div style={{ marginTop: '7rem', marginBottom: '15rem' }}>
            <NavbarReactBootstrap></NavbarReactBootstrap>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-9'>
                        <div className='header border-bottom mb-5'>
                            Explore
                        </div>
                        <div className='body'>
                            <div className='card border-0'>
                                <div className='row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4'>
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
                                                            {novel&&<a href={`/novel/${novel.penname}`} className='no-underline author'>
                                                                <Card.Subtitle className="mt-1">{novel.penname}</Card.Subtitle>
                                                            </a>}
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
                            </div>
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
                    <div className='col-lg-3'>
                        <div className='search-right'>
                            <div className=''>
                                <div className='search-item'>
                                    <div className='search-head'>
                                        Search
                                    </div>
                                    <hr></hr>
                                    <input
                                        className='form-control'
                                        type='text'
                                        name="value"
                                        
                                        placeholder='Search by novel name'
                                        onChange={(e) => setValue(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                search();   
                                            }
                                        }}
                                    ></input>
                                    
                                </div>
                                
                            </div>
                            <div className='search-item'>
                                <div className='search-head'>
                                    Order and Type
                                </div>
                                <hr></hr>
                                <div className='search-body'>
                                    <select className='form-control' value={order} onChange={(e)=>setOrder(e.target.value)}>
                                        <option value="newest">Newest Novel</option>
                                        <option value="oldest">Oldest Novel</option>
                                    </select>
                                </div>
                            </div>
                            <div className='search-item'>
                                <div className='search-head'>
                                    Genre
                                </div>
                                <hr></hr>
                                <div className='search-body'>
                                    {mainCategories && mainCategories.map((cate) => (
                                        <button className={`genre-box form-control ${category === cate ? 'active' : ''}`} onClick={() => handlecategoryClick(cate)}>
                                            {cate}
                                        </button>
                                    ))}

                                </div>

                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>








    );
};

export default Search;
