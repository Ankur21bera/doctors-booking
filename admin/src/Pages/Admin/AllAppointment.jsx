import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../Context/AdminContext';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';
import { DoctorContext } from '../../Context/DoctorContext';

const AllAppointment = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);


  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Appointments</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Patient</th>
              <th className="py-3 px-4 text-left">Date & Time</th>
              <th className="py-3 px-4 text-left">Doctor</th>
              <th className="py-3 px-4 text-left">Fees</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-gray-400 py-6">
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 text-sm text-gray-700"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.userData?.image || '/default-avatar.png'}
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p>{item.userData?.name || 'Unknown'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{item.slotDate} @ {item.slotTime}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.docData?.image}
                        alt="Doctor"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span>{item.docData?.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">₹{item.docData?.fees}</td>
                  <td className="py-3 px-4">
                    {item.cancelled ? (
                      <span className="text-red-500 font-medium">Cancelled</span>
                    ) : item.isCompleted ? (
                      <span className="text-green-500 font-medium">Completed</span>
                    ) : (
                      <span className="text-yellow-500 font-medium">Upcoming</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {!item.cancelled && !item.isCompleted ? (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
                      >
                        <img src={assets.cancel_icon} className="w-5 h-5" alt="Cancel" />
                        Cancel
                      </button>
                    ) : (
                      <button>Complete</button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointment;
