import React from 'react'

const Product = ({ product }) => {
    const { name, price, image, description } = product

    return (
        <div className="flex flex-col w-96 p-7 mt-3 shadow bg-slate-800 rounded transform duration-500 hover:-translate-y-2">
            <h3 className='text-2xl text-cyan-100 font-semibold mb-5'>{name}</h3>
            <img className='h-[200px] rounded mb-2' src={image} alt={name} />
            <div className="mt-3 mb-3">
                <p className='text-sm text-cyan-100'>{description}</p>
            </div>
            <div className="mb-5">
                <span className="text-xl font-semibold text-yellow-300">$ {price}</span>
            </div>
            <button className='bg-green-700 hover:bg-green-500 py-2 text-black font-semibold rounded'>Add To Cart</button>
        </div>
    )
}

export default Product
