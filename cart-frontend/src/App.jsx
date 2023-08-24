import React from 'react'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Cart from './components/Cart'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import Admin from './components/Admin'
import ProductEdit from './components/ProductEdit'

const App = () => {
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Routes >
        <Route path='/admin' element={<Admin />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/edit/:id' element={<ProductEdit />}/>
        <Route path='/' element={<Home />} />
        <Route path='/not-found-page' element={<NotFound />} />
        <Route path='*' element={<Navigate to="/not-found-page" />} />
      </Routes>
    </div>
  )
}

export default App
