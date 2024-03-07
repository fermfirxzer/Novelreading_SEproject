import React from 'react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import { Link } from 'react-router-dom';

const novelsData = [
    {
        id: 1,
        imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2",
        name: "รักที่ไม่คู่ควร (มี ebook)",
        author: "ระรินรัก",
        chapterCount: 232323,
        rating: 1,
        views: 1000,
    },
    {
        id: 2,
        imageUrl: "https://cdn.readawrite.com/articles/14149/14148253/thumbnail/tiny.gif?7",
        name: "รักที่ไม่คู่ควร (มี ebook)",
        author: "ระรินรัก",
        chapterCount: 232323,
        rating: 1,
        views: 1000,
    },
    {
        id: 3,
        imageUrl: "https://cdn.readawrite.com/articles/13628/13627508/thumbnail/tiny.gif?3",
        name: "รักที่ไม่คู่ควร (มี ebook)",
        author: "ระรินรัก",
        chapterCount: 232323,
        rating: 1,
        views: 1000,
    },
    {
        id: 4,
        imageUrl: "https://cdn.readawrite.com/articles/14087/14086620/thumbnail/tiny.gif?1",
        name: "รักที่ไม่คู่ควร (มี ebook)",
        author: "ระรินรัก",
        chapterCount: 232323,
        rating: 1,
        views: 1000,
    },
    {
        id: 5,
        imageUrl: "https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2",
        name: "รักที่ไม่คู่ควร (มี ebook)",
        author: "ระรินรัก",
        chapterCount: 232323,
        rating: 1,
        views: 1000,
    },
    {
        id: 6,
        imageUrl: "https://cdn.readawrite.com/articles/14184/14183780/thumbnail/tiny.gif?1",
        name: "รักที่ไม่คู่ควร (มี ebook)",
        author: "ระรินรัก",
        chapterCount: 232323,
        rating: 1,
        views: 1000,
    },

    // Add more novel data as needed
];
const Swipercate = () => {
    return (
        <Swiper 
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={20}
            slidesPerView={6}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            breakpoints={{
                320: {
                  slidesPerView: 2,
                },
                500: {
                    slidesPerView: 3,
                  },
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 5,
                },
                1224: {
                    slidesPerView: 6,
                },
              }}
        >
            <Swiper >
                {novelsData.map((novel) => (
                    <SwiperSlide key={novel.id}>
                        <div className="novel-container">
                            <a href="/readnovel">
                                <img src={novel.imageUrl} className="category-image" alt="Description" />
                            </a>
                            <div className="novel-name">
                                <Link to="/readnovel" className="no-underline">
                                    {novel.name}
                                </Link>
                            </div>
                            <div className="novel-author">
                                <Link to="/authorinfo" className="no-underline author">
                                    {novel.author}
                                </Link>
                            </div>
                            <div className="novel-info">
                                <span>
                                    <img
                                        src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/icon-amount-chapter@2x.png?t_143"
                                        className=""
                                        alt="Description"
                                    />
                                </span>
                                <span>{novel.chapterCount}</span>
                                <span>
                                    <img
                                        src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/rating/heart_darkgrey14.png"
                                        className=""
                                        alt="Description"
                                    />
                                </span>
                                <span>{novel.rating}k</span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <SwiperSlide className="swiper-all-btn" >
                {<div className="all-container" key={7}>
                    <a href="/lovenovel"></a>
                    <button className="all-btn" style={{ cursor: 'pointer' }} >
                        <img className="all-icon" src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/arrow-white-right.png?t_143" alt="Button Image" />
                    </button>
                    <div style={{ marginLeft: '-8px' }}>
                        <span >ดูทั้งหมด</span>
                    </div>
                </div>
                }
            </SwiperSlide>

        </Swiper>

    );
};

export default Swipercate;