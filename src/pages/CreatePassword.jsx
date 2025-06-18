import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Card from "../components/utils/card"
import apiHandler from "../functions/apiHandler";
import { ArrowLeft } from "lucide-react";
import InputField from "../components/utils/InputFields";
import Buttons from "../components/utils/buttons";
import OtpInput from "../components/utils/OTP";
import useGlobal from "../hooks/useGlobal";
import { validateEmail } from "../functions/emailValidator";
import SucessLogReg from "../components/utils/SucessLogReg";



const newPassField = [
    {
        label: "Create Password",
        id: "password",
        type: "password",
        placeholder: "Create Password",
    },
    {
        label: "Confirm Password",
        id: "ConfirmPassword",
        type: "password",
        placeholder: "Confirm Password",
    }
]

const CreatePassword = () => {
    const navigate = useNavigate()
    const { success, error, setUser, setMainLoader, disable, setDisable } = useGlobal();
    const [inputValues, setInputValues] = useState(null);
    const [items, setItems] = useState([])
    const [otpBlock, setOtpBlock] = useState(false)
    const [forgotToken, setForgotToken] = useState("")
    const [newPassword, setNewPassword] = useState(true)
    const [resend, setResend] = useState(false);
    const [showBtn, setShowBtn] = useState(true)

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");


    function handleInput(event) {

        setInputValues((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    useEffect(() => {
        setMainLoader(true)
        const token = localStorage.getItem('token')
        token && navigate("/dashboard");
        setMainLoader(false)

    }, [])

    const handleChangePassword = async () => {
        const { password, ConfirmPassword } = inputValues || {};

        if (!password || !ConfirmPassword) {
            error("Both password fields are required.");
            return;
        }

        if (password !== ConfirmPassword) {
            error("Passwords do not match.");
            return;
        }

        if (!token) {
            error("Invalid or missing token.");
            return;
        }

        try {
            setMainLoader(true);
            const { data } = await apiHandler.patch("/set-password",
                { password: inputValues?.password }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );

            success(data.message || "Password changed successfully.");
            setResend(true);
        } catch (err) {
            console.error("Password change error:", err);
            error(err.response?.data?.message || err.message);
        } finally {
            setMainLoader(false);
        }
    };



    const data = {
        head: "Your password has been changed. ",

    }


    return (
        <>
            <div className={` h-screen     `}>
                <div className="flex  ">
                    <div className="w-full bg-[url(/Images/login-back.png)] h-screen p-12  ">
                        <img className="w-[431px] h-[348px]" src="/logos/logo-black.png" alt="" />
                        <h1
                            className="text-black-v1 font-medium text-[56px] not-italic leading-none font-ot-sono pl-9 max-w-[544px] w-full">
                            Change Password
                        </h1>

                    </div>
                    <div className="w-full grid place-items-center ">
                        {resend ? <SucessLogReg data={data} showBtn={showBtn} type="loginBtn" /> :
                            <div className={`p-4 max-w-xl w-full`}




                            >


                                <h3 className='font-semibold text-2xl not-italic  mb-3'>Create New Password</h3>






                                <div className="py-4 space-y-4">
                                    {
                                        newPassField?.map((ele, index) => {
                                            return <InputField key={index} handleInputChange={handleInput} id={ele?.id} type={ele.type} value={inputValues?.[ele.id]} placeholder={ele.placeholder} />
                                        })
                                    }



                                    <div className="space-y-6">
                                        <Buttons spinner={false} onClick={
                                            handleChangePassword
                                        } big={true} className={"w-full mt-6 hover:bg-[black]"}>Change Password</Buttons>

                                    </div>
                                </div>

                                <div className="mt-6 mb-6 flex justify-start text-base text-gray-500 space-x-4">
                                    <Link to="/" className=" cursor-pointer">Login</Link>
                                    <span>|</span>
                                    <Link to="/sign-up" className=" cursor-pointer">Register</Link>

                                </div>

                                <Link
                                    to="/"
                                    className=" text-sm text-gray-600 w-full hover:underline cursor-pointer"
                                >
                                    <span className="mr-1">←</span> Back to Aristocrat Interactive
                                </Link>



                            </div>}
                    </div>

                </div>


            </div>
        </>
    )
}

export default CreatePassword
