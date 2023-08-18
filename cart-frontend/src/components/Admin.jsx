import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { setSearchProduct } from '../redux/services/productSlice';

const Admin = () => {

  const dispatch = useDispatch()

  // get products from global storage 
  const products = useSelector(state => state.productSlice.products)
  console.log(products);

  // get searchProduct from global storage
  const searchProduct = useSelector(state => state.productSlice.searchProduct)

  // US currency format for product price
  let UsDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  // create rows for products
  const rows = products?.filter(product => {
    if (searchProduct === "") {
      return product
    } else if(product?.name.toLowerCase().includes(searchProduct?.toLowerCase())) {
      return product
    }
  }).map((product, index) => {
    return (
      <tr key={product?.id}>
        <td>{index + 1}</td>
        <td>
          <img src={product?.image} alt={product?.name}
            className='w-[70px] h-[50px] rounded mb-2' />
        </td>
        <td>{product?.name}</td>
        <td>{UsDollar.format(product?.price)}</td>
        <td>{product?.description}</td>
        <td className='flex justify-center items-center gap-3'>
          <Link to={`/edit/${product?.id}`}>
            <p className='px-3 py-1 bg-blue-700 rounded text-white'>Edit</p>
          </Link>
          <p onClick={() => {}} className='px-3 py-1 bg-red-700 rounded text-white'>Delete</p>
        </td>
      </tr>
    )
  })

  return (
    <div className='bg-gray-600 mt-16 p-2'>
      <div className="text-center mb-7">
        <h1 className='text-3xl text-white'>Admin Page</h1>
      </div>

      <div className="container mx-auto mb-7">
        <label className='text-xl text-white mr-5' htmlFor="searchProduct">Search Product : </label>
        <input type="text" value={searchProduct} 
          onChange={event => (dispatch(setSearchProduct(event.target.value)))} 
          placeholder='Enter Cycle Name' id='searchProduct'
          className='p-2 rounded'/>
      </div>

      <table className='container bg-white mx-auto md:container mt-7'>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}

export default Admin
