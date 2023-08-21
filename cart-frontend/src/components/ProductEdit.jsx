import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetSingleProductQuery, useUpdateProductMutation } from '../redux/api/productsApi'

const ProductEdit = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { data } = useGetSingleProductQuery(id);
    //console.log(data);

    const [updateProduct] = useUpdateProductMutation()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState(null)

    // useEffect(() => {
    //     setName(data?.name)
    //     setDescription(data?.description)
    //     setPrice(data?.price)
    // }, [])

    // used in form submit button
    const handleForm = async (event) => {
        event.preventDefault()

        let data = new FormData()
        data.append("name", name)
        data.append("description", description)
        data.append("price", price)

        if (image !== null) {
            data.append("image", image)
        }

        console.log(data)
        await updateProduct({ id: id, product: data })
        navigate('/admin')
    }

    // used in file input 
    const handleFileInputChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    return (
        <div className="mt-20">
            <div className='flex justify-center mx-auto w-96 mb-5'>
                <h1 className='text-2xl text-white font-semibold'>Product Edit</h1>
            </div>
            <div className='flex justify-center items-start h-screen gap-7'>
                <div className="mt-2">
                    <img src={data?.image} alt={data?.name} className='h-[250px] rounded mb-2' />
                </div>
                <form>
                    <div className="flex flex-col gap-3 w-96 mb-5">
                        <label htmlFor="name" className='text-xl text-white'>Name*</label>
                        <input type="text" name="name" id="name"
                            value={name}
                            onChange={(event) => { setName(event.target.value) }}
                            className='p-2' />
                    </div>
                    <div className="flex flex-col gap-3 w-96 mb-5">
                        <label htmlFor="name" className='text-xl text-white'>Price*</label>
                        <input type="text" name="price" id="price"
                            value={price}
                            onChange={(event) => { setPrice(event.target.value) }}
                            className='p-2' />
                    </div>
                    <div className="flex flex-col gap-3 w-96 mb-5">
                        <label htmlFor="desc" className='text-xl text-white'>Description*</label>
                        <textarea value={description} onChange={(event) => { setDescription(event.target.value) }}
                            className='p-2'
                            name="description" id="desc" cols="30" rows="5"></textarea>
                    </div>
                    <div className="flex flex-col gap-3 w-96 mb-5">
                        <label htmlFor="image" className='text-xl text-white'>Image</label>
                        <input onChange={event => handleFileInputChange(event)} type="file" name="image" id="image" />
                    </div>
                    <div className="flex flex-col w-96">
                        <button onClick={event => handleForm(event)}
                            className='bg-green-700 hover:bg-green-500 py-2 text-black font-nunito font-semibold tracking-wider rounded'>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductEdit
