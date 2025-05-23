import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../Context/DoctorContext';
import { AppContext } from '../../Context/AppContext';

const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, updateProfileData } = useContext(DoctorContext);
  const { backendUrl } = useContext(AppContext);

  const [fees, setFees] = useState('');
  const [available, setAvailable] = useState(false);
  const [address, setAddress] = useState({ line1: '', line2: '' });
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  useEffect(() => {
    if (profileData) {
      setFees(profileData.fees || '');
      setAvailable(profileData.available || false);
      setAddress(profileData.address || { line1: '', line2: '' });
    }
  }, [profileData]);

  if (!profileData) return <div>Loading...</div>;

  const {
    image,
    name,
    degree,
    experience,
    speciality,
    about,
    email,
  } = profileData;

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedFields = { fees, available, address };
    await updateProfileData(updatedFields);
    setSuccessMsg('Profile updated successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={image}
          alt={name}
          className="w-40 h-40 object-cover rounded-full border-4 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-600">{degree} | {speciality}</p>
          <p className="text-gray-600">{experience} Experience</p>
          <p className={`mt-2 font-medium ${available ? 'text-green-600' : 'text-red-600'}`}>
            {available ? 'Available for Appointments' : 'Not Available'}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">About</h3>
        <p className="text-gray-700 mt-2">{about}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
        <p className="text-gray-700 mt-1">Email: {email}</p>
        <p className="text-gray-700 mt-1">Address: {address?.line1}, {address?.line2}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Consultation Fees</h3>
        <p className="text-gray-700 mt-1">₹{fees}</p>
      </div>

      {/* Update Form */}
      <form onSubmit={handleUpdate} className="mt-10 space-y-4 border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-800">Update Profile</h3>

        <div>
          <label className="block font-medium">Fees (₹)</label>
          <input
            type="number"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Available</label>
          <select
            value={available}
            onChange={(e) => setAvailable(e.target.value === 'true')}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Address Line 1</label>
          <input
            type="text"
            value={address.line1}
            onChange={(e) => setAddress({ ...address, line1: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Address Line 2</label>
          <input
            type="text"
            value={address.line2}
            onChange={(e) => setAddress({ ...address, line2: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>

        {successMsg && <p className="text-green-600 mt-2">{successMsg}</p>}
      </form>
    </div>
  );
};

export default DoctorProfile;
