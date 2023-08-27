import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BsPlusCircleFill } from 'react-icons/bs'
import { FaCircleMinus } from 'react-icons/fa6'
import { addToCart, decreaseItemFromCart, getBalance } from '../redux/services/cartSlice'

const Cart = () => {
  const cartSlice = useSelector(state => state.cartSlice)
  const cartItems = useSelector(state => state.cartSlice.cartItems)
  const cartSubTotal = useSelector(state => state.cartSlice.cartSubTotal)
  const cartTotalAmount = useSelector(state => state.cartSlice.cartTotalAmount)

  // US currency format for product price
  let UsDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBalance())
  }, [cartSlice, dispatch])

  // handlers
  const addProductHandler = (product) => {
    dispatch(addToCart(product))
  }

  const decreaseItemCart = (product) => {
    dispatch(decreaseItemFromCart(product))
  }

  return (
    <div className='mt-24' >
      <div className="flex justify-center items-center mb-12">
        <h1 className='text-2xl text-white font-semibold'>Shopping Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex justify-center items-center gap-7">
          <span className='text-3xl text-yellow-200 font-semibold mr-7'>Empty Cart!</span>
          <Link to="/">
            <button className="px-5 py-2 bg-lime-400 hover:bg-lime-500 rounded font-semibold">To Store</button>
          </Link>
        </div>
      ) : (
        <div className=''>
          {cartItems?.map(item => {
            return (
              <div key={item?.id} className="flex justify-center items-center p-3 gap-24 mb-8">
                <div className="flex justify-center items-center gap-16 w-96">
                  <img src={item?.image} alt={item?.name} className="w-[70px] h-[50px] rounded " />
                  <div className="text-white">{item?.name}</div>
                  <div className="text-white font-bold text-xl">{UsDollar.format(item?.price)}</div>
                </div>
                <div className="flex justify-center items-center gap-3 w-40">
                  <div className="cursor-pointer select-none">
                    <FaCircleMinus onClick={() => decreaseItemCart(item)}
                      className='text-2xl text-yellow-300 font-bold' />
                  </div>
                  <div className="text-white text-2xl font-semibold">
                    {item?.cartQuantity}
                  </div>
                  <div className="cursor-pointer select-none">
                    <BsPlusCircleFill onClick={() => addProductHandler(item)}
                      className='text-2xl text-green-600 font-bold' />
                  </div>
                </div>
                <div className="flex justify-center items-center gap-16 w-40">
                  <div className="text-white font-bold text-xl">
                    {UsDollar.format(item.price * item.cartQuantity)}
                  </div>
                </div>
              </div>
            )
          })}

          <div className="flex justify-evenly items-start mt-10">
            <div className="">
              <p className='px-3 py-2 bg-red-700 hover:bg-red-500 cursor-pointer rounded text-white'>Clear Cart</p>
            </div>
            <div className="flex flex-col gap-3 w-96">
              <div className="flex justify-end items-end gap-40">
                <h1 className='text-white text-xl'>Sub Total</h1>
                  <p className="text-white font-bold text-xl">{UsDollar.format(cartSubTotal)}</p>
              </div>
              <div className="flex justify-end items-end gap-44">
                <h1 className='text-white text-xl'>Tax </h1>
                <p className="text-white font-bold text-xl">{UsDollar.format(200)}</p>
              </div>
              <div className="flex justify-end items-end gap-40">
                <h1 className='text-white text-xl'>Total</h1>
                  <p className="text-white font-bold text-xl">{UsDollar.format(cartTotalAmount)}</p>
              </div>
              <button className='bg-green-700 hover:bg-green-600 py-3 rounded text-white font-semibold tracking-wider mt-4'>Checkout</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Cart
