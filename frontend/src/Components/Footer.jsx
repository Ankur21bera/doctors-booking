import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

           <div>
            <img className='mb-5 w-40' src={assets.logo} alt="" srcset="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, rem quia quos iste, ratione doloribus possimus itaque, sit ut consectetur non ipsum cumque nihil maiores aut eius necessitatibus illum id!</p>
           </div>

           <div>
               <p className='text-xl font-medium mb-5'>Company</p>
               <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Contact Us</li>
               </ul>
           </div>

           <div>
            <p className='text-xl font-medium mb-5'>Get In Touch</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>1800-100-12000</li>
                <li>www.prescripto.com</li>
            </ul>
           </div>

        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025 prescripto all rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer