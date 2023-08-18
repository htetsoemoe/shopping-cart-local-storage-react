import React, { useEffect } from 'react'
import { useGetAllProductsQuery } from '../redux/api/productsApi'
import {  useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../redux/services/productSlice'
import Product from './Product'

const Home = () => {
  const { data, isLoading, error } = useGetAllProductsQuery()
  //console.log(data);

  // use productSlice for store products in global state
  const dispatch = useDispatch()

  // after 'componentDidMounted' lifecycle method called fetched data to store in global state using productSlice
  useEffect(() => {
    dispatch(addProduct(data))
  }, [data])

  // get products from global storage using productSlice
  const products = useSelector(state => state.productSlice.products)

  return (
    <div className=''>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occur...</p>
      ) : (
        <>
          <div className="bg-gray-600 flex flex-wrap gap-10 justify-center mt-16 p-2">
            {
              products?.map(product => {
                return (
                  <Product key={product?.id} product={product} />
                )
              })
            }
          </div>
        </>
      )}
    </div>
  )
}

export default Home
