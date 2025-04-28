import React from 'react'
import rightArrow from "../../assets/Icons/rightArrow.png"
import InputField from '../utils/InputFields'
import cross from '../../assets/Icons/cross.png'
import filterArrow from "../../assets/Icons/filterArrow.png"
import download from "../../assets/Icons/download.png"
import gameIcon from "../../assets/Icons/gameIcon.png"
import search from "../../assets/Icons/Search.png"
import Buttons from '../utils/buttons'

function Test() {

    let certificateSelect=[
        {
            value:"Certificates",
            selected:true,
            name:"Certificates"
        }
    ]

    let studioOption=[
        {
            value:"Studios",
            selected: true,
            name:"Studios"
        }
    ]
    let regionOption=[
        {
            value:"Region",
            selected: true,
            name:"Region"
        }
    ]
    let gameTitleOption=[
        {
            value:"GameTitle",
            selected: true,
            name:"Game Title"
        }
    ]
    let certificatesOption=[
        {
            value:"Certificates",
            selected: true,
            name:"Certificates"
        }
    ]

    let chosenFilters = [
        {
            name:"Aristocrat Interactive",
        },
        {
            name:"Germany",
        },
        {
            name:"Medium",
        },
        {
            name:"Video Slot",
        },
    ]

    let gamesList=[
        {
            icon:gameIcon,
            title:"Amun Ra King Of The Gods...",
            by:"Studio Name"
        },
        {
            icon:gameIcon,
            title:"Amun Ra King Of The Gods...",
            by:"Studio Name"
        },
        {
            icon:gameIcon,
            title:"Amun Ra King Of The Gods...",
            by:"Studio Name"
        }
    ]

  return (
    <>



    <div className='px-24'>

    <div className='flex gap-10 mb-11'>
<InputField type='select' options={certificateSelect}/>
<div className='flex gap-2 grow items-center rounded-xl border-2 border-black-v4 py-2 px-4'>
<img className='h-3.5 w-3.5' src={search} alt="" />
<input type="text" className=' outline-none' placeholder='Keyword' />
</div>
<Buttons>Search</Buttons>
    </div>

        {/*  section */}
        <div className='flex justify-between pb-14'>
    <h1 className='text-5xl font-medium'>Certificates</h1>
<div className='flex gap-2.5 py-2.5 px-4  border-2 border-black-v4 rounded-xl'>
    <p className='text-center font-medium'>Go to Game Assets</p>
<img className='h-5 w-5' src={rightArrow} alt="" />
</div>
        </div>
{/*  section */}


        {/* section */}
            <div className='flex gap-10 pb-11'>
<InputField type='select' id="studios" options={studioOption} />
<InputField type='select' id="studios" options={regionOption} />
<InputField type='select' id="studios" options={certificatesOption} />
<InputField type='select' id="studios" options={gameTitleOption} />
            </div>
            {/* section */}

{/*  section */}
<div className='flex justify-between items-center pb-14'>
<div className='flex gap-5'>
    {chosenFilters?.map((filter)=>{
        return(
            <div className='flex items-center gap-3 py-2.5 px-3.5 border-2 border-black-v4 rounded-xl'>
              <p className='text-sm text-black-v3'>{filter.name}</p>
              <img className='w-2 h-2' src={cross} alt="" />  
            </div>
        )
    })}
</div>
<div className='flex gap-10'>
<div className='font-semibold text-primary-dark flex gap-3.5 items-center bg-white-v2 rounded-xl px-5 py-2.5'>
<p>View All Chosen Filters</p>
<img className='h-4 w-4' src={filterArrow} alt="" />
</div>
<div className='font-semibold text-black-v4'>
Clear All
</div>
</div>
</div>  
{/*  section */}

{/*  cards */}
<div className='bg-white-v2 px-7 pt-8 pb-1 space-y-8 rounded-t-3xl '>

{/*  button */}
<div className='flex justify-end '>
<Buttons>
    <div className='flex gap-2.5'>
   <p className='font-semibold'>Download All</p> 
<img className='h-4 w-4' src={download} alt="" />
    </div>
</Buttons>
</div>
{/*  button */}

<div>
    {gamesList?.map((game)=>{
        return(
            <div className='flex justify-between items-center bg-white-v1 px-8 pb-8  mb-9  rounded-lg'>
                <div className='flex gap-14 items-center'>
<InputField type='checkbox'/>
<img className='w-44 h-28' src={game.icon} alt="" />
<div>
    <div className='bg-black-v2 text-white-v1 px-3 py-1.5 rounded-b-xl mb-7 max-w-56'>
<p>United Kingdom Certificate</p>
    </div>
    <p className='text-3xl font-medium pb-1'>{game.title}</p>
    <p className=''>By: {game.by}</p>
</div>
</div>
<Buttons>
    <div className='flex gap-2.5'>
   <p className='font-semibold'>Download</p> 
<img className='h-4 w-4' src={download} alt="" />
    </div>
</Buttons>

            </div>
        )
    })}
</div>

</div>
{/*  cards */}

    </div>
    </>
  )
}

export default Test