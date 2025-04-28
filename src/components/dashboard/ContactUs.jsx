import React, { useState } from 'react'
import InputField from '../utils/InputFields'
import Buttons from '../utils/buttons'
import search from "../../assets/Icons/search.png"
import email from "../../../public/logos/email.png"


function ContactUs() {
    const [inputDetails,setInputDetails] = useState({})
    const[gameAssets, setGameAssets]=useState(
        [
            {
                value:"Game Assets",
                selected: true,
                name:"Game Assets"
            }
        ]
    )  
  
    const handleInputs = (e)=>{
     let a = {...inputDetails , 
        [e.target.id]: e.target.value
     }
     setInputDetails(a)
     console.log(a)
    }

    const[inputs, setInputs]= useState(
        [
            {
                type:"text",
                placeholder:"First Name",
                id: "first_name",
            },
            {
                type:"email",
                placeholder:"Email",
                id: "email"
            },
            {
                type:"text",
                placeholder:"Last Name",
                id: "last_name"
            },
            {
                type:"select",
                id: "company",
                options:[
                    {
                        value: "Company",
                        selected: true,
                        name: "Company"
                    }
                ]
            },{
                type:"textarea",
                id: "comment",
                placeholder: "comment"
            }


        ]
    )
  return (
    <>

     <div className='px-24'>

<div className='flex gap-10 mb-36 '>
<InputField type='select' options={gameAssets}/>
<div className='flex gap-2 grow items-center rounded-xl border-2 border-black-v4 py-2 px-4'>
<img className='h-3.5 w-3.5' src={search} alt="" />
<input type="text" className=' outline-none' placeholder='Keyword' />
</div>
<Buttons>Search</Buttons>
</div>

<div className='grid grid-cols-2 gap-20'>
<div>
    <p className='font-medium text-5xl'>Let’s start </p>
    <p className='font-medium text-5xl mb-8'> a conversation</p>
    <p className='text-2xl text-black-v3 mb-10'>Please feel free to contact us by any means below.We will answer you as soon as possible!</p>
<div className='flex border-2 border-primary-dark rounded-xl gap-2.5 items-center p-4 max-w-80'>
    <p className='text-primary-dark font-semibold'>support@aristocratinteractive.com</p>
    <img src={email} alt="" />
</div>
</div>
<div>
<div className='space-y-6 mb-10'>
{inputs?.map((item)=>{
    return(
        <InputField type={item?.type} placeholder={item?.placeholder} id={item?.id} options={item?.options} handleInputChange={handleInputs}/>
    )
})}
</div>
<div>
<Buttons>Send</Buttons>
</div>
</div>
</div>
</div>
    </>
  )
}

export default ContactUs