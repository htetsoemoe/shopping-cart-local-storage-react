import React from 'react'
import { useGetAllProductsQuery } from '../redux/api/productsApi'

const Home = () => {
  const {data} = useGetAllProductsQuery()
  console.log(data);
  
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
