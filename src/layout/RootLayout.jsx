
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from "react";
import LoadingBar from 'react-top-loading-bar';
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/utils/loader';
import apiHandler from '../functions/apiHandler';
const RootLayout = () => {
  const navigate = useNavigate()
  const [height, setHeight] = useState(0);
  const [token, setToken] = useState(null);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [counts, setCounts] = useState()
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [disable, setDisable] = useState(false)
  const [render, setRender] = useState(false)
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [mainLoader, setMainLoader] = useState(false)
  
 const [collapsed, setCollapsedState] = useState(() => {
  const stored = localStorage.getItem('sidebarCollapsed');
  return stored === 'true';
});

const setCollapsed = (value) => {
  localStorage.setItem('sidebarCollapsed', value);
  setCollapsedState(value);
};

  
  const success = (msg) => toast.success(msg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
  const error = (msg) => toast.error(msg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });

  useEffect(() => {

    const locToken = localStorage.getItem('token')
    if (!locToken) {
      return
    }
    setToken(locToken)

    
  }, [mainLoader]);

  
  const navElement = document.querySelector(".nav");
  const fetchNavHeight = () => {
    if (navElement) {
      setHeight(navElement.scrollHeight);
    }

  };
 useEffect(()=>{
  fetchNavHeight()
 },[navElement])

const [regions,setRegions]=useState([])
  const [studios, setStudios] = useState([])

      const dropdownDefaults = (label) => [
        { value: label, selected: true, name: label }
    ];

    
   const [dropdowns, setDropdowns] = useState({
        volatilityOption: dropdownDefaults('Volatility'),
        themeOption: dropdownDefaults('Theme'),
        featuresOption: dropdownDefaults('Feature'),
        familyOption: dropdownDefaults('Family'),
        gameTypeOption: dropdownDefaults('Game Type'),
        jackpotOption: dropdownDefaults('Jackpot'),
    });


const loggedUser=localStorage.getItem("token")

     const fecthRegions = async () => {
  if (!loggedUser) return;

        try {
            const { data } = await apiHandler.get(`/regions/`);
            
            // const newSubstudio = data?.data?.map((e) => {
            //     return {
            //         name: e?.name,
            //         id: e?.id,
                    
            //     }
            // }) || [];
            //  setRegion([
            //     { name: "Select SubStudio", id: "", },
            //     ...newSubstudio
            // ]);
            // setGames((prev) => (filters.skip === 0 ? newGames : [...prev, ...newGames]));
            // setHasMore((filters.skip + filters.limit) < data.data.total);
            setRegions(data.data);
        } catch (error) {
            console.error('Failed to fetch games:', error);
        }
    };

     const fetchStudios = async () => {
       if (!loggedUser) return;
        try {
            const { data } = await apiHandler.get("sub-studios");
            
            const options = data?.data?.map((e) => ({ name: e.name, value: e.id }));
            setStudios([ ...options]);
        } catch (error) {
            console.error(error);
        }
    }

        const fetchCategories = async () => {
       if (!loggedUser) return;

        try {
            const { data } = await apiHandler.get("categories");
            const categories = data?.data || [];
            console.log(categories);


            const options = (type) => {
                console.log(type);
                
                const items = categories?.filter((q) => q.type === type).map((e) => ({ name: e.title, value: e.id }))
                return [ ...items]
            }

            
            setDropdowns({
                volatilityOption: options("volatility"),
                themeOption: options("theme"),
                featuresOption: options("feature"),
                jackpotOption: options("jackpots"),
                gameTypeOption: options("gameType"),
                familyOption: options("family"),
            });
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(()=>{
fecthRegions()
fetchStudios()
fetchCategories()

    },[loggedUser])

  return (
    <>
      {/* <Header/> */}
      <ToastContainer position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce />
      <LoadingBar
        color="#007bff"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {
        mainLoader &&
        <Loader />
      }
      <main className="">
        <Outlet context={{ collapsed, setCollapsed,disable, setDisable, availableQuestions, setAvailableQuestions, mainLoader, setMainLoader, user, counts, setCounts, navigate, token, setToken, setUser, render, setRender, height, success, error, progress, setProgress, sideBarOpen, setSideBarOpen,regions,studios,dropdowns}} />
      </main>
      {/* <Footer/> */}
    </>
  )
}

export default RootLayout;