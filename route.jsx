// import  {  Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './src/pages/dashboard';
import DashboardLayout from './src/layout/DashboardLayout';
import AddForm from './src/components/dashboard/AddForm';
import AllTables from './src/components/dashboard/AllTables';
import RootLayout from './src/layout/RootLayout';
import Login from './src/pages/login';
import Hierarchy from './src/components/dashboard/chat/hierarchy';


const Route = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout/>,
            children:[
                {
                    path: '/login',
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
                                    path: '/dashboard/add-clinician',
                                    element:  <AddForm  text={"add new clinician"} type="clinician"/>
                                },
                                {
                                    path: '/dashboard/manage-clinician',
                                    element: <AllTables type={"clinician"} />
                                },
                                {
                                    path: '/dashboard/add-patient',
                                    element: <AddForm text={"add new patient"} type="patient" />
                                },
                                {
                                    path: '/dashboard/manage-patient',
                                    element: <AllTables type={"patients"} />
                                },
                                // {
                                //     path: '/dashboard/new-appointment',
                                //     element: <NewAppointment />
                                // },
                                {
                                    path: '/dashboard/all-appointment',
                                    element: <AllTables type={"appointments"} />
                                },
                                // {
                                //     path: '/dashboard/mass-health',
                                //     element: <AllTables type={"mass health"} />
                                // },
                                {
                                    path: '/dashboard/metric-survey',
                                    element: <AllTables type={"metric survey"} />
                                },
                                {
                                    path: '/dashboard/mood-survey',
                                    element: <AllTables type={"mood survey"} />
                                },
                                {
                                    path: '/dashboard/new-article',
                                    element: <AddForm type={"blog"} text="add new article" />
                                },
                                {
                                    path: '/dashboard/all-articles',
                                    element: <AllTables text="Articles" type={"blogs"} />
                                },
                                {
                                    path: '/dashboard/profile',
                                    element: <AddForm text={"My profile"} type="profile"/>
                                },
                                {
                                    path: '/dashboard/chat-bot',
                                    element: <Hierarchy/>
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
