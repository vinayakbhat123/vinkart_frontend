import React from 'react'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'

const ProductCard = ({product,loading}) => {
  const {productName,productPrice,productImg} = product
  return (
    <div className='shadow-lg rounded-lg overflow-hidden h-max'>
      <div className='w-full h-full aspect-square overflow-hidden'>
        <img src={productImg[0]?.url} alt={""} className="w-full h-full transition-duration-300 hover:scale-105 object-cover" />
      </div>
      <div className='px-2 space-y-1'>
        <h1 className='font-semibold h-12 line-clamp-2'>{productName}</h1>
        <h2 className='font-semibold text-lg'>₹{productPrice}</h2>
        <Button className='w-full mb-2 bg-pink-600  text-white hover:bg-pink-500'><ShoppingCart/>Add to Cart</Button>
      </div>

    </div>
  )
}

export default ProductCard