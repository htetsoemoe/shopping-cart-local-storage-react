import React from 'react'

const Cart = ({product}) => {
  const {name, price, image, description} = product

  return (
    <div className="product">
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <div className="details">
        <p className='description'>{description}</p>
        <span className="price">${price}</span>
      </div>
      <button>Add To Cart</button>
    </div>
  )
}

export default Cart
