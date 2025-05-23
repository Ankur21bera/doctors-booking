import React, { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../Context/DoctorContext';

const Sidebar = () => {
    const {aToken} = useContext(AdminContext); 
    const {dToken} = useContext(DoctorContext);
  return (
    <div className='h-[6000px] sm:h-[2000px] bg-white border-r'>
     {
        aToken && <ul className='text-[#515151] mt-5'>
            <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-400 border-r-4 border-blue-500':''}`} to={'/admin-dashboard'}>
                <img src={assets.home_icon} />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>
              <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-400 border-r-4 border-blue-500':''}`} to={'/all-appointments'}>
                <img src={assets.appointment_icon} />
                <p className='hidden md:block'>Appointments</p>
            </NavLink>
              <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-400 border-r-4 border-blue-500':''}`} to={'/add-doctor'}>
                <img src={assets.add_icon} />
                <p className='hidden md:block'>Add Doctors</p>
            </NavLink>
              <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-400 border-r-4 border-blue-500':''}`} to={'/doctor-list'}>
                <img src={assets.people_icon} />
                <p className='hidden md:block'>Doctors List</p>
            </NavLink>
        </ul>
     }
      {
        dToken && <ul className='text-[#515151] mt-5'>
            <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-400 border-r-4 border-blue-500':''}`} to={'/doctor-dashboard'}>
                <img src={assets.home_icon} />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>
              <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-400 border-r-4 border-blue-500':''}`} to={'/doctor-appointments'}>
                <img src={assets.appointment_icon} />
                <p className='hidden md:block'>Appointments</p>
            </NavLink>
              <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-400 border-r-4 border-blue-500':''}`} to={'/doctor-profile'}>
                <img src={assets.people_icon} />
                <p className='hidden md:block'>Profile</p>
            </NavLink>
        </ul>
     }
    </div>
  )
}

export default Sidebar

