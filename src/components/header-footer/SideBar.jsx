import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bot, BriefcaseMedical, CalendarCheck, CalendarDays, CalendarPlus, ChevronDown, Home, LogOut, Scroll, ScrollText, ShieldPlus, UserPlus, UserRoundCog, UsersRound, WalletCards } from 'lucide-react';
import useGlobal from '../../hooks/useGlobal';

const SideBar = () => {
    const [open, setOpen] = useState(0);
    const { sideBarOpen, setSideBarOpen, height, navigate } = useGlobal();
    const location = useLocation(); // Get current URL path

    const menu = [
        {
            name: "Dashboard",
            icon: <Home />,
            href: "/dashboard"
        },
        {
            name: "Appointments",
            icon: <CalendarCheck />,
            href: "/dashboard/all-appointment"
        },

        {
            name: "Chat Bot",
            icon: <Bot />,
            href: "/dashboard/chat-bot"
            // subMenu: [
            //     {
            //         name: "Questions",
            //         icon: <Scroll className='w-5' />,
            //         href: "/dashboard/questions",

            //     },
            //     {
            //         name: "Tree View",
            //         icon: <Scroll className='w-5' />,
            //         href: "/dashboard/tree"
            //     }
            // ]
        },
        {
            name: "Clinicians",
            icon: <BriefcaseMedical />,
            subMenu: [
                {
                    name: "Add Clinician",
                    icon: <UserPlus />,
                    href: "/dashboard/add-clinician"
                },
                {
                    name: "Manage Clinicians",
                    icon: <UsersRound />,
                    href: "/dashboard/manage-clinician"
                }
            ]
        },
        {
            name: "Patients",
            icon: <UsersRound />,
            subMenu: [
                {
                    name: "Add Patient",
                    icon: <UserPlus />,
                    href: "/dashboard/add-patient"
                },
                {
                    name: "Manage Patients",
                    icon: <UsersRound />,
                    href: "/dashboard/manage-patient"
                }
            ]
        },
        {
            name: "Survey",
            icon: <ScrollText />,
            subMenu: [
                {
                    name: "metric survey",
                    icon: <Scroll className='w-5' />,
                    href: "/dashboard/metric-survey"
                },
                {
                    name: "mood survey",
                    icon: <Scroll className='w-5' />,
                    href: "/dashboard/mood-survey"
                }
            ]
        },
        {
            name: "Articles",
            icon: <CalendarCheck />,
            subMenu: [
                {
                    name: "New Article",
                    icon: <CalendarPlus className='w-5' />,
                    href: "/dashboard/new-article"
                },
                {
                    name: "All articles",
                    icon: <CalendarDays className='w-5' />,
                    href: "/dashboard/all-articles"
                },
                // {
                //     name: "Categories",
                //     icon: <WalletCards className='w-5' />,
                //     href: "/dashboard/manage-categories"
                // }
            ]
        }
    ];
    useEffect(() => {
    }, [height])

    return (
        <>
            <aside
                style={{ top: `${height}px`, height: `calc(100vh - ${height}px)`, minWidth: '230px' }}
                className={`fixed ${sideBarOpen ? "left-0" : "-left-full"}  z-10 duration-500  md:static  md:!h-screen grid items-stretch   bg-white   p-4 shadow-lg shadow-background`}>
                <div>
                    <div className='background grid place-items-center'>
                        <img src={"/logos/TCFWC.png"} alt="Logo" className='w-36' />
                        <h3 className='font-bold text-xl'>UThrive</h3>
                    </div>
                    <div className='mt-4 md:mt-8 overflow-y-auto h-[calc(100vh-140px)] space-y-2'>
                        {menu.map((item, index) => {
                            const isActive = location.pathname === item.href

                            return (
                                <div key={index}>
                                    <Link
                                        to={item.href ? item.href : "#"}
                                        onClick={() => { setOpen(open === index ? null : index); item.href && setSideBarOpen(false) }}
                                        className={`capitalize block no-underline whitespace-nowrap duration-300 ${isActive ? 'text-primary bg-background' : 'text-text'} rounded-lg hover:text-primary hover:bg-background p-4`}
                                    >
                                        <div className='flex justify-between items-center'>
                                            <div className='flex gap-2 items-center'>
                                                {item.icon}
                                                <span>{item.name}</span>
                                            </div>
                                            {item?.subMenu && (
                                                <ChevronDown
                                                    className={`w-5 duration-300 ${open === index ? 'rotate-0' : '-rotate-90'}`}
                                                />
                                            )}
                                        </div>
                                    </Link>
                                    {item?.subMenu && open === index && (
                                        <div className='grid mt-2'>
                                            {item.subMenu.map((sub, i) => (
                                                <Link
                                                    to={sub.href}
                                                    onClick={() => {
                                                        setSideBarOpen(false)
                                                    }}
                                                    key={i}
                                                    className={`capitalize no-underline rounded-lg py-3 px-2 flex gap-2 pl-5 items-center ${location.pathname === sub.href ? 'text-primary bg-background' : 'text-desc'}`}
                                                >
                                                    {sub.icon}
                                                    <span className='whitespace-nowrap'>{sub.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* <div className='self-end'>
                    <Link to="/dashboard/profile" onClick={() => {setSideBarOpen(false)}} className={`flex gap-2 items-center w-full rounded-lg  hover:text-primary font-semibold hover:bg-background p-2 ${location.pathname ==="/dashboard/profile" ? 'text-primary bg-background' : 'text-text' }`}>
                        <UserRoundCog />
                        <span className='whitespace-nowrap'>Profile</span>
                    </Link>
                    <button className='flex gap-2 items-center w-full rounded-lg text-text hover:text-primary font-semibold hover:bg-background p-2' onClick={handleLogout}>
                        <LogOut />
                        <span className='whitespace-nowrap'>Logout</span>
                    </button>
                </div> */}
            </aside>
        </>
    );
};

export default SideBar;
