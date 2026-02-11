import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchEmployeeAppointments } from "../../store/appointmentSlice";
import { useAppDispatch, type RootState } from "../../store/store";

const EmployeePage = () => {
  const dispatch = useAppDispatch();
  const { appointments, error } = useSelector((state: RootState) => state.appointments);
  const { user } = useSelector((state: RootState) => state.auth)

    useEffect(() => { 
    if (user?.id && user?.role === 'employee') {
      dispatch(fetchEmployeeAppointments(user.id))
    }
  }, [dispatch, user?.id, user?.role])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
      {appointments?.map((appointment) => (
        <div 
          key={appointment.id} 
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
        >
          {/* Status Header */}
          <div className={`px-4 py-2 text-xs font-bold uppercase tracking-wider ${
            appointment.status === 'scheduled' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'
          }`}>
            {appointment.status}
          </div>

          <div className="p-5">
            {/* Date and Time */}
            <div className="flex items-center gap-4 mb-4 text-gray-700">
              <div className="flex flex-col">
                <span className="text-sm text-gray-400 font-medium">Date</span>
                <span className="font-semibold">{appointment.appointment_date}</span>
              </div>
              <div className="w-[1px] h-8 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-400 font-medium">Time</span>
                <span className="font-semibold">{appointment.appointment_time.slice(0, 5)}</span>
              </div>
            </div>

            {/* IDs / Details */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Service ID:</span>
                <span className="font-medium text-gray-800">{appointment.services?.title}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Client Ref:</span>
                <span className="font-mono text-xs text-red-500 truncate ml-4">
                  {appointment.client_id.slice(0, 8)}...
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
</div>
  )
}

export default EmployeePage;