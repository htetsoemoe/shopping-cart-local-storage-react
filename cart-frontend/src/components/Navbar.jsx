import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const cartItems = useSelector(state => state.cartSlice.cartItems)
  //console.log(cartItems);

  return (
    <div>
      <nav className="bg-slate-900 mr-3 h-16 mx-auto p-5 flex justify-between items-center border-b-4 w-full fixed top-0 z-30">
        <Link to={"/"}>
          <h2 className='font-nunito font-semibold text-white text-3xl ml-7 hover:text-cyan-300'>Café Mötö</h2>
        </Link>

        <div className="flex justify-center items-center gap-5">
          <Link to={"/admin"}>
            <p className="text-white text-lg font-nunito hover:text-cyan-300 transform duration-500 hover:-translate-y-1">Admin</p>
          </Link>

          <Link to={"/cart"}>
            <div className="flex text-white relative pr-7 hover:text-cyan-300 transform duration-500 hover:-translate-y-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
              {
                cartItems.length === 0 ? (
                  ''
                ): (
                  <span className = "absolute bottom-4 left-7 bg-red-500 text-white w-5 text-center rounded-full">
                      <span className='item'>{cartItems.length}</span>
                  </span>
                )
              }
        </div>
      </Link>
    </div>
      </nav >
    </div >
  )
}

export default Navbar
