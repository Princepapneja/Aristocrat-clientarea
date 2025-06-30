import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useGlobal from '../../hooks/useGlobal';
import {
  Home,
  CalendarCheck,
  BadgeCheck,
  ListOrdered,
  Map,
  Puzzle,
  Phone,
  LogOut,
  ChevronDown,
  Layers,
  ChevronLeft,
} from 'lucide-react';
import SideLogo from '../../assets/logos/sideBarLogo.png';

export const menu = [
  { name: 'Home', icon: <Home />, href: '/dashboard' },
  { name: 'Games', icon: <CalendarCheck />, href: '/dashboard/games' },
  { name: 'Game Assets', icon: <Layers />, href: '/dashboard/game-assets' },
  { name: 'Certificates', icon: <BadgeCheck />, href: '/dashboard/certificates' },
  { name: 'Master Game List', icon: <ListOrdered />, href: '/dashboard/master-game-list' },
  { name: 'Roadmaps', icon: <Map />, href: '/dashboard/roadmaps' },
  { name: 'Engagement Tools', icon: <Puzzle />, href: '/dashboard/engagement-tools' },
  { name: 'Support', icon: <Phone />, href: '/dashboard/support' },
  { name: 'Logout', icon: <LogOut />, type: 'button' },
];

const SideBar = () => {
  const [open, setOpen] = useState(null);
  const { sideBarOpen, setSideBarOpen, height, navigate } = useGlobal();
  const { collapsed, setCollapsed } = useGlobal();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        style={{
          top: `${height}px`,
          height: `calc(100vh - ${height}px)`,
          width: collapsed ? '80px' : '230px',
        }}
        className={`
          fixed ${sideBarOpen ? 'left-0' : '-left-full'}
          z-10 duration-300 md:static md:!h-screen grid items-stretch
          bg-white shadow-lg bg-[url(/Images/sidebar.png)] bg-cover bg-no-repeat bg-left-top p-4
          transition-all ease-in-out
        `}
      >
        <div>
          {/* Logo */}
          <div className="grid place-items-center">
            {collapsed ? (
              <img src={SideLogo} alt="Logo" />
            ) : (
              <img src="/logos/logo-black.png" alt="Logo" className="w-36 " />
            )}
          </div>

          {/* Menu */}
          <div className="mt-4 md:mt-8 overflow-y-auto h-[calc(100vh-140px)] space-y-2">
            {menu.map((item, index) => {
              const isActive = location.pathname === item.href;

              if (item.type === 'button') {
                return (
                  <button
                    key={index}
                    onClick={handleLogout}
                    className={`capitalize w-full text-left whitespace-nowrap duration-300 ${
                      isActive ? 'text-white-v1 bg-black' : 'text-black'
                    } rounded-xl font-semibold hover:text-white-v1 hover:bg-black p-4 flex items-center gap-2`}
                  >
                    {item.icon}
                    {!collapsed && <span>{item.name}</span>}
                  </button>
                );
              }

              return (
                <div key={index}>
                  <Link
                    to={item.href}
                    onClick={() => {
                      setOpen(open === index ? null : index);
                      setSideBarOpen(false);
                    }}
                    className={`capitalize block no-underline whitespace-nowrap duration-300 ${
                      isActive ? 'text-white-v1 bg-black' : 'text-black'
                    } rounded-xl font-semibold hover:text-white-v1 hover:bg-black p-4`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        {item.icon}
                        {!collapsed && <span>{item.name}</span>}
                      </div>
                      {!collapsed && item.subMenu && (
                        <ChevronDown
                          className={`w-5 duration-300 ${
                            open === index ? 'rotate-0' : '-rotate-90'
                          }`}
                        />
                      )}
                    </div>
                  </Link>

                  {!collapsed && item.subMenu && open === index && (
                    <div className="grid mt-2">
                      {item.subMenu.map((sub, i) => (
                        <Link
                          to={sub.href}
                          onClick={() => setSideBarOpen(false)}
                          key={i}
                          className={`capitalize no-underline rounded-lg py-3 px-2 flex gap-2 pl-5 items-center ${
                            location.pathname === sub.href
                              ? 'hover:text-white-v1 hover:bg-black'
                              : 'text-desc'
                          }`}
                        >
                          {sub.icon}
                          <span className="whitespace-nowrap">{sub.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          top: `${height + 60}px`,
        }}
        className={`
          fixed z-20 bg-[#03B492] text-white py-2 px-1 shadow-md
          rounded-tr-xl rounded-br-xl cursor-pointer
          transition-all duration-300
          ${collapsed ? 'left-[80px]' : 'left-[230px]'}
        `}
      >
        <ChevronLeft
          size={24}
          className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
        />
      </button>
    </>
  );
};

export default SideBar;
