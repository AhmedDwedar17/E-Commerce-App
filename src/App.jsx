import React, { useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import NotFound from './Components/NotFound/NotFound'
import Logout from './Components/Logout/Logout'
import { tokenContext } from './Context/TokenContext'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import Brands from './Components/Brands/Brands'
import Categories from './Components/Categories/Categories'
import ProtectedAuth from './Components/ProtectedAuth/ProtectedAuth'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Payment from './Components/Payment/Payment'
import AllOrders from './Components/AllOrders/AllOrders'

export default function App() {

  let {setToken} = useContext(tokenContext)

  useEffect(() => {
    if(localStorage.getItem("userToken")){
      setToken(localStorage.getItem("userToken"))
    }
  },[])


  let routes = createBrowserRouter([{
      path:"", element:<Layout/>, children:([
      {index:true, element:<ProtectedRoutes><Home/></ProtectedRoutes>},
      {path:"register", element:<ProtectedAuth><Register/></ProtectedAuth>},
      {path:"login", element:<ProtectedAuth><Login/></ProtectedAuth>},
      {path:"products", element:<ProtectedRoutes><Products/></ProtectedRoutes>},
      {path:"brands", element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
      {path:"categories", element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
      {path:"cart", element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
      {path:"payment", element:<ProtectedRoutes><Payment/></ProtectedRoutes>},
      {path:"allorders", element:<ProtectedRoutes><AllOrders/></ProtectedRoutes>},
      {path:"details/:id", element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
      {path:"logout", element:<Logout/>},
      {path:"*", element:<NotFound/>}
    ]) 
  }])
  return (
    <div>
      <RouterProvider router={routes}></RouterProvider>

    </div>
  )
}
