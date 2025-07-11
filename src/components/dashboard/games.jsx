import React, { useEffect, useState } from 'react'
import apiHandler from '../../functions/apiHandler';
import MiniLoader from '../utils/miniLoader';
import GameCard from '../utils/GameCard';
import useGlobal from '../../hooks/useGlobal';

const Games = () => {
    const [filters, setFilters] = useState({ skip: 0, limit: 16 });
    const [games, setGames] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [totalGames, setTotalGames] = useState(0);
    const { studios, countryOption, dropdowns,regions } = useGlobal()

    useEffect(() => {
        fetchGames();
    }, [filters]);

    
    
    const fetchGames = async () => {
        setLoading(true);
        try {
            // 
            const {
                skip = 0,
                limit = 10,
                volatilityIds = [],
                themeIds = [],
                subStudioIds = [],
                countryIds = [],
                featuresIds=[],
                familyIds=[],
                gameTypeIds=[],
                jackpotIds=[],
            } = filters || {};

            let url = `games?skip=${skip}&limit=${limit}`;
            const categoryIds = [...volatilityIds, ...themeIds,...familyIds,...featuresIds,...gameTypeIds,...jackpotIds];
            if (categoryIds.length > 0) {
                url += `&categoryIds=${categoryIds.join(",")}`;
            }

            if (subStudioIds.length > 0) {
                url += `&subStudios=${subStudioIds.join(",")}`;
            }

            if (countryIds.length > 0) {
                url += `&countryIds=${countryIds.join(",")}`;
            }

            const { data } = await apiHandler.get(url);
            const newGames = data?.data?.games || [];
            const total = data?.data?.total || 0;

            setGames((prev) => (skip === 0 ? newGames : [...prev, ...newGames]));
            setHasMore(skip + limit < total);
            setTotalGames(total);
        } catch (error) {
            console.error('Failed to fetch games:', error);
        }
        setLoading(false);
    };


   



    const handleOuterClear = (type, id) => {
        setFilters((prev) => ({ ...prev, [type]: prev?.[type]?.filter((q) => (q !== id)) }))
    }


    const filterConfigs = [
        {
          name: "subStudioIds",
          title: "Studios",
          options: studios
        },
        {
          name: "countryIds",
          title: "Regions",
          options: countryOption,
          filterArray:regions?.flatMap(region => region?.countries || [])?.map(e => ({ value: e.id, name: e.name }))
        },
        {
          name: "volatilityIds",
          title: "Volatility",
          options: dropdowns?.volatilityOption
        },
        {
          name: "themeIds",
          title: "Theme",
          options: dropdowns?.themeOption
        },
        {
          name: "featuresIds",
          title: "Features",
          options: dropdowns?.featuresOption
        },
        {
          name: "familyIds",
          title: "Family",
          options: dropdowns?.familyOption
        },
        {
          name: "gameTypeIds",
          title: "Game Type",
          options: dropdowns?.gameTypeOption
        },
        {
          name: "jackpotIds",
          title: "Jackpots",
          options: dropdowns?.jackpotOption
        }
      ];
      
    return (
        <>
            <div className='container space-y-16 group'>
           <Filters  items={filterConfigs} filters={filters} setFilters={setFilters} />

                <div className='grid mb-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5  xl:gap-10 '>
                    {games?.map((item, index) => (
                        <GameCard key={index} game={item} className='w-[280px]' />
                    ))}
                    {!loading && games.length === 0 && (
                        <p className='text-center col-span-4 my-4 text-gray-500 text-lg'>No games found.</p>
                    )}
                </div>

                {/* Loading Indicator */}
                {loading && (
                    <div className='grid place-items-center my-4'><MiniLoader /></div>
                )}

            </div>

        </>
    )
}

export default Games