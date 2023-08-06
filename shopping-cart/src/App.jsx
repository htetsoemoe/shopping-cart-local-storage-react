import React from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Cart from './components/Cart'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/cart' element={<Cart />} />
        <Route path='/' element={<Home />} />
        <Route path='/not-found-page' element={<NotFound />} />
        <Route path='*' element={<Navigate to="/not-found-page" />} />
      </Routes>
    </div>
  )
}

export default App
