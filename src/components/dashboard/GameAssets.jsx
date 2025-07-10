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
import useGlobal from '../../hooks/useGlobal';
import { Region } from '../../../constants';
import RegionListComponent from '../utils/RegionListComponent';
import MobileFilter from '../utils/MobileFilter';
import FilterIcon from '../../assets/icons/Group 4519.svg'
import MiniLoader from '../utils/miniLoader';
import FilterDropdownGrouped from '../utils/multiSelect';

function GameAssets() {
    const [params] = useSearchParams()
    const studio = params.get("studio")
    const [filters, setFilters] = useState({ skip: 0, limit: 16, studio: studio || "" });
    const [folders, setFolders] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [totalGames, setTotalGames] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);

    const [countryOption, setCountriesOption] = useState([])

    const { regions, studios, dropdowns } = useGlobal()


    useEffect(() => {
        fetchGames();
    }, [filters]);

    useEffect(() => {
        if (!regions) return
        // console.log(regions)
        const options = regions?.map((e) => ({ value: e.id, name: e.name, children: e.countries?.map((country) => ({ value: country.id, name: country.name })) }))
        setCountriesOption(options)
    }, [regions])


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




    const downloadById = async (type, item) => {
        try {
            const query = type === 'file' ? `fileId=${item?.id}` : `folderId=${item?.id}`;
            const response = await apiHandler.get(`/download?${query}`, {
                responseType: 'blob',
            });

            const disposition = response.headers['content-disposition'];
            let filename = item?.name

            if (disposition && disposition.includes('filename=')) {
                const match = disposition.match(/filename="?([^"]+)"?/);
                if (match && match[1]) {
                    filename = match[1];
                }
            }

            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');

            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };
    const fetchGames = async () => {
        setLoading(true);
        try {
             let url = `root-folders?type=exclude_certificates?skip=${filters?.skip}&limit=${filters?.limit}`
            if (filters?.studio?.length > 0) {
                url += `subStudios=${formData?.studio?.join(",")}`
            }
            const { data } = await apiHandler.get(url);
            const newFolders = data.data.resp || [];
            setFolders((prev) => (filters.skip === 0 ? newFolders : [...prev, ...newFolders]));
            setHasMore((filters.skip + filters.limit) < data.data.total);
            setTotalGames(data.data.total);
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


    const clearAllFilters=()=>{
        setFilters({skip:0,limit:16})
    }


    

    return (
        <div className='container space-y-16 group mb-10' >

            <div className='flex justify-between mb-14'>
                <h1 className='text-3xl md:4xl font-medium'>Game Assets</h1>
                <Link
                    to="/dashboard/certificates"
                    className="flex items-center gap-2 py-2.5 px-4 md:border-2 md:border-black-v4 rounded-xl justify-between"
                >
                    <p className="text-center text-base font-normal">Go to Certificate</p>
                    <img className="h-5 w-5" src="/logos/rightArrow.png" alt="Arrow" />
                </Link>
            </div>
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

                        {/* <MobileFilter setShowFilter={setShowFilter} filters={filters} onFilterChange={onFilterChange} studios={studios} clearFilter={clearFilter} clearAllFilters={clearAllFilters} /> */}
                    </div>

                </div>


                <div className='lg:grid  lg:grid-cols-4 gap-10 hidden'>
                   <FilterDropdownGrouped
                                           options={studios}
                                           name="subStudioIds"
                                           selected={filters?.subStudioIds}
                                           onApply={handleApplyButton}
                                           onClear={handleClear}
                                           title={<div className='flex gap-2 items-center text-[#6F6F6F] font-semibold text-base capitalize'>
                                               <h2>Studios</h2> {filters?.subStudioIds?.length>0 && <span className="ml-2 bg-[#94FF80] px-2 py-0.5 rounded text-xs text-black">{filters?.subStudioIds?.length}</span>}
                                           </div>}
                   
                                       />
                                       <FilterDropdownGrouped
                                           options={countryOption}
                                           name="countryIds"
                                           
                                           selected={filters?.countryIds}
                                           onApply={handleApplyButton}
                                           onClear={handleClear}
                                           title={<div className='flex gap-2 items-center text-[#6F6F6F] font-semibold text-base capitalize'>
                                               <h2>Regions</h2> {filters?.countryIds?.length>0 && <span className="ml-2 bg-[#94FF80] px-2 py-0.5 rounded text-xs text-black">{filters?.countryIds?.length}</span>}
                                           </div>}
                   
                   
                   
                                       />


   <FilterDropdownGrouped
                        options={dropdowns.volatilityOption}
                       
                        name="volatilityIds"
                        selected={filters?.volatilityIds}
                        onApply={handleApplyButton}
                        onClear={handleClear}
                         title={<div className='flex gap-2 items-center text-[#6F6F6F] font-semibold text-base capitalize'>
                            <h2>Certificate</h2> {filters?.volatilityIds?.length>0 && <span className="ml-2 bg-[#94FF80] px-2 py-0.5 rounded text-xs text-black">{filters?.volatilityIds?.length}</span>}
                        </div>}


                    />
                    <FilterDropdownGrouped
                        options={dropdowns.themeOption}
                       
                        name="themeIds"
                        selected={filters?.themeIds}
                        onApply={handleApplyButton}
                        onClear={handleClear}
                         title={<div className='flex gap-2 items-center text-[#6F6F6F] font-semibold text-base capitalize'>
                            <h2>Game Title</h2> {filters?.themeIds?.length>0 && <span className="ml-2 bg-[#94FF80] px-2 py-0.5 rounded text-xs text-black">{filters?.themeIds?.length}</span>}
                        </div>}
                    />


                   
                </div>


            </div>



            {/* Filter Chip Display */}
         <div className='hidden lg:flex justify-between items-center mb-20 '>
                             <div className='flex gap-5 flex-wrap'>
                                 {Object.entries(filters)
                                     .filter(([key, val]) => val && !['skip', 'limit'].includes(key))
                                     .slice(0, 5)
                                     .map(([key, val],index) => {
                                         console.log(val);
                                         
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
                                                 console.log(id,i);
                                                 
                                                 if(i>4){
                                                     return null
                                                 }
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
                                     onClick={clearAllFilters}
                                     className='font-semibold text-black-v4'>
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
                    {folders?.map((folder) => {
                        return (
                            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 mb-7  bg-white rounded-xl w-full shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <div className="flex justify-between items-center w-full md:hidden">
                                     <input type="checkbox" className="w-5 h-5 accent-emerald-500 " />
                                </div>
                                {/* Left */}
                                <div className="flex flex-col md:flex-row items-center  gap-4 md:gap-14">
                                    <input type="checkbox" className="w-5 h-5 accent-emerald-500 hidden md:block" />
                                    <img src={folder?.game
                                        ?.logo||"/Images/uk.jpg"} alt="Game Icon" className="w-44 h-28 md:mb-2" />
                                    <div className='text-center md:text-left'>
                                        <h2 className="text-emerald-600 font-medium text-3xl mb-2">
                                            {folder.name}
                                        </h2>
                                        <p className="text-xl text-gray-800 font-medium mb-4">{folder?.game?.title}</p>

                                        <p className="text-base text-gray-400 mb-2">By: {folder?.game?.subStudio?.name}</p>
                                    </div>
                                </div>

                                {/* Right */}
                                <div className="flex flex-col md:flex-row items-center gap-7 md:gap-14 w-full md:w-[unset]">
                                    <button onClick={() => { downloadById("folder", folder) }} className="cursor-pointer flex items-center gap-2 w-full md:w-[unset] justify-center px-4 py-1.5 hover:bg-black bg-[#00B290] text-white text-base font-semibold rounded-md transition">
                                        Download
                                        <Download size={16} />
                                    </button>
                                </div>
                            </div>


                        )
                    })}
                </div>
                {loading && (
                <div className='grid place-items-center my-4'><MiniLoader/></div>
            )}
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

export default GameAssets;
