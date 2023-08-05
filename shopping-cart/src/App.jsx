import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Cart from './components/Cart'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App
