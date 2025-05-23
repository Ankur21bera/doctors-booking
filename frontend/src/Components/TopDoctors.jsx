import React, { useContext, useState } from 'react'
// import { doctors } from '../assets/assets'
import {useNavigate} from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const [visibleCount,setVisibleCount] = useState(5);
    const {doctors} = useContext(AppContext);
    const [expanded,setExpanded] = useState(false);

    const handleToggle = () => {
        if(expanded) {
            setVisibleCount(5);
        } else{
            setVisibleCount(doctors.length)
        }
        setExpanded(!expanded);
    }
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-950 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {doctors.slice(0,visibleCount).map((item,index)=>(
                <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                    <img className='bg-blue-50' key={index} src={item.image} alt="" srcset="" />
                    <div className='p-4'>
               <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-red-500'}`}>
  <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></p>
  <p>{item.available ? 'Available' : 'Not Available'}</p>
</div>

              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
                </div>
            ))}
        </div>
        {doctors.length > 5 && (
            <button className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer' onClick={handleToggle}>{expanded ? 'Show Less' : 'Show More'}</button>
        )}
    </div>
  )
}

export default TopDoctors