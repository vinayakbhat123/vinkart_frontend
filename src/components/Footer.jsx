import React from 'react'
import { Link } from 'react-router-dom'
import {FaFacebook,FaInstagram,FaLinkedin,FaGithub} from "react-icons/fa"
import { Button } from './ui/button'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-200 py-10'>
      <div className='max-w-7xl mx-auto px-4 md:flex md:justify-between'>
        {/* info */}
        <div className='mb-6 md:mb-0'>
          <Link to={"/"}>
          <img src="/newiphone.png" alt="" className='w-32'/>
          </Link>
          <p className='mt-2 text-sm'>Powering Your world the Bset in Eletronics.</p>
          <p className='mt-2 text-sm'>123 Bangalore.</p>
          <p className='text-sm'>Email:vinkartsupport@gmail.com</p>
          <p className=' text-sm'>Phone:{123} 456-7890</p>
        </div>
        {/* customer service link */}
        <div className='mb-6 md:mb:0'>
          <h3 className='text-xl font-semibold'>Customer service</h3>
          <ul className='mt-2 text-sm space-y-2'>
            <li>Contact Us</li>
             <li>Shipping & Returns</li>
              <li>FAQs</li>
               <li>Order Tracking</li>
                <li>Size Guide</li>
          </ul>
        </div>
        {/*Social media links */}
        <div className='mb-6 md:mb-0'>
          <h3 className='text-xl font-semibold'>Follow Us</h3>
          <div className='flex space-x-4 mt-2'>
            <FaFacebook/>
            <FaGithub/>
            <FaInstagram/>
            <FaLinkedin/>
          </div>
        </div>
        {/* newsletter subscription */}
        <div>
          <h3 className='text-xl font-semibold'>Stay in the Loop</h3>
          <p className='mt-2 text-sm'> Subscribe to get special offers,free givaways, and more</p>
          <form action="" className='mt-4 flex'>

            <input type="email" 
            placeholder='Your Email address'
            className='w-full p-2 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2'/>

            <Button className={"bg-pink-600 text-white px-4 hover:bg-red-700"}>Subsribe</Button>
          </form>
        </div>
      </div>
      {/* bottom section */}
      <div className='m-8 border-t border-gray-700 pt-6 text-center text-sm'>
        <p>&copy; {new Date().getFullYear()}<span className='text-pink-600'>,All Rights reserved</span></p>
      </div>
    </footer>
  )
}

export default Footer