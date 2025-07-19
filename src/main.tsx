import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import CreateRoom from './teacher-view/CreateRoom'
import JoinRoom from './student-view/JoinRoom'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path : '/',
    element: <JoinRoom/>
  },
  {
    path : 'teacher/create-room',
    element: <CreateRoom/>
  }
  // {
  //   path : '/',
  //   element: <App />,
  //   errorElement: <NotFoundPage/>
  // },
  // {
  //   path : '/profiles',
  //   element: <Profiles />,
  //   children: [
  //     {
  //       path: '/profiles/:profileId',
  //       element : <Profile />
  //     }
  //   ]
  // }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
