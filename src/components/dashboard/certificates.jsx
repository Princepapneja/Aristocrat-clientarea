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
import useGlobal from '../../hooks/useGlobal';
import RegionListComponent from '../utils/RegionListComponent';
function Certificates() {
    const [params] = useSearchParams()
    const studio = params.get("studio")
    const [filters, setFilters] = useState({ skip: 0, limit: 16, studio: studio || "" });
    const [files, setFiles] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [totalFiles, setTotalFiles] = useState(0);

 const {regions,studios,dropdowns } = useGlobal();
    useEffect(() => {
        fetchGames();
    }, [filters]);

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
            debugger
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
            let url = `certificates?skip=${filters?.skip}&limit=${filters?.limit}`
            if (filters?.studio?.length > 0) {
                url += `&subStudios=${filters?.studio?.join(",")}`
            }
            if (filters?.country?.length > 0) {
                url += `&subStudios=${filters?.studio?.join(",")}`
            }
            const { data } = await apiHandler.get(url);
            const newFiles = data.data.resp || [];
            setFiles((prev) => (filters.skip === 0 ? newFiles : [...prev, ...newFiles]));
            setHasMore((filters.skip + filters.limit) < data.data.total);
            setTotalFiles(data.data.total);
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

    setFiles([]);
    setFilters(updatedFilters);
};



    const clearFilter = (key) => {
        const updatedFilters = { ...filters };
        delete updatedFilters[key];
        updatedFilters.skip = 0;
        setFiles([]);
        setFilters(updatedFilters);
    };

    const clearAllFilters = () => {
        setFiles([]);
        setFilters({ skip: 0, limit: 16 });
    };
    const [showFilterModal, setShowFilterModal] = useState(false);


    return (
        <div className='container space-y-16 group mb-10' >

            <div className='flex justify-between mb-14'>
                    <h1 className='text-3xl md:4xl font-medium'>Certificates</h1>
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
                  <RegionListComponent
                        id='region'
                        label="Region"
                        name="Region"
                        options={regions}
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
                        {files?.map((file) => {
                            return (
<div className="flex flex-col lg:flex-row items-center justify-between px-4 py-3 mb-7  bg-white rounded-xl w-full shadow hover:shadow transition-shadow duration-300">
    <div className="flex justify-between items-center w-full lg:hidden">
    <img  src={file?.country?.flag||"/Images/uk.jpg"}  alt="UK Flag" className="w-10 h-10 shadow-md rounded-full " />
     <input type="checkbox" className="w-5 h-5 accent-emerald-500 " />


    </div>
  {/* Left */}
  <div className="flex flex-col md:flex-row items-center  gap-4 lg:gap-14">
    <input type="checkbox" className="w-5 h-5 accent-emerald-500 hidden lg:block" />
    <img src={file?.game?.logo || "/Images/uk.jpg"} alt="Game Icon" className=" h-24 w-40 lg:mb-2" />
    <div className='text-center lg:text-left'>
      <h2 className="text-emerald-600 font-medium text-3xl mb-2">
        {file.name}
      </h2>
      <p className="text-xl text-gray-800 font-medium mb-4">{file?.game?.title}</p>
      
      <p className="text-base text-gray-400 mb-2">By: {file?.game?.subStudio?.name}</p>
    </div>
  </div>

  {/* Right */}
  
  <div className="flex flex-col lg:flex-row items-center gap-7 lg:gap-14 w-full lg:w-[unset]">
    <img  src={file?.folder?.county?.flag}  alt="UK Flag" className="w-10 h-10 shadow-md rounded-full hidden lg:block" />
    <p className="text-xl text-gray-600 font-normal">
  {file?.size ? (
    file.size >= 1024 ** 3
      ? `${(file.size / (1024 ** 3)).toFixed(2)} GB`
      : `${(file.size / (1024 ** 2)).toFixed(2)} MB`
  ) : 'N/A'}
</p>
    <button onClick={() => { downloadById("file", file) }} className="cursor-pointer flex items-center gap-2 w-full lg:w-[unset] justify-center px-4 py-1.5 hover:bg-black bg-[#00B290] text-white text-base font-semibold rounded-md transition">
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
