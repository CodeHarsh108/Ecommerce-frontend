import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";  
import { Navigation, Pagination, EffectFade, Autoplay, Scrollbar } from "swiper/modules"; // Combined imports
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/scrollbar"; 
import { bannerList } from "../../utils";
import { Link } from 'react-router-dom';

const color = ["bg-banner-color1", "bg-banner-color2", "bg-banner-color3"];

const HeroBanner = () => {
    return(
        <div className="py-2 rounded-md ">
            <Swiper 
                grabCursor={true} 
                autoplay={{delay:4000, disableOnInteraction:false}} 
                loop={true} 
                navigation={true} 
                modules={[Pagination, EffectFade, Navigation, Autoplay, Scrollbar]} 
                pagination={{clickable:true}} 
                scrollbar={{draggable:true}} 
                slidesPerView={1}
            >
                {bannerList.map((item, i) => (
                    <SwiperSlide key={item.id}>
                        <div className={`carousel-item rounded-md sm:h-[500px] h-96 ${color[i]}`}>
                            <div className="flex items-center justify-center ">
                                <div className='hidden lg:flex justify-center w-1/2 p-8'>
                                <div className="text-center ">
                                    <h3 className="text-3xl text-white font-bold">{item.title}</h3>
                                    <h1 className='text-5xl text-white font-bold mt-2'>{item.subtitle}</h1>
                                    <p className='text-white font-bold '>{item.description}</p>
                                    <Link className='mt-6 inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800' to={'/products'}>
                                        Shop Now
                                  </Link>
                                </div>
                            </div>
                            <div className='w-full flex justify-center lg:w-1/2 p-4'>
                                <img src={item.image} ></img>
                            </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))} 
                            </Swiper>
        </div>
    );
};

export default HeroBanner;