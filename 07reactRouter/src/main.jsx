import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Layout from './Layout.jsx'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import AboutUs from './components/AboutUs/AboutUs'
import Home from './components/Home/Home'
import User from './components/User/User'
import Github, { githubInfoLoader } from './components/Github/Github.jsx'

//ANOTHER METHOD TO CREATE ROUTE


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<AboutUs />} />
      <Route path='user/:userid' element={<User />} />
      <Route
        loader={githubInfoLoader}
        path='Github' element={<Github />} />
    </Route>
  )
)


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />

//       },
//       {
//         path: "/about",
//         element: <AboutUs />
//       }
//     ]
//   }
// ])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
