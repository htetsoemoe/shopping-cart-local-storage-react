import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { FileInput, Table, TextInput, Title } from '@mantine/core'
import { Form, useForm } from '@mantine/form';
import { addProduct, setSearchProduct } from '../redux/services/productSlice';
import { useCreateProductMutation, useGetAllProductsQuery } from '../redux/api/productsApi';

const Admin = () => {

  // for new product upload
  const [createProduct] = useCreateProductMutation()

  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

  // used in form submit button
  const handleForm = async (event) => {
    event.preventDefault()

    let data = new FormData()
    data.append("name", name)
    data.append("image", image)
    data.append("description", description)
    data.append("price", price)

    console.log(data)
    await createProduct(data)
  }

  // used in file input 
  const handleFileInputChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0])
    }
  }

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
    <div className='mt-16 p-2'>
      <div className="container mx-auto mt-5 mb-7 p-5 border border-cyan-50-50">
        <h1 className='text-xl text-white mb-5'>Upload New Product</h1>
        <form className='flex items-center gap-3'>
          <div className="">
            <label className='text-xl text-white mr-5' htmlFor="product">Name : </label>
            <input onChange={event => setName(event.target.value)} className='p-2 rounded' type="text" name="name" id='product' placeholder='Enter Product Name' />
          </div>
          <div className="">
            <label className='text-xl text-white mr-5' htmlFor="uploadImage">Image : </label>
            <input onChange={event => handleFileInputChange(event)} className='' type="file" name="image" id='uploadImage'/>
          </div>
          <div className="">
            <label className='text-xl text-white mr-5' htmlFor="price">Price : </label>
            <input onChange={event => setPrice(event.target.value)} className='p-2 rounded' type="text" name="price" id='price' placeholder='Enter Product Price' />
          </div>
          <div className="">
            <label className='text-xl text-white mr-5' htmlFor="desc">Description : </label>
            <input onChange={event => setDescription(event.target.value)} className='p-2 rounded' type="text" name="description" id='desc' placeholder='Enter Description' />
          </div>
          <button onClick={event => handleForm(event)} className="px-4 py-2 bg-yellow-500 rounded font-semibold">Upload</button>
        </form>
      </div>
      <div className="container mx-auto mt-5 mb-7 p-5 border">
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
