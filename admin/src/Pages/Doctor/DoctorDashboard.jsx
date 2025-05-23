import React, { useEffect, useContext } from 'react';
import { DoctorContext } from '../../Context/DoctorContext';

const DoctorDashboard = () => {
  const { dashData, getDashData } = useContext(DoctorContext);

  useEffect(() => {
    getDashData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Doctor Dashboard</h2>

      {dashData ? (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-green-100 p-4 rounded shadow text-center">
              <p className="text-lg font-medium">💰 Earnings</p>
              <p className="text-2xl font-bold">₹{dashData.earnings}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded shadow text-center">
              <p className="text-lg font-medium">📅 Appointments</p>
              <p className="text-2xl font-bold">{dashData.appointments}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded shadow text-center">
              <p className="text-lg font-medium">🧑‍🤝‍🧑 Patients</p>
              <p className="text-2xl font-bold">{dashData.patients}</p>
            </div>
          </div>

          {/* Latest Appointments Table */}
          <div className="bg-white p-4 rounded shadow overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4">🕒 Latest Appointments</h3>
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left">Patient Name</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Amount</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {dashData.latestAppointments.map((appointment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">{appointment.userData?.name || 'N/A'}</td>
                    <td className="border border-gray-200 px-4 py-2">₹{appointment.amount}</td>
                    <td className="border border-gray-200 px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          appointment.isCompleted
                            ? 'bg-green-200 text-green-800'
                            : 'bg-yellow-200 text-yellow-800'
                        }`}
                      >
                        {appointment.isCompleted ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-2">{appointment.slotDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Loading dashboard data...</p>
      )}
    </div>
  );
};

export default DoctorDashboard;
