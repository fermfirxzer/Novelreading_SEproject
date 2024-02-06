import React from 'react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide ,useSwiper} from 'swiper/react';

import { Link } from 'react-router-dom';


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
                    >
                        <SwiperSlide>
                        {<div className = "novel-container" key={1}>
                            <a href='/readnovel'>
                                <img src="https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2" className="category-image" alt="Descripdsadatdion" />        
                            </a>
                            <div className='novel-name'>
                                <Link to="/readnovel" className="no-underline">รักที่ไม่คู่ควร (มี ebook) </Link>
                            </div>
                            <div className='novel-author'>
                                <Link to="/authorinfo" className="no-underline author" >ระรินรัก</Link>
                            </div>
                            <div className='novel-info'>
                                <span>
                                    <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/icon-amount-chapter@2x.png?t_143" className="" alt="Descripdsadatdion" />
                                </span>
                                <span>23</span>
                                <span>
                                    <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/rating/heart_darkgrey14.png" className="" alt="Descripdsadatdion" />
                                </span>
                                <span>1k</span>
                                
                            </div>
                         </div>
                        }
                        </SwiperSlide>
                        <SwiperSlide>
                        {<div className = "novel-container" key={1}>
                            <img src=" https://cdn.readawrite.com/articles/14149/14148253/thumbnail/tiny.gif?7" className="category-image" alt="Descripdsadatdion" />
                            <div className='novel-name'>
                                <a>name</a>
                            </div>
                            <div className='novel-author'>
                                <a>author</a>
                            </div>
                            <div className='novel-info'>
                                <span>
                                    <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/icon-amount-chapter@2x.png?t_143" className="" alt="Descripdsadatdion" />
                                </span>
                                <span>23</span>
                                <span>
                                    <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/rating/heart_darkgrey14.png" className="" alt="Descripdsadatdion" />
                                </span>
                                <span>1k</span>
                                
                            </div>
                         </div>
                        }
                        </SwiperSlide>
                        <SwiperSlide>
                        {<div className = "novel-container" key={1}>
                            <img src="https://cdn.readawrite.com/articles/13705/13704960/thumbnail/tiny.gif?5" className="category-image" alt="Descripdsadatdion" />
                            <div className='novel-name'>
                                <a>name</a>
                            </div>
                            <div className='novel-author'>
                                <a>author</a>
                            </div>
                            <div className='novel-info'>
                                <span>
                                    <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/icon-amount-chapter@2x.png?t_143" className="" alt="Descripdsadatdion" />
                                </span>
                                <span>23</span>
                                <span>
                                    <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/rating/heart_darkgrey14.png" className="" alt="Descripdsadatdion" />
                                </span>
                                <span>1k</span>
                                
                            </div>
                         </div>
                        }
                        </SwiperSlide>
                        <SwiperSlide>
                        {<div className = "novel-container" key={1}>
                            <img src=" https://cdn.readawrite.com/articles/13628/13627508/thumbnail/tiny.gif?3" className="category-image" alt="Descripdsadatdion" />
                            <div className='novel-name'>
                                <a>name</a>
                            </div>
                            <div className='novel-author'>
                                <a>author</a>
                            </div>
                            <div className='novel-info'>
                                <span>
                                    <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/icon-amount-chapter@2x.png?t_143" className="" alt="Descripdsadatdion" />
                                </span>
                                <span>23</span>
                                <span>
                                    <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/rating/heart_darkgrey14.png" className="" alt="Descripdsadatdion" />
                                </span>
                                <span>1k</span>
                                
                            </div>
                         </div>
                        }
                        </SwiperSlide>
                        <SwiperSlide>
                        {<div className = "novel-container" key={1}>
                            <img src=" https://cdn.readawrite.com/articles/14087/14086620/thumbnail/tiny.gif?1" className="category-image" alt="Descripdsadatdion" />
                            <div className='novel-name'>
                                <a>name</a>
                            </div>
                            <div className='novel-author'>
                                <a>author</a>
                            </div>
                            <div className='novel-info'>
                                <span>
                                    <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/icon-amount-chapter@2x.png?t_143" className="" alt="Descripdsadatdion" />
                                </span>
                                <span>23</span>
                                <span>
                                    <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/rating/heart_darkgrey14.png" className="" alt="Descripdsadatdion" />
                                </span>
                                <span>1k</span>
                                
                            </div>
                         </div>
                        }
                        </SwiperSlide>
                        <SwiperSlide>
                        {<div className = "novel-container" key={1}>
                            <img src="https://cdn.readawrite.com/articles/14184/14183780/thumbnail/tiny.gif?1" className="category-image" alt="Descripdsadatdion" />
                            <div className='novel-name'>
                                <a>name</a>
                            </div>
                            <div className='novel-author'>
                                <a>author</a>
                            </div>
                            <div className='novel-info'>
                                <span>
                                    <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/icon-amount-chapter@2x.png?t_143" className="" alt="Descripdsadatdion" />
                                </span>
                                <span>23</span>
                                <span>
                                    <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/rating/heart_darkgrey14.png" className="" alt="Descripdsadatdion" />
                                </span>
                                <span>1k</span>
                                
                            </div>
                         </div>
                        }
                        </SwiperSlide>
                        <SwiperSlide>
                        {<div className = "novel-container" key={1}>
                            <img src="https://cdn.readawrite.com/articles/14184/14183780/thumbnail/tiny.gif?1" className="category-image" alt="Descripdsadatdion" />
                            <div className='novel-name'>
                                <a>name</a>
                            </div>
                            <div className='novel-author'>
                                <a>author</a>
                            </div>
                            <div className='novel-info'>
                                <span>
                                    <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/icon-amount-chapter@2x.png?t_143" className="" alt="Descripdsadatdion" />
                                </span>
                                <span>23</span>
                                <span>
                                    <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/rating/heart_darkgrey14.png" className="" alt="Descripdsadatdion" />
                                </span>
                                <span>1k</span>
                                
                            </div>
                         </div>
                        }
                        </SwiperSlide>
                        <SwiperSlide>
                        {<div className = "novel-container" key={1}>
                            <img src="https://cdn.readawrite.com/articles/14074/14073412/thumbnail/tiny.gif?2" className="category-image" alt="Descripdsadatdion" />
                            <div className='novel-name'>
                                <a>name</a>
                            </div>
                            <div className='novel-author'>
                                <a>author</a>
                            </div>
                            <div className='novel-info'>
                                <span>
                                    <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/icon-amount-chapter@2x.png?t_143" className="" alt="Descripdsadatdion" />
                                </span>
                                <span>23</span>
                                <span>
                                    <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/rating/heart_darkgrey14.png" className="" alt="Descripdsadatdion" />
                                </span>
                                <span>1k</span>
                                
                            </div>
                         </div>
                        }
                        </SwiperSlide>
                        <SwiperSlide className ="swiper-all-btn" >
                        {<div className ="all-container" key={7}>
                            <a href = "/lovenovel"></a>
                            <button className="all-btn" style={{ cursor: 'pointer' }} >
                                <img className="all-icon" src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/arrow-white-right.png?t_143" alt="Button Image" />
                            </button>
                            <div style={{ marginLeft:'-8px'}}>
                                <span >ดูทั้งหมด</span>
                            </div>
                         </div>
                        }
                        </SwiperSlide>
                     
                    </Swiper>
      
    );
  };
  
  export default Swipercate;