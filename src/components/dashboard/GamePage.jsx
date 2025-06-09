import React, { useEffect, useState } from 'react';
import InputField from '../utils/InputFields';
import GameCard from '../utils/GameCard';
import DashboardHeader from '../header-footer/dashBoardHeader';
import apiHandler from '../../functions/apiHandler';
import cross from '/logos/cross.png';
import { useSearchParams } from 'react-router-dom';
import Buttons from '../utils/buttons';

function GamePage() {
    const [params] = useSearchParams()
    const studio = params.get("studio")
    console.log(studio)
    const [filters, setFilters] = useState({ skip: 0, limit: 16, studio: studio||"" });
    const [games, setGames] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [totalGames, setTotalGames] = useState(0);

    const dropdownDefaults = (label) => [
        { value: label, selected: true, name: label }
    ];
    const [studios,setStudios]= useState([])

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
      
          debugger
          const options=(type)=>{
const items = categories?.filter((q)=>q.type===type).map((e)=>({name:e.title,value:e.id}))
return [{ value: "", selected: true, name: "Select one" }, ...items]
          }
          
          setDropdowns({
            regionOption:options("region"),
            volatilityOption:options("volatility"),
            themeOption:options("theme"),
            featureOption:options("feature"),
            jackpotOption:options("jackpot"),
            gameTypeOption:options("gameType"),
            familyOption:options("family"),
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

    const onFilterChange = (e) => {
        debugger
        const updatedFilters = { ...filters, [e.target.name]: e.target.value, skip: 0 };
        setGames([]);  // Clear current games when a filter is changed
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

    return (
        <div className='space-y-16 group' >
            {/* Filter Inputs */}
            <div className='space-y-5'>
  <div className='grid grid-cols-4 gap-10'>
    <InputField
      type='select'
      id='studio'
      label="Studio"
      value={filters?.studio}
      options={studios}
      handleInputChange={onFilterChange}
    />
    <InputField
      type='select'
      id='region'
      label="Region"
      value={filters?.region}
      options={dropdowns.regionOption}
      handleInputChange={onFilterChange}
    />
    <InputField
      type='select'
      label="Volatility"
      id='volatility'
      value={filters?.volatility}
      options={dropdowns.volatilityOption}
      handleInputChange={onFilterChange}
    />
    <InputField
      type='select'
      id='theme'
      label="Theme"
      value={filters?.theme}
      options={dropdowns.themeOption}
      handleInputChange={onFilterChange}
    />
  </div>

  <div className='grid grid-cols-4 gap-10'>
    <InputField
      type='select'
      label="Features"
      id='features'
      value={filters?.features}
      options={dropdowns.featuresOption}
      handleInputChange={onFilterChange}
    />
    <InputField
      type='select'
      label="Family"
      id='family'
      value={filters?.family}
      options={dropdowns.familyOption}
      handleInputChange={onFilterChange}
    />
    <InputField
      type='select'
      label="Game Type"
      id='gameType'
      value={filters?.gameType}
      options={dropdowns.gameTypeOption}
      handleInputChange={onFilterChange}
    />
    <InputField
      type='select'
      label="Jackpot"
      id='jackpot'
      value={filters?.jackpot}
      options={dropdowns.jackpotOption}
      handleInputChange={onFilterChange}
    />
  </div>
</div>



            {/* Filter Chip Display */}
            <div className='flex justify-between items-center mb-20'>
                <div className='flex gap-5 flex-wrap'>
                    {Object.entries(filters).map(([key, val]) => {
                        let options = []
                        if (key === "studio") {
                            options = studios
                        }
                        else if (key==="region"){
                            options=dropdowns?.regionOption
                        }
                        else if (key==="volatility"){
                            options=dropdowns?.volatilityOption
                        }
                        else if (key==="family"){
                            options=dropdowns?.familyOption
                        }
                        else if (key==="features"){
                            options=dropdowns?.featuresOption
                        }
                        else if (key==="gameType"){
                            options=dropdowns?.gameType
                        }
                        if (['skip', 'limit'].includes(key)) return null;
                        if (!val) return null
                        console.log(options,options?.find(q => q.value === val),options?.find(q => q.value === val)?.name,"name")
                        return (
                            <div key={key} className='flex items-center gap-3 py-2.5 px-3.5 border-2 border-black-v4 rounded-xl'>
                                <p className='text-sm text-black-v3'>{
                                    options?.find(q => q.value === val)?.name
                                }</p>
                                <button onClick={() => clearFilter(key)}>
                                    <img className='w-2 h-2' src={cross} alt='remove' />
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className='flex gap-10'>
                    <div className='font-semibold text-primary-dark flex gap-3.5 items-center bg-white-v2 rounded-xl px-5 py-2.5'>
                        <p>View All Chosen Filters</p>
                        <img className='h-4 w-4' src='/logos/filterArrow.png' alt='' />
                    </div>
                    <button onClick={clearAllFilters} className='font-semibold text-black-v4'>
                        Clear All
                    </button>
                </div>
            </div>

            {/* Game List */}
            <div className='grid grid-cols-4 gap-x-10 gap-y-16 p-4'>
                {games.map((item, index) => (
                    <GameCard key={index} game={item} />
                ))}
                {!loading && games.length === 0 && (
                    <p className='text-center col-span-4 text-gray-500 text-lg'>No games found.</p>
                )}
            </div>

            {/* Loading Indicator */}
            {loading && (
                <div className='text-center text-sm text-gray-400 mt-8'>Loading more games...</div>
            )}
          
        </div>
    );
}

export default GamePage;
