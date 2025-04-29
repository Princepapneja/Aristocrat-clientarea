import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './src/pages/dashboard';
import DashboardLayout from './src/layout/DashboardLayout';
import AddForm from './src/components/dashboard/AddForm';
import AllTables from './src/components/dashboard/AllTables';
import RootLayout from './src/layout/RootLayout';
import Login from './src/pages/login';
import Hierarchy from './src/components/dashboard/chat/hierarchy';
import Certificates from './src/components/dashboard/certificates';
import MasterGame from './src/components/dashboard/MasterGame';
import ContactUs from './src/components/dashboard/ContactUs';
import Roadmaps from './src/components/dashboard/Roadmaps';


const Route = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout/>,
            children:[
                {
                    path: '/',
                    element:<Login type={"login"}/>
                },
                {
                    path: '/forgot-password',
                    element: <Login type={"forgot pass"}/>
                },
                        {
                            path: '/dashboard',
                            element: <DashboardLayout />,
                            children:[
                                {
                                    path: '/dashboard',
                                    element:  <Dashboard />,
                                },
                               
                                {
                                    path:'/dashboard/certificates',
                                    element:<Certificates/>
                                },
                                {
                                    path:'/dashboard/master-game-list',
                                    element:<MasterGame/>
                                },
                                {
                                    path:'/dashboard/contact-us',
                                    element:<ContactUs/>
                                },
                                {
                                    path:'/dashboard/roadmaps',
                                    element:<Roadmaps/>
                                }
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
