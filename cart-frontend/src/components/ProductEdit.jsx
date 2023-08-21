import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleProductQuery } from '../redux/api/productsApi'

const ProductEdit = () => {
    const {id} = useParams()
    const {data} = useGetSingleProductQuery(id);
    console.log(data);

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    useEffect(() => {
        setName(data?.name)
        setDescription(data?.description)
        setPrice(data?.price)
    }, [])
    
    return (
       <div className="mt-28">
            <div className='flex justify-center items-start h-screen gap-7'>

                <div className="mt-2">

                    <img src={data?.image} alt={data?.name} className='h-[250px] rounded mb-2' />

                </div>
                <form>
                    <div className="flex flex-col gap-3 w-96 mb-5">
                        <label htmlFor="name" className='text-xl text-white'>Name</label>
                        <input type="text" name="name" id="name" value={data?.name || ''} onChange={(event) => {setName(event.target.value)}}/>
                    </div>
                    <div className="flex flex-col gap-3 w-96 mb-5">
                        <label htmlFor="name" className='text-xl text-white'>Price</label>
                        <input type="text" name="name" id="name" value={data?.price || ''} onChange={(event) => {setPrice(event.target.value)}} />
                    </div>
                    <div className="flex flex-col gap-3 w-96 mb-5">
                        <label htmlFor="desc" className='text-xl text-white'>Description</label>
                        <textarea value={data?.description || ''} onChange={(event) => {setDescription(event.target.value)}} name="description" id="desc" cols="30" rows="5"></textarea>
                    </div>
                    <div className="flex flex-col w-96">
                        <button onSubmit={() => {}} className='px-5 py-3 bg-green-600'>Update</button>
                    </div>
                </form>
            </div>
       </div>
    )
}

export default ProductEdit
