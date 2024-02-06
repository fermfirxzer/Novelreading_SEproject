import React from 'react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide ,useSwiper} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



const Swiperslide = () => {
    
    return (
        
      <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
        <SwiperSlide>
          {<div key={1}>
            <a href = '/readnovel'>
              <img src="https://1417094351.rsc.cdn77.org/banner/4006/MINI/600/banner_img.png?2024-01-0814:39:24" className="image" alt="Descripdsadatdion" />
            </a>
           
            </div>
          }
        </SwiperSlide>
        <SwiperSlide>
        {<div key={2} >
           
            <img src= "https://1417094351.rsc.cdn77.org/banner/4035/MINI/600/banner_img.png?2024-01-1109:35:49" className="image" alt="Descdription"></img>
            
        </div> }
        </SwiperSlide>
        <SwiperSlide>
        {<div key={3}>
            
            <img src= "https://1417094351.rsc.cdn77.org/banner/3997/MINI/600/banner_img.png?2024-01-0410:39:23"className="image" alt="Descdsaddsaaription"></img>
            
        </div>}
        </SwiperSlide>
        <SwiperSlide>
        {<div key={4}>
            
            <img src= "https://1417094351.rsc.cdn77.org/banner/4000/MINI/600/banner_img.png?2024-01-0510:15:42" className="image" alt="Descdsadasrdsaiption"></img>
            
        </div>}
        </SwiperSlide>
        <SwiperSlide>
        {<div key={5}>
            
            <img src= "https://1417094351.rsc.cdn77.org/banner/3962/MINI/600/banner_img.png?2024-01-0211:54:25" className="image" alt="Descridadsaddsaadasption"></img>
            
        </div>}
        </SwiperSlide>
        <SwiperSlide>
        {<div key={6}>
            
            <img src= "https://1417094351.rsc.cdn77.org/banner/3962/MINI/600/banner_img.png?2024-01-0211:54:25" className="image"  alt="Descridadsdsaadadasption"></img>
            
        </div>}
        </SwiperSlide>
      </Swiper>
      
    );
  };
  
  export default Swiperslide;