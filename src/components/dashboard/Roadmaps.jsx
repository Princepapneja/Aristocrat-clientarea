import React, { useEffect, useState } from 'react'
import GameCard from '../utils/GameCard'
import InputField from '../utils/InputFields'
import ActiveButtons from '../utils/ActiveButtons'
import DashboardHeader from '../header-footer/dashBoardHeader'
import apiHandler from '../../functions/apiHandler'
function Roadmaps() {
    const [activeStudio,setActiveStudio]= useState(0)
    const [activeYear,setActiveYear]= useState(0)
    const [selectedRegions,setSelectedRegions]= useState([])
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
 
    const [games,setGames] = useState([])

    const [activeButtons,setActiveButtons]= useState([
        {
            name:'Aristocrat Interactive'
        },
        {
            name:'Ignite Sudios'
        },
        {
            name:'All Roadmap Downloads'
        }
    ])
const fetchGame=async()=>{
    let url=`games/by-country?studioId=${activeStudio + 1}`
    
    if(selectedRegions?.length>0){
url+= `&countryId=${selectedRegions?.join(",")}`
    }
    if(activeYear>0){
        url+=`&month=${activeYear}`
    }
    try {
        const {data}= await apiHandler.get(url)
        setGames(data?.data?.resp)
    } catch (error) {
        
    }
}
useEffect(()=>{
    fetchGame()
},[activeStudio,activeYear])
  return (
   
   <>
   <div className='container'>
   <div>
<div className='space-y-11'>

<h1 className='text-5xl font-medium'>Roadmaps</h1>


    <div className=' mb-8 '>
    <ActiveButtons active={activeStudio} className={"grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F4F4F4]"} setActive={setActiveStudio} buttons={activeButtons} />
    </div>

    </div>

   <div className='flex gap-10 flex-col md:flex-row justify-between items-center mb-5 w-full'>
<div className='flex gap-3.5 items-center'>
<img src={"/Images/uk.jpg"} className='h-12 w-12 rounded-full' alt="" />
<p className='text-3xl font-medium'>United Kingdom</p>
</div>
<div className='w-70'>
    <InputField type='selects' options={regions} id='region'
                       />
</div>
</div>
 
<div className='mb-14'>
    <ActiveButtons active={activeYear} setActive={setActiveYear} type="roadmap" buttons={months}   />
</div>
<div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-10'>
{games.map((item)=>{
    return(
        <GameCard game={item} />
    )
})}
</div>
</div>
</div>
   </>
  )
}
 
export default Roadmaps