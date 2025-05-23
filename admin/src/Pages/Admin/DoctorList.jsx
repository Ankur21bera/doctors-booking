import React, { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const DoctorList = () => {
  const {doctors,aToken,getAllDoctors,changeAvailability} = useContext(AdminContext);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    if(aToken) {
      getAllDoctors();
    }
  },[aToken])
  return (
    <div className='m-5 max-h-[90vh]'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      {selectedDoctor && (
        <UpdateDoctor doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div
            className='border border-indigo-300 rounded-xl max-w-56 overflow-hidden cursor-pointer group'
            key={index}
          >
            <img className='bg-indigo-50' src={item.image} />
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
              <p className='text-zinc-600 text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-2 text-sm'>
                <input
                  onChange={() => changeAvailability(item._id)}
                  type='checkbox'
                  checked={item.available}
                />
                   <Link to={`/update-doctor/${item._id}`}>
          <button className='text-blue-600 underline'>Edit</button>
        </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorList