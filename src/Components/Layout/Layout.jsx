import React from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

export default function Layout() {
  return (
    <>
    <NavBar/>
    <Outlet/>
    <Toaster/>
    <Footer/>
    </>
  )
}
