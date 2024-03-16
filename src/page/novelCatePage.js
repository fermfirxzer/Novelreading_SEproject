




import React, { useState} from 'react';
import { Card} from 'react-bootstrap';

import NavbarReactBootstrap from '../component/Navbar.js';

import Swipercate from '../Swipercate.js';

import '../index.css';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';


const NovelCatePage = () => {

    const novelsData = [
        { id: 1, imageUrl: "https://www.osemocphoto.com/collectManga/13735/13735_cover.jpg?ver=2", name: "รักที่ไม่คู่ควร รักที่ไม่คู่ควร รักที่ไม่คู่ควรรักที่ไม่คู่ควรรักที่ไม่คู่ควร รักที่ ", author: "ระรินรัก", chapterCount: 232323, rating: 10, views: 1000 },
        { id: 2, imageUrl: "https://www.osemocphoto.com/collectManga/8599/8599_cover.jpg?ver=0", name: "รักที่ไม่คู่ควร ", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 3, imageUrl: "https://www.osemocphoto.com/collectManga/8234/8234_cover.jpg?ver=2", name: "รักที่ไม่คู่ควร ", author: "ระรินรัก", chapterCount: 232323, rating: 100, views: 1000 },
        { id: 4, imageUrl: "https://www.osemocphoto.com/collectManga/11984/11984_cover.jpg?ver=7", name: "รักที่ไม่คู่ควร ", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 5, imageUrl: "https://www.osemocphoto.com/collectManga/12636/12636_cover.jpg?ver=1", name: "รักที่ไม่คู่ควร", author: "ระรินรัก", chapterCount: 232323, rating: 10, views: 1000 },
        { id: 1, imageUrl: "https://www.osemocphoto.com/collectManga/13735/13735_cover.jpg?ver=2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 10, views: 1000 },
        { id: 2, imageUrl: "https://www.osemocphoto.com/collectManga/8599/8599_cover.jpg?ver=0", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 3, imageUrl: "https://www.osemocphoto.com/collectManga/8234/8234_cover.jpg?ver=2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 100, views: 1000 },
        { id: 4, imageUrl: "https://www.osemocphoto.com/collectManga/11984/11984_cover.jpg?ver=7", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 5, imageUrl: "https://www.osemocphoto.com/collectManga/12636/12636_cover.jpg?ver=1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 10, views: 1000 },
        // Add more novels as needed
        { id: 11, imageUrl: "https://www.osemocphoto.com/collectManga/13735/13735_cover.jpg?ver=2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 10, views: 1000 },
        { id: 12, imageUrl: "https://www.osemocphoto.com/collectManga/8599/8599_cover.jpg?ver=0", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 13, imageUrl: "https://www.osemocphoto.com/collectManga/8234/8234_cover.jpg?ver=2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 100, views: 1000 },
        { id: 14, imageUrl: "https://www.osemocphoto.com/collectManga/11984/11984_cover.jpg?ver=7", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 25, imageUrl: "https://www.osemocphoto.com/collectManga/12636/12636_cover.jpg?ver=1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 10, views: 1000 },
        { id: 21, imageUrl: "https://www.osemocphoto.com/collectManga/13735/13735_cover.jpg?ver=2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 10, views: 1000 },
        { id: 22, imageUrl: "https://www.osemocphoto.com/collectManga/8599/8599_cover.jpg?ver=0", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 23, imageUrl: "https://www.osemocphoto.com/collectManga/8234/8234_cover.jpg?ver=2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 100, views: 1000 },
        { id: 34, imageUrl: "https://www.osemocphoto.com/collectManga/11984/11984_cover.jpg?ver=7", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 45, imageUrl: "https://www.osemocphoto.com/collectManga/12636/12636_cover.jpg?ver=1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 10, views: 1000 },
        { id: 51, imageUrl: "https://www.osemocphoto.com/collectManga/13735/13735_cover.jpg?ver=2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 10, views: 1000 },
        { id: 62, imageUrl: "https://www.osemocphoto.com/collectManga/8599/8599_cover.jpg?ver=0", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 33, imageUrl: "https://www.osemocphoto.com/collectManga/8234/8234_cover.jpg?ver=2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 100, views: 1000 },
        { id: 34, imageUrl: "https://www.osemocphoto.com/collectManga/11984/11984_cover.jpg?ver=7", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 25, imageUrl: "https://www.osemocphoto.com/collectManga/12636/12636_cover.jpg?ver=1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 10, views: 1000 },
        { id: 21, imageUrl: "https://www.osemocphoto.com/collectManga/13735/13735_cover.jpg?ver=2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 10, views: 1000 },
        { id: 23, imageUrl: "https://www.osemocphoto.com/collectManga/8599/8599_cover.jpg?ver=0", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 4323, imageUrl: "https://www.osemocphoto.com/collectManga/8234/8234_cover.jpg?ver=2", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 100, views: 1000 },
        { id: 44, imageUrl: "https://www.osemocphoto.com/collectManga/11984/11984_cover.jpg?ver=7", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 1, views: 1000 },
        { id: 45, imageUrl: "https://www.osemocphoto.com/collectManga/12636/12636_cover.jpg?ver=1", name: "รักที่ไม่คู่ควร (มี ebook)", author: "ระรินรัก", chapterCount: 232323, rating: 10, views: 1000 },
    ];
    const [expandedRows, setExpandedRows] = useState(18);

    const handleExpand = () => {
        setExpandedRows(expandedRows + 15);
    };
    
    const mainCategories = [
        "Love novel",
        "Fantasy",
        "Sci-fi",
        "Investigate",
        "Mysterious",
        "Horror",
        "Girl Love",
        "Boy Love",
        "Action",
       
        
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
            "#4b61ea","#ff574a","#00cbc3","#ff9c2c","#7962fa",
            "#ed306b","#ff9fc7","#88a2d2","#f0c4c6","#187c9a",
            "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
            "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
        ];
        const randomIndex = Math.floor(Math.random() * colors.length);
      
        return colors[randomIndex];
      };
   


      const [activeTab, setActiveTab] = useState('mostview'); 

      const handleTabClick = (tab) => {
        setActiveTab(tab);
      };

    return (
        <div style={{ marginTop: '4rem', marginBottom: '15rem'}} >
            <NavbarReactBootstrap />
            <div className='container category-name-con mb-5' style={{ marginTop: '8rem',fontSize:"2rem"}}>
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
                            {novelsData.map((novel) => (
                                <div key={novel.id} className="col">
                                    <Card style={{ width: '11.5rem', height: '20rem'}}>
                                        <div className=''>
                                            <a href="/readnovel">
                                                <img src={novel.imageUrl} style={{ height: '13rem',width:"100%" }} alt="Description" />
                                            </a>
                                        </div>
                                        <Card.Body>
                                            <div className='d-flex flex-column justify-content-between' style={{height: "100%"}} >
                                                <div>
                                                    <a href="/readnovel" className='no-underline'>
                                                        <Card.Subtitle>{novel.name.length > 30 ? `${novel.name.slice(0, 25)}...` : novel.name}</Card.Subtitle>
                                                    </a>
                                                </div>
                                                <div>
                                                    <a href="/authorinfo" className='no-underline author'>
                                                        <Card.Subtitle className="mt-1">{novel.author}</Card.Subtitle>
                                                    </a>
                                                    <Card.Text className="d-flex align-items-center" style={{ fontSize: "14px" }}>
                                                        <FormatListBulletedTwoToneIcon style={{ color: '#a1a1a1' }} />
                                                        {novel.chapterCount}  
                                                        <FavoriteSharpIcon style={{ color: '#a1a1a1' }} />
                                                        {novel.rating}
                                                    </Card.Text>
                                                </div>
                                              
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row ">
                            <h4 className='m-3 category-name-con'>หมวดหมู่นิยาย</h4>
                            {mainCategories.map((category, index) => (
                                <div key={index} className="col-5 mb-3 mx-2"  >
                                    <button className="btn btn-primary btn-block rounded-pill border-0 p-3" style={{ backgroundColor: getRandomColor(),width:"9rem"}}>{category} </button>
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
