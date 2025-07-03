import React, { useEffect, useRef, useState } from 'react';
import Buttons from '../utils/buttons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import GameCard from '../utils/GameCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DashBoardHeader from '../header-footer/dashBoardHeader';
import { Link } from 'react-router-dom';
import apiHandler from '../../functions/apiHandler';

function Homepage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const ref = useRef(null);
  const igniteRef = useRef(null);

  const [aristocratGames, setAristocratGames] = useState([]);
  const [igniteGames, setIgniteGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const [heroSlider, setHeroSlider] = useState([
    { img: '/Images/sliderBanner.png' },
    { img: '/Images/sliderBanner.png' },
    { img: '/Images/sliderBanner.png' },
  ]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const [aristocratRes, igniteRes] = await Promise.all([
        apiHandler.get(`games?skip=0&limit=10&studio=1`),
        apiHandler.get(`games?skip=0&limit=10&studio=2`)
      ]);
      console.log(aristocratRes);
      
      setAristocratGames(aristocratRes.data.data.games || []);
      setIgniteGames(igniteRes.data.data.games || []);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className='container w-full'>
        
        {/* Hero Slider */}
        <div className='w-full '>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            modules={[Pagination, Autoplay]}
            loop={true}
            autoplay
            spaceBetween={50}
            slidesPerView={1}
            
          >
            {heroSlider.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className='relative'>
                  <img className='h-100 md:h-80 w-full object-cover  rounded-xl' src={slide.img} alt='' />
                  <p className='absolute top-3 left-3 font-semibold px-3.5 py-2.5 primary-gradient rounded-xl'>
                    Coming Soon
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='flex justify-center space-x-2 mt-4'>
            {heroSlider.map((_, index) => (
              <button
                key={index}
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`w-2.5 h-2.5 rounded-full ${
                  activeIndex === index
                    ? 'w-20 h-2.5 rounded-xl bg-primary-dark'
                    : 'bg-black-v4'
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Aristocrat Games */}
        <div className='flex flex-col md:flex-row  justify-between my-6 md:my-10 lg:my-15'>
          <h3 className='font-medium text-3xl md:4xl'>Aristocrat Interactive Releases</h3>
          <div className='flex justify-end   gap-3.5'>
            <button
              onClick={() => ref.current?.slidePrev()}
              className='w-12 h-12 rounded-xl bg-white-v2 text-black-v4 flex justify-center items-center hover:bg-[black] cursor-pointer'
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => ref.current?.slideNext()}
              className='w-12 h-12 rounded-xl bg-primary-dark text-white flex justify-center items-center hover:bg-[black] cursor-pointer'
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className='mb-16 cstm-swiper'>
          {loading ? (
            <p>Loading Aristocrat Games...</p>
          ) : (
            <Swiper
  onSwiper={(swiper) => (ref.current = swiper)}
  spaceBetween={20}
  loop={true}
  breakpoints={{
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  }}
>
  {aristocratGames.map((game, index) => (
    <SwiperSlide key={game?.id || index}>
      <GameCard game={game} />
    </SwiperSlide>
  ))}
</Swiper>

          )}
        </div>

        <div className='flex justify-center pb-16 border-b-2 mb-14 border-b-black-v4'>
          <Link to={`/dashboard/games?studio=d538d8e3-6616-42e7-adb3-69f2e73f78dd`}>
            <Buttons>Discover More</Buttons>
          </Link>
        </div>

        {/* Ignite Games */}
      <div className='flex flex-col md:flex-row  justify-between my-6 md:my-10 lg:my-15'>
          <h3 className='font-medium text-3xl md:4xl'>Ignite Releases</h3>
          <div className='flex justify-end   gap-3.5'>
            <button
              onClick={() => ref.current?.slidePrev()}
              className='w-12 h-12 rounded-xl bg-white-v2 text-black-v4 flex justify-center items-center hover:bg-[black] cursor-pointer'
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => ref.current?.slideNext()}
              className='w-12 h-12 rounded-xl bg-primary-dark text-white flex justify-center items-center hover:bg-[black] cursor-pointer'
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className='mb-24 cstm-swiper'>
          {loading ? (
            <p>Loading Ignite Games...</p>
          ) : (
            <Swiper
              onSwiper={(swiper) => (igniteRef.current = swiper)}
              loop={true}
              spaceBetween={20}
                breakpoints={{
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  }}
            >
              {igniteGames.map((game, index) => (
                <SwiperSlide key={index}>
                  <GameCard game={game} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        <div className='flex justify-center mb-10'>
          <Link to={'/dashboard/games?studio=974c3fc0-214c-456a-8b36-68d6813cb8b3'}>
            <Buttons>Discover More</Buttons>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Homepage;
