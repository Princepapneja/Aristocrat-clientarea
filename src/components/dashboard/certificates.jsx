import React, { useEffect, useState } from 'react';
import InputField from '../utils/InputFields';
import GameCard from '../utils/GameCard';
import DashboardHeader from '../header-footer/dashBoardHeader';
import apiHandler from '../../functions/apiHandler';
import cross from '/logos/cross.png';
import { Link, useSearchParams } from 'react-router-dom';
import Buttons from '../utils/buttons';
import { X } from 'lucide-react';
import { Download } from "lucide-react";
import logo from '../../assets/logos/texas-longhorn-country-western-bull-cattle-vintage-label-logo-design-vector.jpg'
function Certificates() {
    const [params] = useSearchParams()
    const studio = params.get("studio")
    console.log(studio)
    const [filters, setFilters] = useState({ skip: 0, limit: 16, studio: studio || "" });
    const [games, setGames] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [totalGames, setTotalGames] = useState(0);


    
    const dropdownDefaults = (label) => [
        { value: label, selected: true, name: label }
    ];
    const [studios, setStudios] = useState([])

    const [dropdowns, setDropdowns] = useState({
        regionOption: dropdownDefaults('Region'),
        volatilityOption: dropdownDefaults('Volatility'),
        themeOption: dropdownDefaults('Theme'),
        featuresOption: dropdownDefaults('Feature'),
        familyOption: dropdownDefaults('Family'),
        gameTypeOption: dropdownDefaults('Game Type'),
        jackpotOption: dropdownDefaults('Jackpot'),
    });


    useEffect(() => {
        fetchGames();
    }, [filters]);

    useEffect(() => {
        fetchStudios()
        fetchCategories()

    }, [])

    // Scroll event to trigger infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 &&
                !loading && hasMore
            ) {
                setFilters((prev) => ({ ...prev, skip: prev.skip + prev.limit }));
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);


    const fetchStudios = async () => {
        try {
            const { data } = await apiHandler.get("studios");
            const options = data?.data?.map((e) => ({ name: e.name, value: e.id }));
            setStudios([{ value: "", selected: true, name: "Select one" }, ...options]);
        } catch (error) {
            console.error(error);
        }
    }
    const fetchCategories = async () => {
        try {
            const { data } = await apiHandler.get("categories");
            const categories = data?.data || [];
            console.log(data);


            const options = (type) => {
                const items = categories?.filter((q) => q.type === type).map((e) => ({ name: e.title, value: e.id }))
                return [{ value: "", selected: true, name: "Select one" }, ...items]
            }

            setDropdowns({
                regionOption: options("region"),
                volatilityOption: options("volatility"),
                themeOption: options("theme"),
                featureOption: options("feature"),
                jackpotOption: options("jackpot"),
                gameTypeOption: options("gameType"),
                familyOption: options("family"),
            });
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    const fetchGames = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const { data } = await apiHandler.get(`games?${queryParams}`);
            const newGames = data.data.games || [];
            setGames((prev) => (filters.skip === 0 ? newGames : [...prev, ...newGames]));
            setHasMore((filters.skip + filters.limit) < data.data.total);
            setTotalGames(data.data.total);
        } catch (error) {
            console.error('Failed to fetch games:', error);
        }
        setLoading(false);
    };

   const onFilterChange = (filterArray) => {
    console.log(filterArray);

    const updatedFilters = { ...filters };

    filterArray.forEach(filter => {
        updatedFilters[filter.name] = filter.value;
    });

    updatedFilters.skip = 0;

    setGames([]);
    setFilters(updatedFilters);
};



    const clearFilter = (key) => {
        const updatedFilters = { ...filters };
        delete updatedFilters[key];
        updatedFilters.skip = 0;
        setGames([]);
        setFilters(updatedFilters);
    };

    const clearAllFilters = () => {
        setGames([]);
        setFilters({ skip: 0, limit: 16 });
    };
    const [showFilterModal, setShowFilterModal] = useState(false);
