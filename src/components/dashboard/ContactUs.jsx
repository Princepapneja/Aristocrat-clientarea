import React, { useState } from 'react'
import InputField from '../utils/InputFields'
import Buttons from '../utils/buttons'
import DashboardHeader from '../header-footer/dashBoardHeader'

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

     <div className='container'>

<div className=' mb-36 '>
<DashboardHeader options={gameAssets}/>
</div>

<div className='grid grid-cols-2 gap-20'>
<div>
    <p className='font-medium text-5xl'>Let’s start </p>
    <p className='font-medium text-5xl mb-8'> a conversation</p>
    <p className='text-2xl text-black-v3 mb-10'>Please feel free to contact us by any means below.We will answer you as soon as possible!</p>
<div className='flex border-2 border-primary-dark rounded-xl gap-2.5 items-center p-4 max-w-80'>
    <p className='text-primary-dark font-semibold'>support@aristocratinteractive.com</p>
    <img src={'/logos/email.png'} alt="" />
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

<Buttons>Send</Buttons>

</div>
</div>
</div>
    </>
  )
}

export default ContactUs