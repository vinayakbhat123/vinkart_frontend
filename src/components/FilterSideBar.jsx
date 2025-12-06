import React from 'react'
import { Input } from './ui/input';

const FilterSideBar = ({allproducts}) => {
  const categories = Array.from(["All", ...new Set(allproducts.map(product => product.category))]);
  const brands = Array.from(["All", ...new Set(allproducts.map((product)=>product.brand))]);
  return (
    <div className='bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block w-64'>
      {/* Search */}
      <Input type="text" placeholder="Search Products..." className=" mb-4 bg-white p-2 border-gray-400 border-2 w-full"/>
      {/* category */}
      <h1 className='mt-5 font-semibold text-xl'>Category</h1>
      </div>
  )
}

export default FilterSideBar