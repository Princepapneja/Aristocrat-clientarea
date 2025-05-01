import React, { useState } from 'react'
import DashboardHeader from '../header-footer/dashBoardHeader'
import ActiveButtons from '../utils/ActiveButtons'
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
    
    const [activeButtons,setActiveButtons] = useState([
        {
            name:'Tournaments'
        },
        {
            name:'Free Spins'
        },
        {
            name:'Spin That Wheel™'
        },
        {
            name:'Raffle Rocket'
        },
    ])
  return (
    <>
    <div className='container pt-16 pb-6'>
    <div className=' mb-11'>
    <DashboardHeader options={gameAssets}/>
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
<ActiveButtons buttons={activeButtons} type='activePage' />
    <div className='bg-white-v2 rounded-3xl flex gap-28 p-20  '>
<div className='space-y-11'>
<img src={'/Images/trophy.png'} className='h-28 w-60' alt="" />
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
<img src={'/Images/screen.png'} className='h-[445px] w-[683px]' alt="" />
</div>
    </div>


</div>
</div>
    </div>
    </>
  )
}

export default EngagementTools