import React from 'react'
import Buttons from '../utils/buttons'
import InputField from '../utils/InputFields'


function DashBoardHeader({options,openSearch}) {
  return (
  <div className='container'>
    {
      openSearch&&(
        <p className='text-3xl  mt-4 mb-4 lg:mt-10 text-center font-medium'>Search Client Area</p>

      )
    }
        

<div className='flex flex-col lg:flex-row my-8 lg:my-16 gap-10 items-center'>
<InputField type='select' className="lg:max-w-[300px] " options={options}/>
<div className='flex gap-2 grow items-center rounded-xl border-2 border-black-v4 py-2 px-4 w-full'>
<img className='h-3.5 w-3.5' src={"/logos/Search.png"} alt="" />
<input type="text" className='outline-none' placeholder='Keyword' />
</div>
<Buttons className=" md:w-full">Search</Buttons>
</div>
  </div>
  )
}

export default DashBoardHeader