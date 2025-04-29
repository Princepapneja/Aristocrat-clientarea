import React, { useState } from 'react'
import InputField from '../utils/InputFields'
import Buttons from '../utils/buttons'
import search from "../../assets/Icons/search.png"
import download from "../../assets/Icons/download.png"

function MasterGame() {

const[gameAssets, setGameAssets]=useState(
    [
        {
            value:"Game Assets",
            selected: true,
            name:"Game Assets"
        }
    ]
)    
  
const[gameLists, setGameLists]=useState(
    [
        {
            title:"Wizard Games Master Game List",
        }
    ]
)
  
return (
   <>
   <div className='px-24'>

<div className='flex gap-10 mb-11'>
<InputField type='select' options={gameAssets}/>
<div className='flex gap-2 grow items-center rounded-xl border-2 border-black-v4 py-2 px-4'>
<img className='h-3.5 w-3.5' src={search} alt="" />
<input type="text" className=' outline-none' placeholder='Keyword' />
</div>
<Buttons>Search</Buttons>
</div>

<h1 className='text-5xl font-medium'>Master Game List</h1>


<div className='mt-11'>
    <div className='border-b-1 border-black-v4'>
    <div className='flex bg-white-v2 gap-3 p-3 rounded-2xl mb-8 '>
        <div className='bg-black rounded-xl py-5 text-white text-center w-full font-semibold'>Aristocrat Interactive </div>
        <div className='py-5 rounded-xl bg-white w-full text-center font-semibold text-black-v3'>Ignite Sudios</div>
    </div></div>
   
   <div>
    <div className='flex items-center py-7 justify-between border-b-1 border-black-v4'>
        <div className='flex gap-6 '>
    <InputField type='checkbox'/>
    {gameLists?.map((item)=>{
        return(
        <p className='text-black-v3'>{item.title}</p>
        )
    })}</div>

<div>
    <Buttons>
    <div className='flex gap-2.5'>
   <p className='font-semibold'>Download</p> 
<img className='h-4 w-4' src={download} alt="" />
    </div>
</Buttons></div>
   </div>
   </div>
</div>


</div>
   </>
  )
}

export default MasterGame