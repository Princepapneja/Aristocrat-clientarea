import React, { useEffect, useState } from 'react'
import apiHandler from '../../functions/apiHandler';
import MiniLoader from '../utils/miniLoader';
import GameCard from '../utils/GameCard';
import FilterDropdownGrouped from '../utils/multiSelect';
import useGlobal from '../../hooks/useGlobal';
import { Cross, X } from 'lucide-react';

const Games = () => {
    const [filters, setFilters] = useState({ skip: 0, limit: 16 });
    const [games, setGames] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [totalGames, setTotalGames] = useState(0);
    const [countryOption, setCountriesOption] = useState([])
    const [showFilterModal, setShowFilterModal] = useState(false);
    const { studios, regions, dropdowns } = useGlobal()

    useEffect(() => {
        fetchGames();
    }, [filters]);
    useEffect(() => {
        if (!regions) return
        console.log(regions)
        const options = regions?.map((e) => ({ value: e.id, name: e.name, children: e.countries?.map((country) => ({ value: country.id, name: country.name })) }))
        setCountriesOption(options)
    }, [regions])
    const fetchGames = async () => {
        setLoading(true);
        try {
            debugger
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


    const handleApplyButton = async (type, ids) => {
        setFilters((prev) => {
            //   if (type === "categoryIds") {
            //     const existingIds = Array.isArray(prev[type]) ? prev[type] : [];
            //     const newUniqueValues = ids?.filter((id) => !existingIds.includes(id)) || [];
            //     return {
            //       ...prev,
            //       [type]: [...existingIds, ...newUniqueValues],
            //     };
            //   }

            return {
                ...prev,
                [type]: ids,
            };
        });
    };

    const handleClear = (type) => {
        setFilters((prev) => ({ ...prev, [type]: [] }))
    }

    const handleOuterClear = (type, id) => {
        setFilters((prev) => ({ ...prev, [type]: prev?.[type]?.filter((q) => (q !== id)) }))
    }
    return (
        <>
            <div className='container'>
                <div className='grid grid-cols-4 gap-4'>
                    <FilterDropdownGrouped
                        options={studios}
                        name="subStudioIds"
                        selected={filters?.subStudioIds}

                        onApply={handleApplyButton}
                        onClear={handleClear}
                        title={<div className='flex gap-2'>
                            <h2>Studios</h2> <span className="bg-primary px-2 py-1 rounded-bl-sm text-[#6F6F6F]">{filters?.subStudioIds?.length}</span>
                        </div>}

                    />
                    <FilterDropdownGrouped
                        options={countryOption}
                        name="countryIds"
                        title='Regions'
                        selected={filters?.countryIds}
                        onApply={handleApplyButton}
                        onClear={handleClear}



                    />
                    <FilterDropdownGrouped
                        options={dropdowns.volatilityOption}
                        title='Volatility'
                        name="volatilityIds"
                        selected={filters?.volatilityIds}
                        onApply={handleApplyButton}
                        onClear={handleClear}


                    />
                    <FilterDropdownGrouped
                        options={dropdowns.themeOption}
                        title='Theme'
                        name="themeIds"
                        selected={filters?.themeIds}
                        onApply={handleApplyButton}
                        onClear={handleClear}
                    />
                    <FilterDropdownGrouped
                        options={dropdowns.featuresOption}
                        title='Features'
                        name="featuresIds"
                        selected={filters?.featuresIds}
                        onApply={handleApplyButton}
                        onClear={handleClear}
                    />
                    <FilterDropdownGrouped
                        options={dropdowns.familyOption}
                        title='Family'
                        name="familyIds"
                        selected={filters?.familyIds}
                        onApply={handleApplyButton}
                        onClear={handleClear}
                    />
                    <FilterDropdownGrouped
                        options={dropdowns.gameTypeOption}
                        title='Game Type'
                        name="gameTypeIds"
                        selected={filters?.gameTypeIds}
                        onApply={handleApplyButton}
                        onClear={handleClear}
                    />
                    <FilterDropdownGrouped
                        options={dropdowns.jackpotOption}
                        title='Jackpots'
                        name="jackpotIds"
                        selected={filters?.jackpotIds}
                        onApply={handleApplyButton}
                        onClear={handleClear}
                    />
                </div>
                <div className='hidden lg:flex justify-between items-center mb-20 '>
                    <div className='flex gap-5 flex-wrap'>
                        {Object.entries(filters)
                            .filter(([key, val]) => val && !['skip', 'limit'].includes(key))
                            .slice(0, 5)
                            .map(([key, val]) => {
                                let options = []
                                if (key === "subStudioIds") {
                                    options = studios
                                }
                                else if (key === "countryIds") {
                                    options = dropdowns?.regionOption
                                }
                                else if (key === "volatilityIds") {
                                    options = dropdowns?.volatilityOption
                                }
                                else if (key === "familyIds") {
                                    options = dropdowns?.familyOption
                                }
                                else if (key === "featuresIds") {
                                    options = dropdowns?.featuresOption
                                }
                                else if (key === "gameTypeIds") {
                                    options = dropdowns?.gameType
                                }

                                else return null;
                                return (
                                    val?.map((id, i) => {
                                        return (
                                            <div key={i} className='flex items-center gap-3 py-2.5 px-3.5 border-2 border-black-v4 rounded-xl'>
                                                <p className='text-sm text-black-v3'>
                                                    {options?.find((q) => (q.value === id))?.name}
                                                </p>
                                                <button onClick={() => handleOuterClear(key, id)}>
                                                    <X />
                                                </button>
                                            </div>
                                        )
                                    })


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

                        <button
                            // onClick={clearAllFilters}
                            className='font-semibold text-black-v4'>
                            Clear All
                        </button>
                    </div>
                </div>
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
                                {Object.entries(filters)
                                    .filter(([key, val]) => val && !['skip', 'limit'].includes(key))
                                    .slice(0, 5)
                                    .map(([key, val]) => {
                                        let options = []
                                        if (key === "subStudioIds") {
                                            options = studios
                                        }
                                        else if (key === "countryIds") {
                                            options = dropdowns?.regionOption
                                        }
                                        else if (key === "volatilityIds") {
                                            options = dropdowns?.volatilityOption
                                        }
                                        else if (key === "familyIds") {
                                            options = dropdowns?.familyOption
                                        }
                                        else if (key === "featuresIds") {
                                            options = dropdowns?.featuresOption
                                        }
                                        else if (key === "gameTypeIds") {
                                            options = dropdowns?.gameType
                                        }

                                        else return null;
                                        return (
                                            val?.map((id, i) => {
                                                return (
                                                    <div key={i} className='flex items-center gap-3 py-2.5 px-3.5 border-2 border-black-v4 rounded-xl'>
                                                        <p className='text-sm text-black-v3'>
                                                            {options?.find((q) => (q.value === id))?.name}
                                                        </p>
                                                        <button onClick={() => handleOuterClear(key, id)}>
                                                            <X />
                                                        </button>
                                                    </div>
                                                )
                                            })


                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default Games