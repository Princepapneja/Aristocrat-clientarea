// src/layout/AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="h-screen flex">
      <div className="w-full bg-[url(/Images/login-back.png)] h-screen p-12">
        <img className="w-[431px] h-[348px]" src="/logos/logo-black.png" alt="logo" />
        <h1 className="text-black-v1 font-medium text-[56px] not-italic leading-none font-ot-sono pl-9 max-w-[544px] w-full">
          Log in to
          Aristocrat Interactive
          Client Area
        </h1>
      </div>

      {/* Right side form container */}
      <div className="w-full grid place-items-center">
        <div className="p-4 max-w-xl w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
