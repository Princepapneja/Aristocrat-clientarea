import React, { useRef, useState } from 'react'
import Buttons from '../utils/buttons'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import  {  Pagination, Autoplay } from 'swiper/modules';
import GameCard from '../utils/GameCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DashBoardHeader from '../header-footer/dashBoardHeader';

function Homepage() {
    const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef(null)
  const ref = useRef(null)
  const igniteRef = useRef(null)
            const[gameAssets, setGameAssets]=useState(
                [
                    {
                        value:"Game Assets",
                        selected: true,
                        name:"Game Assets"
                    }
                ]
            )

            const [heroSlider,setHeroSlider] = useState([
                {
                    img: '/Images/sliderBanner.png'
                },
                {
                    img: '/Images/sliderBanner.png'
                },
                {
                    img: '/Images/sliderBanner.png'
                },
            ])

                const [games,setGames] = useState([
                    {
            image:'/Images/game.png',
            title:"Wolf Riches Hold N Spin",
            by:"Studio Name",
            date:"05 January"
                    },
                    {
                        image:'/Images/game.png',
                        title:"Chicken Burst",
                        by:"Studio Name",
                        date:"13 February"
                                },
                    {
            image:'/Images/game.png',
            title:"Fortune Tree Of Wealth",
            by:"Studio Name",
            date:"04 March"
                    },
                
                    {
            image:'/Images/game.png',
            title:"Cards Fortune",
            by:"Studio Name",
            date:"17 April"
                    },
                    {
                        image:'/Images/game.png',
                        title:"Fortune Tree Of Wealth",
                        by:"Studio Name",
                        date:"04 March"
                                },
                                {
                                    image:'/Images/game.png',
                                    title:"Fortune Tree Of Wealth",
                                    by:"Studio Name",
                                    date:"04 March"
                                            },
                                            {
                                                image:'/Images/game.png',
                                                title:"Fortune Tree Of Wealth",
                                                by:"Studio Name",
                                                date:"04 March"
                                                        },
                                                        {
                                                            image:'/Images/game.png',
                                                            title:"Fortune Tree Of Wealth",
                                                            by:"Studio Name",
                                                            date:"04 March"
                                                                    },
                ])
  return (
   <>
   <div className='container mt-16 mb-32'>
   <div className='flex justify-center font-medium text-4xl mb-16'>
    <h1>Welcome to Arictocrat Interactive Client Area</h1>
</div>
<div className='mb-20'>
<DashBoardHeader options={gameAssets} />
</div>

<div className='mb-20 w-full'>
    {/* slider */}
    <Swiper
    onSwiper={(swiper) => (swiperRef.current = swiper)}
    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
     modules={[Pagination,Autoplay]}
    loop={true}
    autoplay
      spaceBetween={50}
      slidesPerView={1}
    >
        {heroSlider.map((slide)=>{
            return(
<SwiperSlide><div className='relative'>
        <img className='h-80 w-full' src={slide.img} alt="" />
        <p className='absolute top-3 left-3 font-semibold px-3.5 py-2.5 primary-gradient rounded-xl '>Coming Soon</p>
        </div>
        </SwiperSlide>
            )
        })}
    </Swiper>
    <div className="flex justify-center space-x-2 mt-4">
        {heroSlider.map((_, index) => {
            return(
        
          <button
            key={index}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={`w-2.5 h-2.5 rounded-full ${
              activeIndex === index ? 'w-20 h-2.5 rounded-xl bg-primary-dark' : 'bg-black-v4'
            }`}
          ></button>
        )})}
      </div>
</div>

<div className='flex justify-between mb-14'>
<h3 className='font-medium text-3xl'>Aristocrat Interactive Releases</h3>
{/* slider buttons */}
<div className='flex gap-3.5'>
<div>
        <button
          onClick={() =>ref.current && ref.current?.slidePrev()}
          className="w-12 h-12 rounded-xl bg-white-v2 text-black-v4 flex justify-center items-center"
        >
          <ChevronLeft />
        </button>
      </div>
      <div>
        <button
          onClick={() =>ref.current && ref.current?.slideNext()}
          className="w-12 h-12 rounded-xl bg-primary-dark text-white flex justify-center items-center"
        >
          <ChevronRight />
        </button>
      </div>
      </div>
</div>
<div className='mb-16'>
    {/* slider cards */}
    <Swiper
    onSwiper={(swiper) => (ref.current = swiper)}
        spaceBetween = {40}
        slidesPerView={4}
        loop={true}
    >
{games.map((slide)=>{
    return(
        <SwiperSlide>
            <GameCard gameImage={slide.image} title={slide.title} by={slide.by} date={slide.date} />
        </SwiperSlide>  
    )
})}
    </Swiper>
    
</div>
<div className='flex justify-center pb-16 border-b-2 mb-14 border-b-black-v4'>
<Buttons>Discover More</Buttons>
</div>
<div>
    <div className='flex justify-between mb-14'>
<h3 className='text-3xl font-medium'>Ignite Releases</h3>
{/* slider buttons */}
<div className='flex gap-3.5'>
<div>
        <button
          onClick={() =>igniteRef.current && igniteRef.current?.slidePrev()}
          className="w-12 h-12 rounded-xl bg-white-v2 text-black-v4 flex justify-center items-center"
        >
          <ChevronLeft />
        </button>
      </div>
      <div>
        <button
          onClick={() =>igniteRef.current && igniteRef.current?.slideNext()}
          className="w-12 h-12 rounded-xl bg-primary-dark text-white flex justify-center items-center"
        >
          <ChevronRight />
        </button>
      </div>
      </div>
    </div>
<div className='mb-24'>
{/* cards slider */}
<Swiper
    onSwiper={(swiper) => (igniteRef.current = swiper)}
        spaceBetween = {40}
        slidesPerView={4}
        loop={true}
    >
{games.map((slide)=>{
    return(
        <SwiperSlide>
            <GameCard gameImage={slide.image} title={slide.title} by={slide.by} date={slide.date} />
        </SwiperSlide>  
    )
})}
    </Swiper>
</div>
<div className='flex justify-center'>
<Buttons>Discover More</Buttons>
</div>
</div>


   </div>
   
   </>
  )
}

export default Homepage