import React, { useState } from 'react'
import InputField from '../utils/InputFields'
import Buttons from '../utils/buttons'
import DashboardHeader from '../header-footer/dashBoardHeader'

function ContactUs() {
    const [inputDetails, setInputDetails] = useState({})
    const [gameAssets, setGameAssets] = useState(
        [
            {
                value: "Game Assets",
                selected: true,
                name: "Game Assets"
            }
        ]
    )

    const handleInputs = (e) => {
        let a = {
            ...inputDetails,
            [e.target.id]: e.target.value
        }
        setInputDetails(a)
        console.log(a)
    }

    const [inputs, setInputs] = useState(
        [
            {
                type: "text",
                placeholder: "First Name",
                id: "first_name",
            },
            {
                type: "email",
                placeholder: "Email",
                id: "email"
            },
            {
                type: "text",
                placeholder: "Last Name",
                id: "last_name"
            },
            {
                type: "select",
                id: "company",
                options: [
                    {
                        value: "Company",
                        selected: true,
                        name: "Company"
                    }
                ]
            }, {
                type: "textarea",
                id: "comment",
                placeholder: "comment"
            }


        ]
    )
    return (
        <>
            <div className=''>
                <div className=''>
                    <div className='space-y-7'>
                        <p className='font-medium text-5xl mt-10'>Support </p>
                        <div className='space-y-5 '>

                        <p className=' text-black-v3 text-2xl mt-8 font-normal'>Dear</p>
                        <p className=' text-black-v3 text-2xl mt-8 font-normal w-full'>If you are encountering any difficulties with our products, are unable to locate a specific document or asset, or would like further information about a particular game, please contact us at   <a href="mailto:support@aristocratinteractive.com" className='break-all w-100 cursor-pointer font-semibold text-primary-dark underline'>support@aristocratinteractive.com</a>. A member of our team will respond to your inquiry as promptly as possible.</p>
                        <p className=' text-black-v3 text-2xl mt-8 font-normal'>Thank you</p>
                        <p className=' text-black-v3 text-2xl mt-8 font-normal'>Use the button below for a quicker way to reach us!</p>
                        </div>

                        <Buttons  className={"flex items-center gap-2 mt-20 mb-25 "} >
                            <span className=' font-normal  text-lg '>support@aristocratinteractive.com</span>
                            <img src={'/logos/email.svg'} alt="" className='w-5' />
                        </Buttons>

                    </div>
                    {/* <div>
                        <div className='space-y-6 mb-10'>
                            {inputs?.map((item) => {
                                return (
                                    <InputField type={item?.type} placeholder={item?.placeholder} id={item?.id} options={item?.options} handleInputChange={handleInputs} />
                                )
                            })}
                        </div>
                        <Buttons big={true}>Send</Buttons>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default ContactUs