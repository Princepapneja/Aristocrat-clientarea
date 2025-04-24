import { useEffect, useRef, useState } from 'react';
import { Home, LogOut, Menu, Search, SidebarClose, UserRoundCog } from 'lucide-react';
import useGlobal from '../../hooks/useGlobal';
import { Bot, CalendarCheck, CalendarDays, CalendarPlus, UserPlus, UsersRound, Scroll } from 'lucide-react';
import InputField from '../utils/InputFields';
import { DropdownMenu } from '../utils/dropdown';
import Persona from '../utils/persona';

const searchFields = [
  { label: "Dashboard", path: "/dashboard", icon: <Home /> },
  { label: "Appointments", path: "/dashboard/all-appointment", icon: <CalendarCheck /> },
  { label: "Chat Bot", path: "/dashboard/chat-bot", icon: <Bot /> },
  { label: "Add clinician", path: "/dashboard/add-clinician", icon: <UserPlus /> },
  { label: "Manage clinicians", path: "/dashboard/manage-clinician", icon: <UsersRound /> },
  { label: "Add Patient", path: "/dashboard/add-patient", icon: <UserPlus /> },
  { label: "Manage Patients", path: "/dashboard/manage-patient", icon: <UsersRound /> },
  { label: "Metric Survey", path: "/dashboard/metric-survey", icon: <Scroll className="w-5" /> },
  { label: "Mood Survey", path: "/dashboard/mood-survey", icon: <Scroll className="w-5" /> },
  { label: "New Blog", path: "/dashboard/new-blog", icon: <CalendarPlus className="w-5" /> },
  { label: "All Blogs", path: "/dashboard/all-blogs", icon: <CalendarDays className="w-5" /> },
  { label: "Profile", path: "/dashboard/profile", icon: <UserRoundCog className="w-5" /> },
];

const DashBoardHeader = () => {
  const { sideBarOpen, setSideBarOpen, user, navigate } = useGlobal();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFields, setFilteredFields] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);
const ref=useRef(null)
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = searchFields.filter(field =>
        field.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFields(filtered);
    } else {
      setFilteredFields([]);
    }
  };

  const handleItemClick = (path) => {
    if (path) {
      setSearchTerm('');
      setFilteredFields([]);
      navigate(path);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const dropDownItems = [
    {
      title: "profile",
      path: "/dashboard/profile",
      icon: <UserRoundCog />,
      onClick: () => {
        setDropDown(!dropDown);
      }
    },
    {
      title: "logout",
      icon: <LogOut />,
      onClick: () => {
        handleLogout();
        setDropDown(!dropDown);
      }
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      
      }
      if(ref.current && !ref.current.contains(event.target)){
        setFilteredFields([])
        setSearchTerm("")
      }
    };
    if (dropDown || searchTerm || filteredFields?.length>0) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDown,filteredFields,searchTerm]);

  return (
    <header className='nav flex items-center justify-between p-2 md:p-4 shadow shadow-background bg-white'>
      <div className='flex gap-4 items-center'>
        <div className={`md:hidden`} onClick={() => { setSideBarOpen(!sideBarOpen) }} >
          {sideBarOpen ? <SidebarClose /> : <Menu />}
        </div>
        <div className='relative hidden md:block' ref={ref}>
        
           <label className=' border rounded-xl pr-2 flex items-center max-w-sm w-full'>
              <input                       className={`accent-primary text-desc bg-transparent leading-0 p-1 sm:p-2 w-full placeholder:font-light placeholder:text-sm focus:outline-none  disabled:bg-gray-200  "rounded-xl"}`}
 onChange={handleSearchChange}  value={searchTerm || ""} placeholder='Search' />
              <Search className=' right-2 text-desc  w-4' />
            </label>
          {filteredFields?.length > 0 && (
            <ul className='absolute z-10 bg-white shadow-md rounded-md mt-2 w-full'>
              {filteredFields.map((field, index) => (
                <li
                  key={index}
                  className='p-2 cursor-pointer flex gap-2 capitalize hover:bg-gray-200'
                  onClick={() => handleItemClick(field.path)}
                >
                  <span>{field?.icon}</span>
                  <span>{field.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div ref={dropdownRef}>
        <div className='flex items-center gap-2 mr-4 '>
          <h4 className='text-base font-bold capitalize'>{user?.fullName || "Admin"}</h4>
          <button onClick={() => setDropDown(!dropDown)}><Persona path={user?.image} /></button>
        </div>
        <DropdownMenu listItems={dropDownItems} className={`${dropDown ? "opacity-100 visible" : "opacity-0 invisible"} duration-300 font-semibold`} />
      </div>
    </header>
  );
};
export default DashBoardHeader
