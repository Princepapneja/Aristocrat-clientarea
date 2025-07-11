import { useEffect, useState } from 'react';
import useGlobal from '../hooks/useGlobal';
import { Outlet, useNavigate } from 'react-router-dom';
import apiHandler from '../functions/apiHandler';
import SideBar from '../components/header-footer/SideBar';
import DashBoardHeader from '../components/header-footer/dashBoardHeader';
import ChangePass from '../components/auth/ChangePass';
import Footer from '../components/header-footer/Footer';
import MobileMenu from '../components/header-footer/MobileMenu';

const DashboardLayout = () => {
  const context = useGlobal();
  const navigate = useNavigate();
  const { height, sideBarOpen, user, setUser, setCounts, token, render ,collapsed} = context;

  const fetchDetails = async () => {
    const { data } = await apiHandler.get("me");
    if (data?.data?.access === "blocked") {
      localStorage.removeItem("token");
      navigate("/");
    }
    setUser(data.data);
  };


  useEffect(() => {
    if (!token) return;
    fetchDetails();
  }, [token, render]);

  return (
    <div className="flex flex-col w-full lg:flex-row min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <div className={`hidden lg:block fixed top-0 left-0 h-full ${collapsed?"w-[80px]":"w-[240px]"} z-30`}>
        <SideBar />
      </div>

      {/* Mobile menu */}
      <div className="block lg:hidden w-full">
        <MobileMenu />
      </div>

      {/* Main content area */}
      <div className={`flex flex-col w-full   transition-all duration-300 ease-in-out ${collapsed?"lg:w-[calc(100vw-80px)] lg:ml-[80px] ":"lg:w-[calc(100vw-240px)] lg:ml-[230px]"}`}>


        <div className="hidden lg:block">
          <DashBoardHeader />
        </div>

        <div
          className={`main duration-500 ${sideBarOpen ? 'blur' : ''}`}
          style={{ minHeight: `calc(100vh - 280px)` }}
        >
          <div className="space-y-6">
            <Outlet context={context} />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;