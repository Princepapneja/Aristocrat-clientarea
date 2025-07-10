import React, { useState } from 'react'
import DashboardHeader from '../header-footer/dashBoardHeader'
import ActiveButtons from '../utils/ActiveButtons'
function EngagementTools() {
    const [gameAssets, setGameAssets] = useState(
        [
            {
                value: "Game Assets",
                selected: true,
                name: "Game Assets"
            }
        ]
    )

    const [activeButtons, setActiveButtons] = useState([
        {
          name: 'Tournaments',
          description1: "Summon your players for enticing competitions! Set up tournaments effortlessly, selecting players, games, timing, conditions, and rewards with total flexibility.",
          description2: "Leader boards are displayed in-game, providing another edge, as players can track their progress as they battle their way to the top.",
          icon: "/Images/trophy.png",
          image: "/Images/screen.png"
        },
        {
          name: 'Free Spins',
          description1: "Configure personalized free spins in one quick step!",
          description2: "This marketing tool allows you to easily give your players alluring incentives to try new games and keep winning in their favorite ones, while our back-office system gives you full control of the promotion settings.",
          icon: "/Images/freespins.png",
          image: "/Images/Leading content & creative talent 1.png"
        },
        {
          name: 'Spin That Wheel™',
          description1: "An irresistible game within all games ! Define your rewards and probabilities to configure this bonus feature and add excitement to your players’ experience.",
          description2: "Spin that Wheel™ is a unique engagement tool that enhances attraction and retention in a simple and enticing manner.",
          icon: "/Images/Speen_that_wheel_logo2 1.png",
          image: "/Images/Spin That Wheel 1.png"
        },
        {
          name: 'Raffle Rocket',
          description1: "The golden ticket to campaign success!",
          description2: "Encourage participation through ticket collections and scheduled raffles.",
          description3: "Multiple reward options are available, including cash prizes and free spins.",
          icon: "/Images/LogoRR 1.png",
          image: "/Images/RR 1.png"
        },
        {
          name: 'Tool 5',
          description1: "Real-Time Fraud Detection Tool",
          description2: "Flags suspicious player behavior like bonus abuse, multi-accounting, or bot activity using AI/ML algorithms.",
          icon: "/Images/trophy.png",
          image: "/Images/screen.png"
        },
        {
          name: 'Tool 6',
          description1: "Live Game Performance Tracker",
          description2: "Monitors in real time how games are performing (GGR, player engagement, churn), helping operators adjust game offerings dynamically.",
          icon: "/Images/trophy.png",
          image: "/Images/screen.png"
        },
      ]);
    const [active, setActive] = useState(0)
    return (
        <>
            <div className='container'>
                <div className='space-y-12'>
                    <h1 className='text-3xl md:4xl font-medium'>Engagement Tools</h1>
                    <div className='space-y-5'>
                        <p className='text-lg text-black-v3 max-w-[1111px]'>
                            We are committed to delivering the highest performance results for our partners, combining endless entertainment with the most effective
                            data-driven features.
                        </p>
                        <p className='text-lg text-black-v3 max-w-[1159px]'>
                            That is why, along with our attractive set of games, we provide a variety of powerful engagement tools, specifically designed for seamless use and integration, to maximize your attraction and retention rates.
                        </p>
                    </div>
                    <div className='flex flex-col lg:flex-row rounded-3xl bg-white-v2 gap-4 xl:gap-10  p-2 md:p-8 items-center mb-8 w-full'>
                        <ActiveButtons active={active} setActive={setActive} className="grid  grid-cols-2 lg:grid-cols-1 gap-4 lg:max-w-[275px] w-full" buttons={activeButtons} type='' />

                        <div className="bg-white-v2 rounded-3xl p-2 xl:p-10">
                            <div className="flex flex-col xl:flex-row w-full items-center  justify-between gap-6 xl:gap-20 mb-6">
                                <img
                                    src={
                                        activeButtons?.[active]?.icon
                                    }
                                    alt="Trophy"
                                    className="h-28 max-w-[190px] w-full object-contain rounded-2xl"
                                />
                                <img
                                    src={
                                        activeButtons?.[active]?.image
                                    }
                                    alt="Screen"
                                    className="h-50 w-full max-w-[390px] object-contain"
                                />
                            </div>

                            <div className="space-y-4 text-[#6F6F6F]">
                                <p className="text-2xl md:text-lg max-w-xl">
                                    {
                                        activeButtons?.[active]?.description1
                                    }
                                </p>
                                <p className="text-2xl md:text-lg">
                                    {
                                        activeButtons?.[active]?.description2
                                    }
                                </p>
                                  <p className="text-2xl md:text-lg">
                                    {
                                        activeButtons?.[active]?.description3
                                    }
                                </p>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

export default EngagementTools