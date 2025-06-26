import React, { useEffect, useRef, useState } from 'react'
import Buttons from '../utils/buttons'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import DashBoardHeader from '../header-footer/dashBoardHeader';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import apiHandler from '../../functions/apiHandler';
import moment from 'moment';
import { dateFormat } from '../../../constants';
import ActiveButtons from '../utils/ActiveButtons';
import { ChevronDown, ChevronRight, Download } from 'lucide-react';
const data = [
    {
        id: 1,
        name: 'Ontario',
        children: [],
    },
    {
        id: 2,
        name: 'West Virginia',
        children: [],
    },
    {
        id: 3,
        name: 'New Jersey',
        children: [
            { id: 31, name: 'Certificate' },
            { id: 32, name: 'Sybol Mapping' },
        ],
    },
    {
        id: 4,
        name: 'Michigan',
        children: [],
    },
    {
        id: 5,
        name: 'New Jersey',
        children: [
            { id: 31, name: 'Certificate' },
            { id: 32, name: 'Sybol Mapping' },
        ],
    },
    {
        id: 67,
        name: 'New Jersey',
        children: [

        ],
    },
];
function DetailGame() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [active, setActive] = useState(0)
    const [volatility, setVolatility] = useState([])
    const [theme, setTheme] = useState([])
    const [folders, setFolders] = useState([])
    const [files, setFiles] = useState([])
    const [expanded, setExpanded] = useState({});

    const toggleExpand = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const swiperRef = useRef(null)
    const [dateOption, setDateOption] = useState(
        [
            {
                value: "Date",
                selected: true,
                name: "Date"
            }
        ]
    )

    const [heroSlider, setHeroSlider] = useState([
        { img: '/Images/sliderBanner.png' },
        { img: '/Images/sliderBanner.png' },
        { img: '/Images/sliderBanner.png' },
    ]);
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(false);
    const [features, setFeatures] = useState([])

    useEffect(() => {
        fetchGame();
    }, [id]);

    const fetchGame = async () => {
        setLoading(true);
        try {
            const { data } = await apiHandler.get(`/game/${id}`);
            setGame(data?.data);
            console.log(data);

            setVolatility(data?.data?.categories?.filter(q => q.type === "volatility"))
            setTheme(data?.data?.categories?.filter(q => q.type === "theme"))
            setFeatures(data?.data?.categories?.filter(q => q.type === "feature"))

        } catch (error) {
            console.error('Failed to fetch game:', error);
        } finally {
            setLoading(false);
        }
    };

    const [buttons, setButtons] = useState([

    ])
    const [rootLevels, setRootLevels] = useState([])



    const fetchRootLevels = async () => {
        let url = `games/${id}/folders`
        const { data } = await apiHandler.get(url)

        setRootLevels(data?.data?.folders || [])

        //    setFiles(data?.data?.files)





        // setUploadedFolders(data?.data?.files)
    }
    useEffect(() => {
        fetchRootLevels()
    }, [])
    useEffect(() => {
        fetchFiles()
    }, [active, rootLevels])
    const fetchFiles = async () => {
        if (rootLevels?.length === 0) return
        const folderId = rootLevels?.[active]?.id
        let url = `games/${id}/folders`
        //     const {data} = await apiHandler.get(url)
        // setFolders(data?.data?.folders||[])
        //    setFiles(data?.data?.files)
        if (folderId) {
            url += `?folder=${folderId}`
        }
        const { data } = await apiHandler.get(url)
        console.log(data);
        setFolders(data?.data?.folders)
        setFiles(data?.data?.files)

    }
    const renderFiles = (folders, files) => {
        // console.log(folders);

        return <div>
            {
                folders?.map((folder) => {

                    return (
                        <div key={folder.id}>
                            {/* Folder Row */}
                            <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                <div className="flex items-center gap-2">
                                    <button onClick={() => toggleExpand(folder.id)}>
                                        {folder?.subfolders?.length > 0 || folder.files?.length > 0 ? (
                                            expanded[folder.id] ? <ChevronDown size={18} /> : <ChevronRight size={18} />
                                        ) : (
                                            <div className="w-[18px]" />
                                        )}
                                    </button>
                                    <input type="checkbox" className="cursor-pointer" />
                                    <span className="text-sm font-medium text-black">{folder.name}</span>
                                </div>

                                <button onClick={() => { downloadById("folder", folder.id) }} className="flex bg-primary-dark hover:bg-black px-8 py-2.5 rounded-xl items-center gap-2.5 text-white" >
                                    Download <Download size={14} />
                                </button>
                            </div>

                            {/* Expanded Subfolders and Files */}
                            {expanded[folder.id] && (
                                <div className="ml-10 space-y-2">
                                    {/* Render Files */}
                                    {folder.files?.map((file) => {
                                        // console.log(file);

                                        return (
                                            <div key={file.id} className="flex items-center justify-between py-2">
                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" className="cursor-pointer" />
                                                    <span className="text-sm text-black">{file.name}</span>
                                                </div>
                                                <button onClick={() => { downloadById("file", file.id) }} className="flex bg-primary-dark hover:bg-black px-8 py-2.5 rounded-xl items-center gap-2.5 text-white" >
                                                    Download <Download size={14} />
                                                </button>
                                            </div>
                                        )
                                    })}

                                    {/* Recursive Subfolders */}
                                    {folder.subfolders?.length > 0 && renderFiles(folder.subfolders)}
                                </div>
                            )}
                        </div>
                    )
                })
            }
            {files?.map((file) => {
                // console.log(file);

                return (
                    <div key={file.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" className="cursor-pointer" />
                            <span className="text-sm text-black">{file.name}</span>
                        </div>
                        <button onClick={() => { downloadById("file", file.id) }} className="flex bg-primary-dark hover:bg-black px-8 py-2.5 rounded-xl items-center gap-2.5 text-white" >
                            Download <Download size={14} />
                        </button>
                    </div>
                )
            })}
        </div>
    };


    const zippedFileDownload = async () => {
        try {
            const response = await apiHandler.get(`/games/${id}/download-zip`, {
                responseType: 'blob',
            });

            // Extract filename from headers
            const disposition = response.headers['content-disposition'];
            let filename = 'game-files.zip'; // default fallback
            debugger

            if (disposition && disposition.includes('filename=')) {
                const match = disposition.match(/filename="?([^"]+)"?/);
                if (match && match[1]) {
                    filename = match[1];
                }
            }

            const blob = new Blob([response.data], { type: 'application/zip' });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to fetch game zip:', error);
        }
    };

    const downloadById = async (type, id) => {
        try {
            const query = type === 'file' ? `fileId=${id}` : `folderId=${id}`;
            const response = await apiHandler.get(`/download?${query}`, {
                responseType: 'blob',
            });

            const disposition = response.headers['content-disposition'];
            let filename = type === 'file' ? 'file' : 'folder.zip';

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
    const selectedFilesDownload = async () => {
        try {
            const response = await apiHandler.post(
                'download-selected',
                {
                    gameId: 28,
                    folderIds: [183, 184],
                    fileIds: [],
                },
                {
                    responseType: 'blob',
                }
            );

            const blob = new Blob([response.data], { type: 'application/zip' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');

            link.href = url;
            link.download = 'selected_assets.zip'; // Optional: name it based on game title
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };




    return (
        <>
            <div className=' pt-1 '>
                <div className='mt-10'>
                    <div className='flex gap-5 items-stretch'>
                        <div className='w-full md:w-1/2 flex flex-col'>
                            <h1 className='text-4xl font-medium'>{game?.title}</h1>
                            <p className='mt-4 mb-4 text-base'>By: {game?.studio?.name}</p>

                            <div className='space-y-6 flex-grow'>
                                <p className='text-lg text-black-v3 max-w-[650px] w-full'>
                                    {game?.description}
                                </p>
                            </div>
                        </div>

                        <div className='w-full md:w-1/2 flex flex-col'>
                            <div className='flex-grow'>
                                <Swiper
                                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                                    modules={[Pagination, Autoplay]}
                                    loop={true}
                                    autoplay
                                    spaceBetween={50}
                                    slidesPerView={1}
                                >
                                    {heroSlider.map((slide, index) => (
                                        <SwiperSlide key={index}>
                                            <div className='relative'>
                                                <img className='h-80 w-full' src={slide.img} alt='' />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                <div className='flex justify-center space-x-2 mt-4'>
                                    {heroSlider.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => swiperRef.current?.slideToLoop(index)}
                                            className={`w-2.5 h-2.5 rounded-full ${activeIndex === index
                                                ? 'w-20 h-2.5 rounded-xl bg-primary-dark'
                                                : 'bg-black-v4'
                                                }`}
                                        ></button>
                                    ))}
                                </div>
                            </div>

                            <div className='w-full mt-5'>
                                <Buttons className='w-full'>Play Game</Buttons>
                            </div>
                        </div>
                    </div>


                </div>



                <div className='mt-14 md:w-full'>
                    <div className='bg-black rounded-3xl w-full p-12 '>
                        <div className='flex justify-between items-center  gap-10  '>
                            <div className='flex flex-col items-center justify-between'>
                                <p className='font-semibold text-3xl text-white mb-1.5'>{game?.categories?.find(q => q.type === "gameType")?.title}</p>
                                <p className='font-semibold text-xl text-black-v4 leading-[36px]'>Game Type</p></div>

                            <div className='flex flex-col items-center justify-between'>
                                <p className='font-semibold text-3xl text-white mb-1.5'>{game?.paylines} Paylines</p>
                                <p className='font-semibold text-xl text-black-v4 leading-[36px]'>Lines / Ways</p>
                            </div>

                            <div className='flex flex-col items-center justify-between'>
                                <p className='font-semibold text-3xl text-white mb-1.5'>{game?.realType}</p>
                                <p className='font-semibold text-xl text-black-v4 leading-[36px]'>Reel Type</p>
                            </div>


                            <div className='border-2 text-white p-4 border-black-v3 rounded-lg  flex flex-col items-center justify-between' >
                                <h6>Release Date</h6>
                                {moment(game?.releaseDate).format(dateFormat)}
                            </div>


                            <div className='flex flex-col items-center justify-between'>
                                <img src={"/Images/platform.png"} alt="" className='w-32 h-10 mb-1.5' />
                                <p className='font-semibold text-xl text-black-v4 leading-[36px]'>Platform</p>
                            </div>

                        </div>


                    </div>
                </div>


                <div className='mt-20'>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-12 mt-10 text-[16px] leading-[24px] text-[#1A1A1A]">
                        {/* Column 1 */}
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <p className="text-[#7C7C7C] font-medium mb-2">Bet Values</p>
                                <p className="font-semibold">Min – € {game?.min}</p>
                                <p className="font-semibold">Max – € {game?.max}</p>
                            </div>

                            <div className="mt-10">
                                <p className="text-[#7C7C7C] font-medium mb-2">Max Exposure</p>   ``
                                <p className="font-semibold">{game?.maxExposure}</p>
                            </div>

                            <div className="mt-16">
                                <p className="text-[#7C7C7C] font-medium mb-2">Free Spins Symbols</p>
                                <p className="font-semibold">{game?.freeSpins ? 'YES' : 'NO'}</p>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <p className="text-[#7C7C7C] font-medium mb-2">Volatility:</p>
                                {volatility?.map((v) => (
                                    <p key={v.id} className="font-semibold">{v.title}</p>
                                ))}
                            </div>

                            <div className="mt-16">
                                <p className="text-[#7C7C7C] font-medium mb-2">Game Theme</p>
                                <p className="font-semibold whitespace-pre-line">
                                    {theme?.map((e) => e.title).join(', ')}
                                </p>
                            </div>

                            <div className="mt-16">
                                <div className="bg-[#00FF7F] text-black font-semibold rounded-xl px-4 py-2.5 flex items-center gap-2 w-fit">
                                    <span>Game Key</span>
                                    <img src="/logos/filterarrowBlack.png" alt="Arrow" className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        {/* Column 3 */}
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <p className="text-[#7C7C7C] font-medium mb-2">RTP</p>
                                {Array(4)
                                    .fill(0)
                                    .map((_, i) => (
                                        <p key={`rtp-${i}`} className="font-semibold">Var_99&nbsp;&nbsp;&nbsp;96.66%</p>
                                    ))}
                            </div>

                            <div className="mt-16">
                                <p className="text-[#7C7C7C] font-medium mb-2">RTP USA</p>
                                {Array(4)
                                    .fill(0)
                                    .map((_, i) => (
                                        <p key={`rtp-usa-${i}`} className="font-semibold">Var_99&nbsp;&nbsp;&nbsp;96.66%</p>
                                    ))}
                            </div>
                        </div>

                        {/* Column 4 */}
                        <div className="flex flex-col h-full">
                            <p className="text-[#7C7C7C] font-medium mb-2">Special Features</p>
                            {/* <div className="space-y-1">
      {features?.map((feature) => (
        <p key={feature.id} className="font-semibold">{feature.title}</p>
      ))}
    </div> */}
                            <div className="space-y-1">

                                <p className="font-semibold">Unlock Feature</p>
                                <p className="font-semibold">Unlock Feature</p>
                                <p className="font-semibold">Unlock Feature</p>
                                <p className="font-semibold">Unlock Feature</p>
                                <p className="font-semibold">Unlock Feature</p>
                                <p className="font-semibold">Unlock Feature</p>
                                <p className="font-semibold">Unlock Feature</p>
                                <p className="font-semibold">Unlock Feature</p>
                                <p className="font-semibold">Unlock Feature</p>
                                <p className="font-semibold">Unlock Feature</p>
                                <p className="font-semibold">Unlock Feature</p>
                                <p className="font-semibold">Unlock Feature</p>


                            </div>
                        </div>
                    </div>

                </div>



                <div className='bg-white-v2 rounded-3xl mt-24 space-y-7 py-12 px-8 mb-20'>
                    <h1 className='font-medium text-4xl  text-center'>Download all necessary assets and certificates below</h1>
                    <div className=''>

                        {
                            <ActiveButtons active={active} setActive={setActive} buttons={rootLevels} />
                        }

                    </div>

                    <div>
                        {
                         <div className="bg-white rounded-lg p-10">
                                <div className="flex justify-end gap-7 mb-4">
                                    <Buttons onClick={selectedFilesDownload}  >Download Selected</Buttons>
                                    <Buttons onClick={zippedFileDownload}>Download All</Buttons>
                                </div>

                                <hr className="border-1 border-[#A8A8A8] mb-5" />

                                <div className="space-y-1 max-h-[400px] overflow-y-auto">
                                    {renderFiles(folders, files)}
                                </div>
                            </div>

                        }
                    </div>
                </div>


            </div>

        </>
    )
}

export default DetailGame