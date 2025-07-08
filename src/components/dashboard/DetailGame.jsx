import React, { act, useEffect, useRef, useState } from 'react'
import Buttons from '../utils/buttons'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import apiHandler from '../../functions/apiHandler';
import moment from 'moment';
import { baseUrl, dateFormat } from '../../../constants';
import ActiveButtons from '../utils/ActiveButtons';
import { ChevronDown, ChevronRight, Download, X } from 'lucide-react';
import Mobile from '../../assets/logos/phone.svg'
import Tab from '../../assets/logos/tablet.svg'
import Casino from '../../assets/logos/slot_machine.svg'
import Pc from '../../assets/logos/Desktop.svg'
import { toast, ToastContainer } from 'react-toastify';
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
    const [showPopup, setShowPopup] = useState(false);

    const toggleExpand = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const swiperRef = useRef(null)


    const [heroSlider, setHeroSlider] = useState([
        { img: '/Images/sliderBanner.png' },
        { img: '/Images/sliderBanner.png' },
        { img: '/Images/sliderBanner.png' },
    ]);
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(false);
    const [features, setFeatures] = useState([])


    const [showReleaseDropdown, setShowReleaseDropdown] = useState(false);
    const [selectedRelease, setSelectedRelease] = useState({
        country: 'General Release Date',
        date: moment(game?.releaseDate).format('DD MMM, YYYY'),
    });

    const [releaseDates, setReleaseDates] = useState([]);




    useEffect(() => {
        fetchGame();
    }, [id]);
    const handleDownload = async (name, type) => {
        try {
            const folder = buttons?.[active]?.key;

            if (!id || !name || !type || !folder) {
                console.warn("Missing required parameters");
                return;
            }

            const url = `/games/${id}/download?type=${type}&name=${encodeURIComponent(name)}&folder=${folder}`;
            debugger

            const response = await apiHandler.get(url, {
                responseType: 'blob', // Needed to process binary data (zip or file)
            });

            // Extract filename from response headers or fallback
            const contentDisposition = response.headers['content-disposition'];
            let filename = `${name}.zip`; // fallback to zipped folder name
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="?([^"]+)"?/);
                if (match?.[1]) {
                    filename = match[1];
                }
            }
            // Create a download link
            const blob = new Blob([response.data]);
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };


    const fetchGame = async () => {
        setLoading(true);
        try {
            const { data } = await apiHandler.get(`/game/${id}`);
            setGame(data?.data);
            console.log(data);

            setVolatility(data?.data?.categories?.filter(q => q.type === "volatility"))
            setTheme(data?.data?.categories?.filter(q => q.type === "theme"))
            setFeatures(data?.data?.categories?.filter(q => q.type === "feature"))

            const formattedReleaseDates = (data?.data?.Countries || []).map(item => ({
                country: item?.name,
                date: moment(item?.GameCountryRelease?.date).format('DD MMM, YYYY'),
            }));

            setReleaseDates(formattedReleaseDates);

            // console.log(formattedReleaseDates);


        } catch (error) {
            console.error('Failed to fetch game:', error);
        } finally {
            setLoading(false);
        }
    };
    // const fetchFiles = async () => {
    //     try {
    //         const { data } = await apiHandler.get(`files/${id}?type=${buttons?.[active]?.key}`)
    //         setFiles(data?.data)
    //     } catch (error) {


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

                                <Buttons spinner
                                    onClick={() => downloadById("folder", folder)}
                                >
                                    <div className='flex gap-2 items-center '>
                                        <span>Download</span> <Download size={14} />
                                    </div>
                                </Buttons>
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
                                                <Buttons spinner
                                                    onClick={() => downloadById("file", file)}
                                                >
                                                    <div className='flex gap-2 items-center '>
                                                        <span>Download</span> <Download size={14} />
                                                    </div>
                                                </Buttons>


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
                        <Buttons spinner
                            onClick={() => downloadById("file", file)}
                        >
                            <div className='flex gap-2 items-center '>
                                <span>Download</span> <Download size={14} />
                            </div>
                        </Buttons>
                    </div>
                )
            })}
        </div>
    };


    const zippedFileDownload = async () => {
          toast.success("Your file is downloading");
        try {
            const response = await apiHandler.get(`/games/${id}/download-zip`, {
                responseType: 'blob',
            });

            // Extract filename from headers
            const disposition = response.headers['content-disposition'];
            let filename = 'game-files.zip'; // default fallback


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
              toast.error("Download failed");
            console.error('Failed to fetch game zip:', error);
        }
    };


    const [downloading, setDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);


    const downloadById = async (type, item) => {
        setDownloading(true);
        setDownloadProgress(0);
        toast.success("Your file is downloading");

        try {
            const query = type === 'file' ? `fileId=${item?.id}` : `folderId=${item?.id}`;
            const response = await apiHandler.get(`/download?${query}`, {
                responseType: 'blob',
            });

            const disposition = response.headers['content-disposition'];
            let filename = item?.name;

            if (disposition && disposition.includes('filename=')) {
                const match = disposition.match(/filename="?([^"]+)"?/);
                if (match && match[1]) filename = match[1];
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

            // 
        } catch (error) {
            console.error('Download failed:', error);
            toast.error("Download failed");
        } finally {
            setDownloading(false);
        }
    };


    const selectedFilesDownload = async () => {
                toast.success("Your file is downloading");
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
            link.download = 'selected_assets.zip';
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
              toast.error("Download failed");
            console.error('Download failed:', error);
        }
    };




    return (
        <>
            <div className=' pt-1 '>
                <div className='container mt-10'>
                    <div className='flex flex-col-reverse md:flex-row gap-5 items-stretch'>
                        <div className='w-full md:w-1/2 flex flex-col'>
                            <h1 className='text-4xl font-medium'>{game?.title}</h1>
                            <p className='mt-4 mb-4 text-base'>By: {game?.studio?.name}</p>

                            <div className='space-y-6 flex-grow overflow-auto max-h-[300px]'>
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



                <div className='container mt-14 md:w-full'>
                    <div className='bg-black rounded-3xl w-full p-10 '>
                        <div className='flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center  gap-10  '>
                            <div className='flex flex-col items-start md:items-center justify-between'>
                                <p className='font-semibold text-3xl text-white mb-1.5'>{game?.categories?.find(q => q.type === "gameType")?.title}</p>
                                <p className='font-semibold text-xl text-black-v4 leading-[36px]'>Game Type</p></div>

                            <div className='flex flex-col items-start md:items-center justify-between'>
                                <p className='font-semibold text-3xl text-white mb-1.5'>{game?.livesWays}</p>
                                <p className='font-semibold text-xl text-black-v4 leading-[36px]'>Lines / Ways</p>
                            </div>

                            <div className='flex flex-col items-start md:items-center justify-between'>
                                <p className='font-semibold text-3xl text-white mb-1.5'>{game?.realType}</p>
                                <p className='font-semibold text-xl text-black-v4 leading-[36px]'>Reel Type</p>
                            </div>


                            <div className=' relative p-4 border-2 text-white  border-black-v3 rounded-lg  flex flex-col items-start md:items-center justify-between' >
                                <div
                                    className=" w-full"
                                    onClick={() => setShowReleaseDropdown(!showReleaseDropdown)}
                                >
                                    <p className="text-[#00B290] font-semibold text-sm mb-1">Release Date</p>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-white text-sm">{selectedRelease.country}</p>
                                            <p className="text-white text-lg font-bold">{selectedRelease.date}</p>
                                        </div>
                                        <ChevronDown className="text-white w-5 h-5" />
                                    </div>
                                    {showReleaseDropdown && (
                                        <div className="absolute mt-6 left-0   w-full max-h-[180px] bg-white shadow-lg rounded-md overflow-y-auto z-20">
                                            {releaseDates.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedRelease.country === item.country &&
                                                        selectedRelease.date === item.date
                                                        ? 'font-bold text-black'
                                                        : 'text-gray-400'
                                                        }`}
                                                    onClick={() => {
                                                        setSelectedRelease(item);
                                                        setShowReleaseDropdown(false);
                                                    }}
                                                >
                                                    <p>{item.country}</p>
                                                    <p>{item.date}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>


                            <div className='flex flex-col items-start md:items-center justify-between not-first:'>

                                <div className='flex item-center gap-2'>
                                    {
                                        game?.ps && <img src={Tab} alt="" />
                                    }

                                    {
                                        game?.pc && <img src={Pc} alt="" />
                                    } {
                                        game?.phone && <img src={Mobile} alt="" />
                                    }
                                    {
                                        game?.casino && <img src={Tab} alt="" />
                                    }




                                </div>


                                <p className='font-semibold text-xl text-black-v4 leading-[36px]'>Platform</p>
                            </div>

                        </div>


                    </div>
                </div>


                <div className='container mt-20'>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-12 mt-10 text-[16px] leading-[24px] text-[#1A1A1A]">
                        {/* Column 1 */}
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <p className="text-[#7C7C7C] font-medium mb-2">Bet Values</p>
                                <p className="font-semibold">Min – € {game?.min}</p>
                                <p className="font-semibold">Max – € {game?.max}</p>
                            </div>

                            <div className="mt-10">
                                <p className="text-[#7C7C7C] font-medium mb-2">Max Exposure</p>
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
                                <div className="bg-[#00FF7F] text-black font-semibold rounded-xl px-4 py-2.5 flex items-center gap-2 w-fit cursor-pointer" onClick={() => setShowPopup(true)}>
                                    <span>Game Key</span>
                                    <img src="/logos/filterarrowBlack.png" alt="Arrow" className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        {/* Column 3 */}
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <p className="text-[#7C7C7C] font-medium mb-2">RTP</p>
                                {Object.entries(game?.rtpVersions?.rtp || {}).map(([key, value], i) => (
                                    <p key={`rtp-${i}`} className="font-semibold">
                                        {key}&nbsp;&nbsp;&nbsp;{value}
                                    </p>
                                ))}

                            </div>

                            <div className="mt-16">
                                <p className="text-[#7C7C7C] font-medium mb-2">RTP USA</p>
                                {Object.entries(game?.rtpVersions?.rtpUsa || {}).map(([key, value], i) => (
                                    <p key={`rtp-${i}`} className="font-semibold">
                                        {key}&nbsp;&nbsp;&nbsp;{value}
                                    </p>
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

                                {
                                    features?.map((item) => {
                                        return (
                                            <p className="font-semibold" key={item?.id}>{item?.title}</p>

                                        )




                                    })
                                }





                            </div>
                        </div>
                    </div>

                </div>



                <div className='container bg-white-v2 rounded-3xl mt-24 space-y-7 py-12 px-8 mb-20'>
                    <h1 className='font-medium text-4xl  text-center'>Download all necessary assets and certificates below</h1>
                    <div className=''>

                        {
                            <ActiveButtons active={active} setActive={setActive} buttons={rootLevels} className={"grid grid-cols-2 md:grid-cols-4 gap-4"} />
                        }

                    </div>

                    <div>
                        {
                            <div className="bg-white rounded-lg p-3 md:p-10">
                                <div className="flex flex-col md:flex-row justify-end gap-7 mb-4">
                                    
                                    <Buttons spinner  onClick={selectedFilesDownload} className="w-full cursor-pointer"  >Download Selected</Buttons>
                                    <Buttons spinner onClick={zippedFileDownload} className="w-full cursor-pointer" >Download All</Buttons>
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

            {showPopup && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center w-full">
                    <div
                        className="bg-white rounded-[15px] shadow-lg p-6 w-[80%] h-[80%] md:h-auto md:w-[25%]  transform transition-all duration-300 translate-y-10 opacity-0 animate-popup"
                    >
                        <div className='flex items-baseline justify-end '>
                            <X
                                size={30}
                                className="text-black cursor-pointer hover:text-black border-1 border-[#000000] rounded-[10px]"
                                onClick={() => setShowPopup(false)}
                            />
                        </div>
                        <p>{game?.gameKey}</p>

                    </div>
                </div>
            )}

        </>
    )

}

export default DetailGame