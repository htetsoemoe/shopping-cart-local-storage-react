import React from 'react'
import { useGetAllProductsQuery } from '../redux/api/productsApi'

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
          <h2>New Arrivals</h2>
          <div className="products">
            {
              data?.map(product => {
                return (
                  <div key={product.id} className="product">
                    <h3>{product.name}</h3>
                    <img src={product.image} alt={product.name} />
                    <div className="details">
                      <span className='description'>{product.desc}</span>
                      <span className="price">${product.price}</span>
                    </div>
                    <button>Add To Cart</button>
                  </div>
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
