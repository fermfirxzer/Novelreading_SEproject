import React from 'react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import { Link } from 'react-router-dom';


const Swipercate = ({ novelsData }) => {
    console.log(novelsData)
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
                {novelsData && novelsData.map((novel) => (
                    <SwiperSlide key={novel.novel_id}>
                        <div className="novel-container">
                            <Link to={`/readnovel/${novel.novel_id}`}>
                                <img src={novel.novel_img ? `/uploads/novel/${novel.novel_img}` : "/uploads/novel/osu icon.jpg"} className="category-image" alt="Description" />
                            </Link>
                            <div className="novel-name">
                                <Link to={`/readnovel/${novel.novel_id}`} className="no-underline">
                                    {novel.novel_name}
                                </Link>
                            </div>
                            <div className="novel-author">
                                <Link to="/authorinfo" className="no-underline author">
                                    {novel.penname}
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
                                <span>{novel.novel_chaptercount}</span>
                                <span>
                                    <img
                                        src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/rating/heart_darkgrey14.png"
                                        className=""
                                        alt="Description"
                                    />
                                </span>
                                <span>{novel.novel_rating}k</span>
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