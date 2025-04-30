import React, { useState } from 'react'
import InputField from '../utils/InputFields'
import { validateEmail } from '../../functions/emailValidator'
import filterArrow from '../../../public/logos/filterArrow.png'
import game from '../../../public/Images/game.png'
import GameCard from '../utils/GameCard'
import DashboardHeader from '../header-footer/dashBoardHeader'

function GamePage() {
     const [filters,setFilters]= useState(null)
const[studioOption, setStudioOption]= useState(
    [
        {
            value: "Studios",
            selected: true,
            name: "Studios"
        }
    ]
)    

const[regionOption, setRegionOption]= useState(
    [
        {
            value: "Region",
            selected: true,
            name: "Region"
        }
    ]
)

const[volatilityOption, setVolatilityOption]= useState(
    [
        {
            value: "Volatility",
            selected: true,
            name: "Volatility"
        }
    ]
)
const[themeOption, setThemeOption]= useState(
    [
        {value: "Theme",
        selected: true,
        name: "Theme"
    }
    ]
)
const[featuresOption, setFeaturesOption]= useState(
    [
        {value: "Features",
        selected: true,
        name: "Features"
    }
    ]
)

const[familyOption, setFamilyOption]= useState(
    [
        {value: "Family",
        selected: true,
        name: "Family"
    }
    ]
)
const[gameTypeOption, setGameTypeOption]= useState(
    [
        {value: "Gametype",
        selected: true,
        name: "Game Type"
    }
    ]
)
const[jackpotOption, setJackpotOption]= useState(
    [
        {value: "Jackpot",
        selected: true,
        name: "Jackpots"
    }
    ]
)
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
        {
            image: game,
            title:"Fortune Tree Of Wealth",
            by:"Studio Name",
            date:"04 March"
                    },
                    {
                        image: game,
                        title:"Fortune Tree Of Wealth",
                        by:"Studio Name",
                        date:"04 March"
                                },
                                {
                                    image: game,
                                    title:"Fortune Tree Of Wealth",
                                    by:"Studio Name",
                                    date:"04 March"
                                            },
                                            {
                                                image: game,
                                                title:"Fortune Tree Of Wealth",
                                                by:"Studio Name",
                                                date:"04 March"
                                                        },
    ])


  return (
    <>
    <div className='container pt-16 pb-24 space-y-16'>
<DashboardHeader/>

<div className='space-y-5'>
<div className='grid grid-cols-4 gap-10'>
<InputField type='select' id="studios" options={studioOption} />
<InputField type='select' id="studios" options={regionOption} />
<InputField type='select' id="studios" options={volatilityOption} />
<InputField type='select' id="studios" options={themeOption} />
</div>
<div className='grid grid-cols-4 gap-10'>
<InputField type='select' id="studios" options={featuresOption} />
<InputField type='select' id="studios" options={familyOption} />
<InputField type='select' id="studios" options={gameTypeOption} />
<InputField type='select' id="studios" options={jackpotOption} />
</div>
</div>

<div>

 <div className='flex justify-between items-center mb-20'>
                    <div className='flex gap-5'>
                        {filters && Object.values(filters)?.map((filter) => {
                            return (
                                <div className='flex items-center gap-3 py-2.5 px-3.5 border-2 border-black-v4 rounded-xl'>
                                    <p className='text-sm text-black-v3'>{filter}</p>
                                    <button onClick={()=>{clearFilter(filter)}}>

                                    <img className='w-2 h-2' src={cross} alt="" />
                                    </button>

                                </div>
                            )
                        })}
                    </div>
                    <div className='flex gap-10'>
                        <div className='font-semibold text-primary-dark flex gap-3.5 items-center bg-white-v2 rounded-xl px-5 py-2.5'>
                            <p>View All Chosen Filters</p>
                            <img className='h-4 w-4' src={filterArrow} alt="" />
                        </div>
                        <button onClick={()=>{setFilters(null)}} className='font-semibold text-black-v4'>
                            Clear All
                        </button>
                    </div>
                </div>

<div className='grid grid-cols-4 gap-x-10 gap-y-16'>
{games.map((item)=>{
    return(
        <GameCard gameImage={item.image} title={item.title} by={item.by} date={item.date} />
    )
})}
</div>
</div>


    </div>
    </>
  )
}

export default GamePage