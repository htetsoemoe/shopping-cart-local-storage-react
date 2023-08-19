import React from 'react'
import { useParams } from 'react-router-dom'

const ProductEdit = () => {
    const {id} = useParams()

    return (
        <div>
            <h1 className='mt-20 text-2xl text-white'>Product Edit ID : {id}</h1>
        </div>
    )
}

export default ProductEdit
