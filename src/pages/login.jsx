import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/utils/card";
import apiHandler from "../functions/apiHandler";
import { ArrowLeft } from "lucide-react";
import InputField from "../components/utils/InputFields";
import Buttons from "../components/utils/buttons";
import OtpInput from "../components/utils/OTP";
import useGlobal from "../hooks/useGlobal";
import { validateEmail } from "../functions/emailValidator";

const loginInput = [
  {
    label: "Email Address",
    id: "email",
    type: "text",
    placeholder: "Enter your email",
  },
  {
    label: "Password",
    id: "password",
    type: "password",
    placeholder: "Password",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const { success, error, setUser, setMainLoader, disable, setDisable } = useGlobal();
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [items, setItems] = useState([]);
  const [otpBlock, setOtpBlock] = useState(false);
  const [forgotToken, setForgotToken] = useState("");

  function handleInput(event) {
    setInputValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  useEffect(() => {
    setMainLoader(true);
    setItems(loginInput);
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
    setMainLoader(false);
  }, []);

  const handleLogin = async () => {
    const { email, password } = inputValues;

    if (!email || !password) {
      error("Both email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      error("Please enter a valid email address.");
      return;
    }

    try {
      setMainLoader(true);
      const { data } = await apiHandler.post("/login", inputValues);

      if (data?.data?.user?.access === "blocked" || data?.data?.user?.access === "pending") {
        navigate("/");
        error("Your account has been blocked. Please contact us for more information.");
        return;
      }
      localStorage.setItem("token", data.data.accessToken);
      setUser(data.admin);
      setInputValues(null);
      success(data.message);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error during login:", err);
      error(err.message);
    } finally {
      setMainLoader(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Left side - Background and Heading */}
      <div className="w-full min-h-[200px] bg-[url('/Images/login-back.png')]  bg-center sm:p-2 lg:p-12 flex flex-col justify-center">
        <img
          className="md:max-w-96 max-w-48 w-full"
          src="/logos/logo-black.png"
          alt="Logo"
        />
        <h1 className="text-black-v1 font-medium text-[30px] sm:text-[56px] lg:text-[56px] not-italic leading-tight font-ot-sono  pl-4 sm:pl-4 lg:pl-9">
          Log in to Aristocrat Interactive Client Area
        </h1>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full flex justify-center items-center px-4 py-8 sm:px-6 lg:px-12">
        <div className="w-full max-w-xl">
          <h3 className="font-semibold text-2xl  mb-3">Log in to Our Client Area</h3>

         <div className="py-4 space-y-4">
                    {
                      items?.map((ele, index) => {
                        return <InputField key={index} handleInputChange={handleInput} id={ele?.id}  type={ele.type} value={inputValues?.[ele.id]} placeholder={ele.placeholder} />
                      })
                    }

                          <label className="flex items-start gap-3 lg:px-5 mt-10 mb-10">
                                            <input
                                                type="checkbox"
                                                name="consent"
                                                className="mt-1 border border-[#A8A8A8] w-5 h-5 bg-white checked:bg-[#00B290] appearance-none
        checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold
        checked:after:flex checked:after:justify-center checked:after:items-center"
                                            />
                                            <span>
                                               Remember Me
                                            </span>
                                        </label>
                    <div className="space-y-6">
                      <Buttons spinner={false} onClick={ 
                        handleLogin
                      } big={true} className={"w-full hover:bg-[black]"}>{ "Log in" }</Buttons>
                      <Buttons spinner={false} onClick={()=>navigate("/sign-up")} big={true} type="border" className={"w-full hover:bg-[#00B2901A]"}>{ "Create an Account" }</Buttons>
                      
                    </div>
                  </div>
                      <Link to="/forgot-password" className="capitalize mt-4 underline block cursor-pointer">
                        forgot your password?
                      </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
