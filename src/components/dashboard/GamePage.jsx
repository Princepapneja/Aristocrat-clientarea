import React, { useState } from 'react'
import Buttons from '../utils/buttons'
// import search from "../../assets/Icons/search.png"
import InputField from '../utils/InputFields'
import { validateEmail } from '../../functions/emailValidator'

function GamePage() {
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


  return (
    <>
    <div className='px-24 pt-16 pb-24 space-y-16'>
    <div className='flex gap-10 '>
<div className='flex gap-2 grow items-center rounded-xl border-2 border-black-v4 py-2 px-4'>
{/* <img className='h-3.5 w-3.5' src={search} alt="" /> */}
<input type="text" className=' outline-none' placeholder='Keyword' />
</div>
<Buttons>Search</Buttons>
</div>

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

</div>


    </div>
    </>
  )
}

export default GamePage