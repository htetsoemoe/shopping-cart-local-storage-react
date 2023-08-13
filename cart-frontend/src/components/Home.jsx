import React from 'react'
import { useGetAllProductsQuery } from '../redux/api/productsApi'
import Cart from './Cart'

const Home = () => {
  const { data, isLoading, error } = useGetAllProductsQuery()
  //console.log(data);

  return (
    <div className='home-container'>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occur...</p>
      ) : (
        <>
          {/* <h2>New Arrivals</h2> */}
          <div className="products">
            {
              data?.map(product => {
                return (
                  <Cart key={product?.id} product={product} />
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
