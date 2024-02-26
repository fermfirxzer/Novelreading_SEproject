import React from 'react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide ,useSwiper} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const slidesData = [
  {
    id: 1,
    imageUrl: "https://1417094351.rsc.cdn77.org/banner/4006/MINI/600/banner_img.png?2024-01-0814:39:24",
    link: "/readnovel",
  },
  {
    id: 2,
    imageUrl: "https://1417094351.rsc.cdn77.org/banner/4035/MINI/600/banner_img.png?2024-01-1109:35:49",
    link: "/readnovel",
  },
  {
    id: 3,
    imageUrl: "https://1417094351.rsc.cdn77.org/banner/3997/MINI/600/banner_img.png?2024-01-0410:39:23",
    link: "/readnovel",
  },
  {
    id: 4,
    imageUrl: "https://1417094351.rsc.cdn77.org/banner/4000/MINI/600/banner_img.png?2024-01-0510:15:42",
    link: "/readnovel",
  },
  {
    id: 5,
    imageUrl: "https://1417094351.rsc.cdn77.org/banner/3962/MINI/600/banner_img.png?2024-01-0211:54:25",
    link: "/readnovel",
  },
  {
    id: 6,
    imageUrl: "https://1417094351.rsc.cdn77.org/banner/3962/MINI/600/banner_img.png?2024-01-0211:54:25",
    link: "/readnovel",
  },
  // Add more slide data as needed
];
const Swiperslide = () => {
    
    return (
        
      <Swiper className='border-top border-bottom py-4'
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        720: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 2,
        },
        1224: {
          slidesPerView: 3,
        },
      }}
    >
        {slidesData.map((slide) => (
        <SwiperSlide key={slide.id} >
          <div>
            <a href={slide.link}>
              <img src={slide.imageUrl} className="image" alt="Description" />
            </a>
          </div>
        </SwiperSlide>
      ))}
      </Swiper>
      
    );
  };
  
  export default Swiperslide;