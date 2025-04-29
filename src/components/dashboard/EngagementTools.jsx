import React, { useState } from 'react'
import InputField from '../utils/InputFields'
import Buttons from '../utils/buttons'
import search from "../../../public/logos/search.png"
import trophy from '../../../public/Images/trophy.png'
import screen from '../../../public/Images/screen.png'

function EngagementTools() {
    const[gameAssets, setGameAssets]=useState(
        [
            {
                value:"Game Assets",
                selected: true,
                name:"Game Assets"
            }
        ]
    )   
  return (
    <>
    <div className='px-24 pt-16 pb-6'>
    <div className='flex gap-10 mb-11'>
<InputField type='select' options={gameAssets}/>
<div className='flex gap-2 grow items-center rounded-xl border-2 border-black-v4 py-2 px-4'>
<img className='h-3.5 w-3.5' src={search} alt="" />
<input type="text" className=' outline-none' placeholder='Keyword' />
</div>
<Buttons>Search</Buttons>
</div>
<div className='space-y-12'>
<h1 className='text-5xl font-medium'>Engagement Tools</h1>
<div className='space-y-5'>
    <p className='text-lg text-black-v3 max-w-[1111px]'>
    We are committed to delivering the highest performance results for our partners, combining endless entertainment with the most effective 
    data-driven features.
    </p>
    <p className='text-lg text-black-v3 max-w-[1159px]'>
    That is why, along with our attractive set of games, we provide a variety of powerful engagement tools, specifically designed for seamless use and integration, to maximize your attraction and retention rates.
    </p>
</div>
<div className='space-y-2.5'>
<div className='flex bg-white-v2 gap-3 p-3 rounded-2xl '>
        <div className='bg-black rounded-xl py-5 text-white text-center w-full font-semibold'>Tournaments </div>
        <div className='py-5 rounded-xl bg-white w-full text-center font-semibold text-black-v3'>Free Spins</div>
        <div className='py-5 rounded-xl bg-white w-full text-center font-semibold text-black-v3'>Spin That Wheel™</div>
        <div className='py-5 rounded-xl bg-white w-full text-center font-semibold text-black-v3'>Raffle Rocket</div>
    </div>
    <div className='bg-white-v2 rounded-3xl flex gap-28 p-20  '>
<div className='space-y-11'>
<img src={trophy} className='h-28 w-60' alt="" />
<div className='space-y-5'>
    <p className='max-w-[408px] text-lg text-black-v3'>
    Summon your players for enticing competitions!
    Set up tournaments effortlessly, selecting players, games, timing, conditions, and rewards with total flexibility.
    </p>
    <p className='max-w-[408px] text-lg text-black-v3'>
    Leader boards are displayed in-game, providing another edge, as players can track their progress as they battle their way to the top.
    </p>
</div>
</div>
<div>
<img src={screen} className='h-[445px] w-[683px]' alt="" />
</div>
    </div>


</div>
</div>
    </div>
    </>
  )
}

export default EngagementTools