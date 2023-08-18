import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Table } from '@mantine/core'
import { addProduct, setSearchProduct } from '../redux/services/productSlice';
import { useGetAllProductsQuery } from '../redux/api/productsApi';

const Admin = () => {

  const dispatch = useDispatch()

  // get products from back-end 
  const { data, isLoading } = useGetAllProductsQuery()

  useEffect(() => {
    dispatch(addProduct(data))
  }, [data])

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
    } else if (product?.name.toLowerCase().includes(searchProduct?.toLowerCase())) {
      return product
    }
  }).map((product, index) => {
    return (
      <tr key={product?.id}>
        <td className='font-semibold'>{index + 1}</td>
        <td>
          <img src={product?.image} alt={product?.name}
            className='w-[70px] h-[50px] rounded mb-2' />
        </td>
        <td>
          <a href="#" className='hover:underline font-semibold'>{product?.name}</a>
        </td>
        <td className='font-semibold'>{UsDollar.format(product?.price)}</td>
        <td className='font-semibold'>{product?.description}</td>
        <td>
          <div className="flex justify-center items-center gap-3">
            <Link to={`/edit/${product?.id}`}>
              <p className='px-3 py-1 bg-blue-700 rounded text-white'>Edit</p>
            </Link>
            <p onClick={() => { }} className='px-3 py-1 bg-red-700 rounded text-white'>Delete</p>
          </div>
        </td>
      </tr>
    )
  })

  return (
    <div className='bg-gray-700 mt-16 p-2'>
      <div className="container mx-auto mt-5 mb-7">
        <label className='text-xl text-white mr-5' htmlFor="searchProduct">Search Product : </label>
        <input type="text" value={searchProduct}
          onChange={event => (dispatch(setSearchProduct(event.target.value)))}
          placeholder='Enter Cycle Type' id='searchProduct'
          className='p-2 rounded' />
      </div>

      <div className="container bg-white mx-auto md:container p-3 mt-7">
        <h1 className='text-xl font-bold pb-3'>All Products</h1>
        <Table striped highlightOnHover withBorder horizontalSpacing="sm" verticalSpacing="sm" fontSize="sm"
          className='w-[100%] mx-auto table-auto pt-5'>
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Type</th>
              <th>Price</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Admin
