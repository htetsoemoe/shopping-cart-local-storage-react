import React from 'react'
import { useGetAllProductsQuery } from '../redux/api/productsApi'
import Product from './Product'

const Home = () => {
  const { data, isLoading, error } = useGetAllProductsQuery()
  //console.log(data);

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
              data?.map(product => {
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
