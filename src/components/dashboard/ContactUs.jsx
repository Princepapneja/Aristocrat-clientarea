import React from 'react'
import InputField from '../utils/InputFields'
import Buttons from '../utils/buttons'
import search from "../../assets/Icons/search.png"
import email from "../../../public/logos/email.png"


function ContactUs() {
    let gameAssets =[
        {
            value:"Game Assets",
            selected: true,
            name:"Game Assets"
        }
    ]
  return (
    <>

     <div className='px-24'>

<div className='flex gap-10 mb-11 pb-36'>
<InputField type='select' options={gameAssets}/>
<div className='flex gap-2 grow items-center rounded-xl border-2 border-black-v4 py-2 px-4'>
<img className='h-3.5 w-3.5' src={search} alt="" />
<input type="text" className=' outline-none' placeholder='Keyword' />
</div>
<Buttons>Search</Buttons>
</div>

<div className='flex'>
<div>
    <p className='font-medium text-5xl mb-8'>Let’s start a conversation</p>
    <p className='text-2xl text-black-v3 mb-10'>Please feel free to contact us by any means below.We will answer you as soon as possible!</p>
<div className='flex border-2 border-primary-dark rounded-xl gap-2.5 items-center p-4'>
    <p className='text-primary-dark font-semibold'>support@aristocratinteractive.com</p>
    <img src={email} alt="" />
</div>
</div>

<div>

</div>

</div>
</div>
    </>
  )
}

export default ContactUs