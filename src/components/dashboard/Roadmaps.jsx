import React, { useState } from 'react'
import GameCard from '../utils/GameCard'
import ukFlag from '../../../public/Images/uk.jpg'
import game from '../../../public/Images/game.png'
import InputField from '../utils/InputFields'
import ActiveButtons from '../utils/ActiveButtons'
import search from "../../../public/logos/search.png"
import Buttons from '../utils/buttons'
function Roadmaps() {
    const [regions,setRegions]  = useState([
        {
            name:"Region",
            selected:true,
            disable:true
        }
    ])
        const[gameAssets, setGameAssets]=useState(
            [
                {
                    value:"Game Assets",
                    selected: true,
                    name:"Game Assets"
                }
            ]
        )
 
    const [months,setMonths] = useState([
        {
            name:'All',
        },
        {
            name:'Jan'
        },
        {
            name:'Feb'
        },
        {
            name:'Mar'
        },
        {
            name:'Apr'
        },
        {
            name:'May'
        },
        {
            name:'Jun'
        },
        {
            name:'Jul'
        },
        {
            name:'Aug'
        },
        {
            name:'Sep'
        },
        {
            name:'Oct'
        },
        {
            name:'Nov'
        },
        {
            name:'Dec'
        }
    ])
 
    const [games,setGames] = useState([
        {
image: game,
title:"Wolf Riches Hold N Spin",
by:"Studio Name",
date:"05 January"
        },
        {
            image: game,
            title:"Chicken Burst",
            by:"Studio Name",
            date:"13 February"
                    },
        {
image: game,
title:"Fortune Tree Of Wealth",
by:"Studio Name",
date:"04 March"
        },
    
        {
image: game,
title:"Cards Fortune",
by:"Studio Name",
date:"17 April"
        },
    ])
  return (
   
   <>
   <div className='px-24'>
<div className='space-y-11'>
<div className='flex gap-10 '>
<InputField type='select' options={gameAssets}/>
<div className='flex gap-2 grow items-center rounded-xl border-2 border-black-v4 py-2 px-4'>
<img className='h-3.5 w-3.5' src={search} alt="" />
<input type="text" className=' outline-none' placeholder='Keyword' />
</div>
<Buttons>Search</Buttons>
</div>

<h1 className='text-5xl font-medium'>Roadmaps</h1>


    <div className='flex bg-white-v2 gap-3 p-3 rounded-2xl mb-8 '>
        <div className='bg-black rounded-xl py-5 text-white text-center w-full font-semibold'>Aristocrat Interactive </div>
        <div className='py-5 rounded-xl bg-white w-full text-center font-semibold text-black-v3'>Ignite Sudios</div>
        <div className='py-5 rounded-xl bg-white w-full text-center font-semibold text-black-v3'>All Roadmap Downloads</div>
    </div>

    </div>

   <div className='flex justify-between items-center mb-5'>
<div className='flex gap-3.5 items-center'>
<img src={ukFlag} className='h-12 w-12 rounded-full' alt="" />
<p className='text-3xl font-medium'>United Kingdom</p>
</div>
<div>
    <InputField type='select' options={regions}/>
</div>
</div>
 
<div className='mb-14'>
    <ActiveButtons buttons={months} />
</div>
<div className='grid grid-cols-4'>
{games.map((item)=>{
    return(
        <GameCard gameImage={item.image} title={item.title} by={item.by} date={item.date} />
    )
})}
</div>
</div>
   </>
  )
}
 
export default Roadmaps