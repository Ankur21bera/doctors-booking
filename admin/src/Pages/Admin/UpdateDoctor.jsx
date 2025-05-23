import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../Context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateDoctor = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [docImg, setDocImg] = useState(null);
  const [prevImage, setPrevImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (docImg) formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('experience', experience);
      formData.append('fees', fees);
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.put(
        `${backendUrl}/api/admin/update-doctor/${id}`,
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success("Doctor updated successfully");
        navigate("/doctor-list");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    scrollTo(0,0)
  })

  return (
    <form onSubmit={handleSubmit} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Update Doctor</p>
      <div className='bg-white px-8 py-8 rounded w-full max-w-4xl'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img
              className='w-16 h-16 object-cover rounded-full cursor-pointer'
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Doctor"
            />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>Update Doctor <br /> Picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <input value={name} onChange={(e) => setName(e.target.value)} className='border px-3 py-2 rounded' placeholder='Name'/>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='border px-3 py-2 rounded' placeholder='Email' />
            <select value={experience} onChange={(e) => setExperience(e.target.value)} className='border px-3 py-2 rounded'>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>{i + 1} Year</option>
              ))}
            </select>
            <input type="number" value={fees} onChange={(e) => setFees(e.target.value)} className='border px-3 py-2 rounded' placeholder='Fees'/>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} className='border px-3 py-2 rounded'>
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
            <input value={degree} onChange={(e) => setDegree(e.target.value)} className='border px-3 py-2 rounded' placeholder='Education' />
            <input value={address1} onChange={(e) => setAddress1(e.target.value)} className='border px-3 py-2 rounded' placeholder='Address Line 1' />
            <input value={address2} onChange={(e) => setAddress2(e.target.value)} className='border px-3 py-2 rounded' placeholder='Address Line 2' />
          </div>
        </div>

        <textarea value={about} onChange={(e) => setAbout(e.target.value)} className='w-full border px-3 py-2 mt-4 rounded' rows={4} placeholder='About Doctor'></textarea>
        <button type='submit' className='mt-5 bg-blue-500 text-white px-6 py-3 rounded-full'>Update Doctor</button>
      </div>
    </form>
  );
};

export default UpdateDoctor;
