import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './src/layout/DashboardLayout';
import RootLayout from './src/layout/RootLayout';
import Login from './src/pages/login';
import Certificates from './src/components/dashboard/certificates';
import MasterGame from './src/components/dashboard/MasterGame';
import ContactUs from './src/components/dashboard/ContactUs';
import Roadmaps from './src/components/dashboard/Roadmaps';
import GamePage from './src/components/dashboard/GamePage';
import EngagementTools from './src/components/dashboard/EngagementTools';
import Homepage from './src/components/dashboard/Homepage';
import DetailGame from './src/components/dashboard/DetailGame';
import FolderUploader from './src/components/dashboard/fileUploader';
import SignUp from './src/pages/SignUp';
import ForgotPassword from './src/pages/ForgotPassword';
import GameAssets from './src/components/dashboard/GameAssets';
import ProtectedRoute from './src/components/auth/ProtectedRoute';
import CreatePassword from './src/pages/CreatePassword';


const Route = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout/>,
            children:[
                {
                    path: '/',
                    element:<Login   />
                },

                
                {
                    path: '/forgot-password',
                    element: <ForgotPassword />
                },
                  {
                    path: '/change-password',
                    element: <CreatePassword />
                },
                {
                    path: '/sign-up',
                    element: <SignUp />
                },
                        {
                            path: '/dashboard',
                            element: <DashboardLayout />,
                            children:[
                                {
                                    path: '/dashboard',
                                    element:<ProtectedRoute> <Homepage /></ProtectedRoute>  ,
                                },
                               
                                {
                                    path:'/dashboard/certificates',
                                    element:<ProtectedRoute><Certificates/></ProtectedRoute>
                                },
                                 {
                                    path:'/dashboard/game-assets',
                                    element:<ProtectedRoute><GameAssets/></ProtectedRoute>
                                },
                                {
                                    path:'/dashboard/master-game-list',
                                    element:<ProtectedRoute><MasterGame/></ProtectedRoute>
                                },
                                {
                                    path:'/dashboard/support',
                                    element:<ProtectedRoute><ContactUs/></ProtectedRoute>
                                },
                                {
                                    path:'/dashboard/roadmaps',
                                    element:<ProtectedRoute><Roadmaps/></ProtectedRoute>
                                },
                                {
                                    path:'/dashboard/games',
                                    element:<ProtectedRoute><GamePage/></ProtectedRoute>
                                },
                                {
                                    path:'/dashboard/engagement-tools',
                                    element:<ProtectedRoute><EngagementTools/></ProtectedRoute>
                                },
                                {
                                    path:'/dashboard/home',
                                    element:<ProtectedRoute><Homepage/></ProtectedRoute>
                                },
                                {
                                  path:"/dashboard/detail-game/:id",
                                  element:<ProtectedRoute><DetailGame /></ProtectedRoute>
                                },
                                {
                                  path:"/dashboard/test",
                                  element:<ProtectedRoute><FolderUploader /></ProtectedRoute>
                                },
                               

                                
                              
                                // {
                                //     path: '/dashboard/manage-categories',
                                //     element: <AllTables  type="categories"/>
                                // },
                                // {
                                //     path: '/dashboard/questions',
                                //     element:<QuestionSection/>
                                // }
                            ]
                        },
                
            ]
        },
       
       
        
    ]);

    return (
            <RouterProvider router={router} />
    );
}

export default Route;
