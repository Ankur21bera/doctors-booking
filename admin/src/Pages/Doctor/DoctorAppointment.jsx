import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../Context/DoctorContext';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } =
    useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments found.</p>
      ) : (
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          {/* Header Row (visible on larger screens) */}
          <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1.5fr_1fr_1fr] gap-4 px-6 py-3 bg-gray-100 text-sm font-semibold text-gray-700">
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Action</p>
          </div>

          {/* Appointment Items */}
          {appointments.map((item, index) => (
            <div
              key={item._id}
              className="flex flex-col md:grid md:grid-cols-[0.5fr_2fr_1fr_1.5fr_1fr_1fr] gap-4 px-6 py-4 border-t text-sm text-gray-700"
            >
              {/* Index */}
              <p className="md:flex md:items-center">{index + 1}</p>

              {/* Patient Info */}
              <div className="flex items-center gap-3">
                <img
                  src={item.userData?.image || '/default-avatar.png'}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{item.userData?.name || 'Unknown'}</p>
                </div>
              </div>

              {/* Payment Method */}
              <p className="md:flex md:items-center">{item.payment ? 'Online' : 'Cash'}</p>

              {/* Date & Time */}
              <div className="md:flex md:flex-col md:justify-center">
                <p>{item.slotDate}</p>
                <p className="text-xs text-gray-400">{item.slotTime}</p>
              </div>

              {/* Fees */}
              <p className="font-medium md:flex md:items-center">₹{item.amount}</p>

              {/* Action */}
              <div className="flex items-center gap-3">
                {item.cancelled ? (
                  <span className="text-red-500 font-medium text-xs">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="text-green-500 font-medium text-xs">Completed</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      alt="Cancel"
                      title="Cancel"
                      className="w-5 h-5 cursor-pointer hover:scale-110 transition"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      src={assets.tick_icon}
                      alt="Complete"
                      title="Complete"
                      className="w-5 h-5 cursor-pointer hover:scale-110 transition"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointment;
