import React from 'react'
import Buttons from '../utils/buttons'
import InputField from '../utils/InputFields'


function DashBoardHeader({options}) {
  return (
  <div className='container '>

<div className='flex py-16 gap-10 items-center'>
{options && <InputField type='select' options={options}/>}
<div className='flex gap-2 grow items-center rounded-xl border-2 border-black-v4 py-2 px-4'>
<img className='h-3.5 w-3.5' src={"/logos/Search.png"} alt="" />
<input type="text" className=' outline-none' placeholder='Keyword' />
</div>
<Buttons>Search</Buttons>
</div>
  </div>
  )
}

export default DashBoardHeader