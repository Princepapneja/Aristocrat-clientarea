import React, { useRef, useState } from 'react'
import Buttons from '../utils/buttons'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import DashBoardHeader from '../header-footer/dashBoardHeader';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import  {  Pagination, Autoplay } from 'swiper/modules';

function DetailGame() {
     const [activeIndex, setActiveIndex] = useState(0)
      const swiperRef = useRef(null)
    const[dateOption, setDateOption]= useState(
        [
            {
                value: "Date",
                selected: true,
                name: "Date"
            }
        ]
    ) 
    
    const [sliderData,setSliderData] = useState([
        {
            img:"/Images/gameimg.png"
        },
        {
            img:"/Images/gameimg.png"
        },
        {
            img:"/Images/gameimg.png"
        },
    ]) 
  return (
    <>
    <div className='container pt-16'>
<DashBoardHeader/>

<div className='mt-10'>
<div className='flex gap-9'>
<div> 

<h1 className='text-4xl font-medium'>Game Title Long Text Here</h1>
<p className='mt-2 mb-4'>By: Studio Name</p>

<div className='space-y-6'>
<p className='text-lg text-black-v3 max-w-[650px]'>Take a break and enjoy the wholesome vibe of the farm! With plenty of fun activities, opportunities to win great rewards, and warm hospitality, Turkey Burst has everything for a good time. Pack your bags, the Turkeys can’t wait to see you!
</p>

<p className='text-lg text-black-v3 max-w-[650px]'>Turkey Burst is a 5x3 slot with 40 paylines and generous bonus features. Get ready to start gobbling up rewards when Turkey Coins land and are collected by the Turkeys above the reels, plus the Coins can randomly trigger the LOCK N SPIN Bonus feature that awards 3 Respins. Then, depending on the Coins collected, you could be blessed with a prize up to 500x or maybe even the Grand prize. Keep the Respins action flowing, because every time a new coin lands, it resets the Respins.
</p>

<p className='text-lg text-black-v3 max-w-[650px]'>
Want to jump right into the Bonus action? Use the Buy Bonus option to activate the feature whenever you want.
</p>

<p className='text-lg text-black-v3 max-w-[593px]'>Play Turkey Burst now!</p></div>
</div>   

<div>
<div className='relative'>
    <img src={"/Images/templateDetailpage.png"} alt="" className=' w-[626px] h-[440px]'/>
    <Swiper
    onSwiper={(swiper) => (swiperRef.current = swiper)}
    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
    modules={[Pagination,Autoplay]}
    loop={true}
    autoplay
    spaceBetween={10}
    slidesPerView={1}
    className='h-[384px] w-[540px] absolute top-[-413px] left-0'
  >
    {sliderData.map((slide)=>{
        return(
<SwiperSlide>
      <img src={slide.img} className='h-full w-full object-cover' />
    </SwiperSlide>
        )
    })}
    
  </Swiper>
  <div className="flex justify-center space-x-2 mt-4 absolute top-[377px] left-[250px] z-10">
        {sliderData.map((_, index) => {
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
<img src={"/Images/frog.png"} alt="" className='absolute w-[170px] h-[164px] top-[297px] right-[-43px] z-50 '/>
<div className=''>
<Buttons>Play Game</Buttons>
</div>
</div>

</div>
</div>
</div>



<div className='mt-14'>
<div className='bg-black rounded-3xl'>
<div className='flex pt-11 pb-9 ml-12 gap-20 max-w-[1354px]'>
    <div>
<p className='font-semibold text-3xl text-white mb-1.5'>Video Slot Game</p>
<p className='font-semibold text-xl text-black-v4 leading-[36px]'>Game Type</p></div>

<div>
<p className='font-semibold text-3xl text-white mb-1.5'>5 Paylines</p>
<p className='font-semibold text-xl text-black-v4 leading-[36px]'>Lines / Ways</p>   
</div>

<div>
<p className='font-semibold text-3xl text-white mb-1.5'>3x3</p>
<p className='font-semibold text-xl text-black-v4 leading-[36px]'>Reel Type</p>   
</div>

<div>
 <input type='select' id="date" options={dateOption} className='border-2 border-black-v3 rounded-lg' />  
</div>

<div>
    <img src={"/Images/platform.png"} alt="" className='w-32 h-10 mb-1.5' />
    <p className='font-semibold text-xl text-black-v4 leading-[36px]'>Platform</p>
</div>

</div>


</div>
</div>


<div className='mt-20'>
<div className='grid grid-cols-4'>
 <div>
    <p className='text-xl text-black-v3 mb-5'>Bet Values</p>
    <p className='text-xl font-semibold'>Min – € 0.10</p>
    <p className='text-xl font-semibold'>Max – € 600.00</p>
    <p className='mt-20 text-xl text-black-v3 '>Max Exposure</p>
    <p className='text-xl font-semibold mt-5'>€466,500</p>
    <p className='text-xl text-black-v3 mt-20 mb-5 '>Free Spins Symbols</p>
    <p className='text-xl font-semibold'>YES</p>
    </div>   
<div>
<p className='text-xl text-black-v3 mb-5'>Volatility:</p>
    <p className='text-xl font-semibold'>Medium to High</p>
    <p className='text-xl font-semibold'>Low(USA)</p>
    <p className='mt-20 text-xl text-black-v3 '>Game Theme</p>
    <p className='text-xl font-semibold mt-5'>Animals, Mythology, </p> 
    <p className='text-xl font-semibold mb-20'>Amazon Forest</p>
     <div className='font-semibold text-black flex gap-3.5 items-center bg-primary rounded-xl px-5 py-2.5 max-w-[147px]'>
    <p>Game Key</p>
    <img className='h-4 w-4 ' src={"/logos/filterarrowBlack.png"} alt="" />
    </div>
    
</div>


<div>
    <p className='text-xl text-black-v3 mb-5'>RTP</p>
    <p className='text-xl font-semibold'>Var_99     96.66%</p>
    <p className='text-xl font-semibold'>Var_99     96.66%</p>
    <p className='text-xl font-semibold'>Var_99     96.66%</p>
    <p className='text-xl font-semibold'>Var_99     96.66%</p>
    <p className='text-xl text-black-v3 mt-20 mb-6'>RTP  USA</p>
    <p className='text-xl font-semibold'>Var_99     96.66%</p>
    <p className='text-xl font-semibold'>Var_99     96.66%</p>
    <p className='text-xl font-semibold'>Var_99     96.66%</p>
    <p className='text-xl font-semibold'>Var_99     96.66%</p>
</div>

<div>
    <p className='text-xl text-black-v3 mb-4'>Special Features</p>
    <p className='text-xl font-semibold '>Unlock Feature</p>
    <p className='text-xl font-semibold '>Rewind Feature</p>
    <p className='text-xl font-semibold '> Hold N Spin</p>
    <p className='text-xl font-semibold '>Free Spins</p>
    <p className='text-xl font-semibold '> Buy Bonus – with 4 options</p>
    <p className='text-xl font-semibold '> Guaranteed Wild</p>
    <p className='text-xl font-semibold '>Expanding Wild</p>
    <p className='text-xl font-semibold '>Hold N Spin</p>
    <p className='text-xl font-semibold '>Free Spins</p>
    <p className='text-xl font-semibold '>Unlocking Spell</p>
    <p className='text-xl font-semibold '>Hold N Respin</p>

    </div>

    </div>    
</div>


<div className='bg-white-v2 rounded-3xl mt-24'>
    <h1 className='font-medium text-4xl px-48 py-20 text-center'>Download all necessary assets and certificates below</h1>
    <div className='flex gap-6 p-6'>
        <div className='py-5 rounded-xl bg-black-v5 w-full text-center font-semibold text-black-v3 text-lg'>Media Pack</div>
        <div className='py-5 rounded-xl  bg-black-v5 w-full text-center font-semibold text-black-v3 text-lg'>Game Sheet</div>
        <div className='py-5 rounded-xl  bg-black-v5 w-full text-center font-semibold text-black-v3 text-lg'>Game Rules</div>
        <div className='bg-black rounded-xl py-5 text-white text-center w-full font-semibold'>Certificates</div>
    </div>

    <div className='px-6'>
    <div className='flex justify-end gap-7 bg-white pt-14 rounded-lg pr-9'>
                        
                        <Buttons>
                            <div className='flex gap-2.5'>
                                <p className='font-semibold'>Download Selected</p>
                                <img className='h-4 w-4' src={"/logos/download.png"} alt="" />
                            </div>
                        </Buttons>
                        <Buttons>
                            <div className='flex gap-2.5'>
                                <p className='font-semibold'>Download All</p>
                                <img className='h-4 w-4' src={"/logos/download.png"} alt="" />
                            </div>
                        </Buttons>
                    </div> 
</div>
</div>



</div>

    </>
  )
}

export default DetailGame