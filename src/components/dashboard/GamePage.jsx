import React, { useEffect, useState } from 'react';
import InputField from '../utils/InputFields';
import GameCard from '../utils/GameCard';
import DashboardHeader from '../header-footer/dashBoardHeader';
import apiHandler from '../../functions/apiHandler';
import cross from '/logos/cross.png';
import { useSearchParams } from 'react-router-dom';
import Buttons from '../utils/buttons';
import { Loader, X } from 'lucide-react';
import MobileFilter from '../utils/MobileFilter';
import FilterIcon from '../../assets/icons/Group 4519.svg'
import RegionListComponent from '../utils/RegionListComponent';
import useGlobal from '../../hooks/useGlobal';
import MiniLoader from '../utils/miniLoader';
import { filter } from 'jszip';


function GamePage() {
    const [params] = useSearchParams()
    const studio = params.get("studio")
    console.log(studio)
    const [filters, setFilters] = useState({ skip: 0, limit: 16, studio: studio || "" });
    const [games, setGames] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [totalGames, setTotalGames] = useState(0);
    const [showFilter, setShowFilter] = useState(false);

    const { regions, studios, dropdowns } = useGlobal()


    const [formData, setFormData] = useState({
        studio: [],
        categoryIds: [],
        region: [],

    });


    // console.log(dropdowns?.featuresOption);

    useEffect(() => {
        fetchGames();
    }, [filters]);



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



    const fetchGames = async () => {
        setLoading(true);
        try {
            let url = `games?skip=${filters?.skip}&limit=${filters?.limit}`
            if (formData?.categoryIds?.length > 0) {
                url += `&categoryIds=${formData?.categoryIds?.join(",")}`
            }
            if (formData?.studio?.length > 0) {
                url += `&subStudios=${formData?.studio?.join(",")}`
            }
            if (formData?.region?.length > 0) {
                url += `&countryIds=${formData?.region?.join(",")}`
            }
            const { data } = await apiHandler.get(url);
            const newGames = data.data.games || [];
            setGames((prev) => (filters.skip === 0 ? newGames : [...prev, ...newGames]));
            debugger
            setHasMore((filters.skip + filters.limit) < data.data.total);
            setTotalGames(data.data.total);
        } catch (error) {
            console.error('Failed to fetch games:', error);
        }
        setLoading(false);
    };


    const onFilterChange = (filterArray) => {
        const updatedFormData = { ...formData };

        const updatedFilter = { ...filters };



        filterArray.forEach(({ value, id }) => {
            if (!updatedFormData[id]) {
                updatedFormData[id] = [];
            }
            if (!updatedFormData[id].includes(value)) {
                updatedFormData[id].push(value);
            }
        });


        filterArray.forEach(filter => {
            updatedFilter[filter.name] = filter.value;

        });
        // console.log(updatedFormData);

        setFormData(updatedFormData);
        setFilters(updatedFilter);
    };

    const clearFilter = (key) => {
        const updatedFilters = { ...filters };
        delete updatedFilters[key];
        updatedFilters.skip = 0;
        setGames([]);
        setFilters(updatedFilters);
    };
    const clearAllFilters = () => {
        setFormData({
            studio: [],
            categoryIds: [],
            region: [],

        });
        setFilters({ skip: 0, limit: 16 });
    };
    const [showFilterModal, setShowFilterModal] = useState(false);


    console.log(formData);



    return (
        <div className='container space-y-16 group' >
            {/* Filter Inputs */}
            <div className='space-y-5'>
               
                <div className='lg:hidden '>
                    <button onClick={() => setShowFilter(true)} className="cursor-pointer flex items-center gap-2 w-full xl:w-[unset] justify-center px-4 py-1.5 border-1 mt-10 border-[#00B290] hover:bg-[rgba(0,178,144,0.10)]
 text-[#00B290] text-base font-semibold rounded-md transition">
                        <span className=' font-normal  text-lg '>Filter</span>
                        <img src={FilterIcon} alt="" className='w-5' />
                    </button>



                    <div
                        className={`fixed top-0 left-0 w-full  h-full bg-white z-50 transition-transform duration-300 ease-in-out transform ${showFilter ? 'translate-x-0' : '-translate-x-full'
                            }`}
                    >
                        {/* Close button */}


                        {/* Filter Content */}

                        <MobileFilter setShowFilter={setShowFilter} filters={filters} dropdowns={dropdowns && dropdowns} onFilterChange={onFilterChange} studios={studios} clearFilter={clearFilter} clearAllFilters={clearAllFilters} />
                    </div>

                </div>


                <div className='lg:grid  lg:grid-cols-4 gap-10 hidden'>
                    <InputField
                        type='selects'
                        id='studio'
                        label="Studio"
                        value={formData.volatility}
                        options={studios}
                        handleInputChange={onFilterChange}
                    />
                    <RegionListComponent
                        id='region'
                        label="Region"
                        name="Region"
                        options={regions}
                        handleInputChange={onFilterChange}
                    />

                    <InputField
                        type='selects'
                        label="Volatility"
                        id='categoryIds'
                        value={formData?.volatility}
                        options={dropdowns.volatilityOption}
                        handleInputChange={onFilterChange}
                    />
                    <InputField
                        type='selects'
                        id='categoryIds'
                        label="Theme"
                        value={formData?.theme}
                        options={dropdowns.themeOption}
                        handleInputChange={onFilterChange}
                    />

                    <InputField
                        type='selects'
                        label="Features"
                        id='categoryIds'
                        value={formData?.features}
                        options={dropdowns.featuresOption}
                        handleInputChange={onFilterChange}
                    />
                    <InputField
                        type='selects'
                        label="Family"
                        id='categoryIds'
                        value={formData?.family}
                        options={dropdowns.familyOption}
                        handleInputChange={onFilterChange}
                    />
                    <InputField
                        type='selects'
                        label="Game Type"
                        id='categoryIds'
                        value={formData?.gameType}
                        options={dropdowns.gameTypeOption}
                        handleInputChange={onFilterChange}
                    />
                    <InputField
                        type='selects'
                        label="Jackpot"
                        id='categoryIds'
                        value={formData?.jackpot}
                        options={dropdowns.jackpotOption}
                        handleInputChange={onFilterChange}
                    />
                </div>
                {/* <MobileFilter/> */}

            </div>



            {/* Filter Chip Display */}
            <div className='hidden lg:flex justify-between items-center mb-20 '>
                <div className='flex gap-5 flex-wrap'>
                    {Object.entries(filters)
                        .filter(([key, val]) => val && !['skip', 'limit'].includes(key))
                        .slice(0, 5)
                        .map(([key, val]) => {
                            console.log(key, val);


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
            <div className='grid mb-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5  xl:gap-10 '>
                {games.map((item, index) => (
                    <GameCard key={index} game={item} className='w-[280px]' />
                ))}
                {!loading && games.length === 0 && (
                    <p className='text-center col-span-4 my-4 text-gray-500 text-lg'>No games found.</p>
                )}
            </div>

            {/* Loading Indicator */}
            {loading && (
                <div className='grid place-items-center my-4'><MiniLoader/></div>
            )}

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

export default GamePage;
