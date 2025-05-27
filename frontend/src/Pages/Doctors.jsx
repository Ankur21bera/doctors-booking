import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';

const Doctors = () => {

  const {speciality} = useParams();
  const [filterDoc,setFilterDoc] = useState([]);
  const {doctors} = useContext(AppContext);
  const navigate = useNavigate();
  const [Showfilter,setShowFilter] = useState(false);
  const [loading,setLoading] = useState(false);

  const SkeletonCard = () => (
    <div className='animate-pulse border border-blue-200 rounded-xl overflow-hidden'>
      <div className='bg-blue-100 h-32 w-full'></div>
      <div className='p-4 space-y-2'>
        <div className='h-4 bg-gray-300 rounded w-1/2'></div>
        <div className='h-4 bg-gray-300 rounded w-2/3'></div>
        <div className='h-4 bg-gray-300 rounded w-1/3'></div>
      </div>
    </div>
  );

  const applyFilter = () => {
    setLoading(true);
    setTimeout(() => {
      if (speciality) {
        setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
      } else {
        setFilterDoc(doctors);
      }
      setLoading(false);
    }, 500);
  }

  useEffect(() => {
    applyFilter()
  },[doctors,speciality]);

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${Showfilter ? 'bg-blue-600 text-white' : ''}`} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${Showfilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={()=> speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>
          <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
          <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
          <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
          <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
        </div>
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6'>
          {loading ? (
            Array(6).fill(0).map((_,i) => <SkeletonCard key={i}/>)
          ) : (
           filterDoc.map((item, index) => (
  <div
    onClick={() => navigate(`/appointment/${item._id}`)}
    key={index}
    className="group border border-gray-200 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition-all duration-300"
  >
    <img
      className="w-full h-[600px] object-cover"
      src={item.image}
      alt={item.name}
    />
    <div className="p-4 space-y-1">
      <div className="flex items-center gap-2 text-sm">
        <span
          className={`inline-block w-2 h-2 rounded-full ${
            item.available ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        <span
          className={`font-medium ${
            item.available ? "text-green-600" : "text-red-600"
          }`}
        >
          {item.available ? "Available" : "Not Available"}
        </span>
      </div>
      <p className="text-gray-900 font-semibold text-lg">{item.name}</p>
      <p className="text-gray-500 text-sm">{item.speciality}</p>
    </div>
  </div>
))

          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors
