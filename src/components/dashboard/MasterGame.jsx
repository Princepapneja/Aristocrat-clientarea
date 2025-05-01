import React, { useState } from 'react'
import InputField from '../utils/InputFields'
import Buttons from '../utils/buttons'
import DashboardHeader from '../header-footer/dashBoardHeader'
import ActiveButtons from '../utils/ActiveButtons'
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

const [activeButtons,setActiveButtons] = useState([
    {
        name:'Aristocrat Interactive'
    },
    {
        name:'Ignite Sudios'
    }
])
  
return (
   <>
   <div className='container'>

<div className='mb-11'>
<DashboardHeader options={gameAssets}/>
</div>

<h1 className='text-5xl font-medium'>Master Game List</h1>


<div className='mt-11'>
    <div className='border-b-1 border-black-v4'>
        <div className='mb-8 '>
<ActiveButtons buttons={activeButtons} type='activePage' />
        </div>
    </div>
   
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
<img className='h-4 w-4' src={'/logos/download.png'} alt="" />
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