const[gamesList, setGameLists]=useState(
    [
        {
            icon:'/logos/gameIcon.png',
            title: "Amun Ra King Of The Gods...",
            by: "Studio Name"
        },
        {
            icon:'/logos/gameIcon.png',
            title: "Amun Ra King Of The Gods...",
            by: "Studio Name"
        },
        {
            icon:'/logos/gameIcon.png',
            title: "Amun Ra King Of The Gods...",
            by: "Studio Name"
        }
    ]
)


    return (
        <div className='container space-y-16 group mb-10' >

            <div className='flex justify-between mb-14'>
                    <h1 className='text-3xl md:5xl font-medium'>Certificates</h1>
                    <Link
                                        to="/dashboard/game-assets"
                                        className="flex items-center gap-2 py-2.5 px-4 md:border-2 md:border-black-v4 rounded-xl justify-between"
                                    >
                                        <p className="text-center text-base font-normal">Go to Game Assets</p>
                                        <img className="h-5 w-5" src="/logos/rightArrow.png" alt="Arrow" />
                                    </Link>
                </div>
            {/* Filter Inputs */}
            <div className='space-y-5'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-10'>
                    <InputField
                        type='selects'
                        id='studio'
                        label="Studio"
                        value={filters?.studio}
                        options={studios}
                        handleInputChange={onFilterChange}
                    />
                    <InputField
                        type='selects'
                        id='region'
                        label="Region"
                        value={filters?.region}
                        options={dropdowns.regionOption}
                        handleInputChange={onFilterChange}
                    />
                    <InputField
                        type='selects'
                        label="Certificate"
                        id='Certificate'
                        value={filters?.volatility}
                        options={dropdowns.volatilityOption}
                        handleInputChange={onFilterChange}
                    />
                    <InputField
                        type='selects'
                        id='gameTitle'
                        label="Game Title"
                        value={filters?.theme}
                        options={dropdowns.themeOption}
                        handleInputChange={onFilterChange}
                    />
                </div>

             
            </div>



            {/* Filter Chip Display */}
            <div className='flex justify-between items-center mb-20'>
                <div className='flex gap-5 flex-wrap'>
                    {Object.entries(filters)
            .filter(([key, val]) => val && !['skip', 'limit'].includes(key))
            .slice(0, 5)
            .map(([key, val]) => {

                        let options = []
                        if (key === "studio") {
                            options = studios
                        }
                        else if (key === "region") {
                            options = dropdowns?.regionOption
                        }
                        else if (key === "volatility") {
                            options = dropdowns?.volatilityOption
                        }
                        else if (key === "family") {
                            options = dropdowns?.familyOption
                        }
                        else if (key === "features") {
                            options = dropdowns?.featuresOption
                        }
                        else if (key === "gameType") {
                            options = dropdowns?.gameType
                        }
                        if (['skip', 'limit'].includes(key)) return null;
                        if (!val) return null
                        console.log(options, options?.find(q => q.value === val), options?.find(q => q.value === val)?.name, "name")
                        return (
                            <div key={key} className='flex items-center gap-3 py-2.5 px-3.5 border-2 border-black-v4 rounded-xl'>
                                <p className='text-sm text-black-v3'>{
                                    key
                                }</p>
                                <button onClick={() => clearFilter(key)}>
                                    <img className='w-2 h-2' src={cross} alt='remove' />
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className='flex gap-10'>
                    <div
                        onClick={() => setShowFilterModal(true)}
                        className='cursor-pointer font-semibold text-primary-dark flex gap-3.5 items-center bg-white-v2 rounded-xl px-5 py-2.5'
                    >
                        <p>View All Chosen Filters</p>
                        <img className='h-4 w-4' src='/logos/filterArrow.png' alt='' />
                    </div>

                    <button onClick={clearAllFilters} className='font-semibold text-black-v4'>
                        Clear All
                    </button>
                </div>
            </div>

            {/* Game List */}
            <div className='bg-white-v2 px-7 pt-8 pb-1 space-y-8 rounded-t-3xl '>

                    {/*  button */}
                    <div className='flex  md:justify-end w-full '>
                    <button className="cursor-pointer flex items-center gap-2 w-full md:w-[unset] justify-center px-4 py-1.5 hover:bg-black bg-[#00B290] text-white text-base font-semibold rounded-md transition">
      Download All
      <Download size={16} />
    </button>
                    </div>
                    {/*  button */}

                    <div>
                        {gamesList?.map((game) => {
                            return (
<div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 mb-7  bg-white rounded-xl w-full shadow-sm hover:shadow-lg transition-shadow duration-300">
    <div className="flex justify-between items-center w-full md:hidden">
   
    <img  src={"/Images/uk.jpg"}  alt="UK Flag" className="w-10 h-10 shadow-md rounded-full " />
     <input type="checkbox" className="w-5 h-5 accent-emerald-500 " />


    </div>
  {/* Left */}
  <div className="flex flex-col md:flex-row items-center  gap-4 md:gap-14">
    <input type="checkbox" className="w-5 h-5 accent-emerald-500 hidden md:block" />
    <img src={game.icon} alt="Game Icon" className="w-44 h-28 md:mb-2" />
    <div className='text-center md:text-left'>
      <h2 className="text-emerald-600 font-medium text-3xl mb-2">
        United Kingdom Certificate
      </h2>
      <p className="text-xl text-gray-800 font-medium mb-4">{game.title}</p>
      <p className="text-base text-gray-400 mb-2">By: {game.by}</p>
    </div>
  </div>

  {/* Right */}
  <div className="flex flex-col md:flex-row items-center gap-7 md:gap-14 w-full md:w-[unset]">
    <img  src={"/Images/uk.jpg"}  alt="UK Flag" className="w-10 h-10 shadow-md rounded-full hidden md:block" />
    <p className="text-xl text-gray-600 font-normal">4 GB</p>
    <button className="cursor-pointer flex items-center gap-2 w-full md:w-[unset] justify-center px-4 py-1.5 hover:bg-black bg-[#00B290] text-white text-base font-semibold rounded-md transition">
      Download
      <Download size={16} />
    </button>
  </div>
</div>


                            )
                        })}
                    </div>

                </div>

            {showFilterModal && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div
                        className="bg-white rounded-[15px] shadow-lg p-6 w-[25%] h-[60vh] transform transition-all duration-300 translate-y-10 opacity-0 animate-popup"
                    >
                        <div className='flex items-baseline justify-end mb-5'>
                            <X
                                size={20}
                                className="text-black cursor-pointer hover:text-black"
                                onClick={() => setShowFilterModal(false)}
                            />
                        </div>
                        <div className="flex flex-wrap gap-3 max-h-[400px] overflow-y-auto">
                            {Object.entries(filters).map(([key, val]) => {
                                if (['skip', 'limit'].includes(key) || !val) return null;

                                return (
                                    <div key={key} className='flex items-center gap-3 py-2.5 px-3.5 border-2 border-black-v4 rounded-xl'>
                                        <p className='text-sm text-black-v3'>{
                                            key
                                        }</p>
                                        <button onClick={() => clearFilter(key)}>
                                            <img className='w-2 h-2' src={cross} alt='remove' />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}

export default Certificates;
