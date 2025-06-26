import { useState } from "react";
import {
  Home,
  CalendarCheck,
  BadgeCheck,
  ListOrdered,
  Map,
  Puzzle,
  Phone,
  LogOut,
  Layers,
  Menu,
  Search,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { menu } from "./SideBar";
import Logo from '../../assets/logos/mobileLogo.png'
import DashBoardHeader from "./dashBoardHeader";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };



  return (
    <>
      <div className="lg:hidden flex items-center justify-between p-2 bg-white  z-40 relative  box-border">
        <img
          src={Logo} 
          alt="Logo"
          className="max-w-40 bg-center "
        />

     
        <div className="flex items-center gap-6" >
          
          {
            openSearch?  "":<Search className="w-7 h-7 text-black"  onClick={() => setOpenSearch(true)}/>
          
          
          }
          

          {
            openSearch?  <button onClick={() => setOpenSearch(false)} className="border p-1 rounded-xl">
              <X className="w-9 h-9" />
            </button>: 
             <button
            onClick={() => setOpen(true)}
            className="p-2 border border-black rounded-xl hover:bg-gray-100 transition"
          >
            <Menu className="w-9 h-9 text-black" />
          </button>
          }
         
        </div>
      </div>

      {open && (
        <div className="fixed top-0 inset-0 z-50 md:hidden bg-[url(/Images/sidebar.png)] bg-center bg-cover text-black   transition-all">
          <div className="flex justify-between items-center p-4">
            <img src="/logos/logo-black.png" alt="Logo" className="w-40" />
            <button onClick={() => setOpen(false)} className="border p-1 rounded-xl">
              <X className="w-9 h-9" />
            </button>
          </div>

          <nav className="mt-6 px-6 space-y-5 pb-10">
            {menu.map((item, index) => {
              if (item.type === "button") {
                return (
                  <button
                    key={index}
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 text-lg font-semibold hover:opacity-80"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>
                );
              }

              return (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-lg font-semibold hover:opacity-80"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              );
            })}
          </nav>
        </div>
        
      )}
      {openSearch && (
        <div className="">
  <DashBoardHeader openSearch={openSearch}/>
      </div>

      )

      }
      
    
    </>
  );
};

export default MobileMenu;
