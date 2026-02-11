import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchProfiles, updateEmployeeAppointment, updateProfileRole } from '../../store/adminUserSlice'
import { fetchAppointments, selectAllAppointments } from '../../store/appointmentSlice'
import { useAppDispatch, type RootState } from '../../store/store'

const ManagementConsole = () => {
  const users = useSelector((state: RootState) => state.adminUsers.users)
  const dispatch = useAppDispatch();
  const appointments = useSelector(selectAllAppointments)
  const employees = useSelector((state: RootState) => state.adminUsers.users.filter(u => u.role === 'employee'));
  const { user } = useSelector((state: RootState) => state.auth);

  console.log("REDUX CHECK:", { users, appointments });

  useEffect(() => {
    if (user?.id && user?.role === 'admin'){
      dispatch(fetchProfiles());
      dispatch(fetchAppointments());
    }
  }, [dispatch, user?.id, user?.role])

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8 text-left">Management Console</h1>
      
      <div className="flex flex-col md:flex-row gap-8 justify-between">
        {/* Appointments Section */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col h-[500px]">
          <h2 className="font-semibold text-lg mb-4">Appointments</h2>
          <ul className="space-y-3 overflow-y-auto flex-1 pr-2">
            {appointments?.map((appointment) => (
              <li 
              className="flex flex-row items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
              key={appointment.id}
              >
                <span>{appointment.services?.title || 'No Appointments'}</span>
                  <select 
                    className="p-1 border rounded bg-white text-sm"
                    value={appointment.employee_id || ""}
                    onChange={(e) => dispatch(updateEmployeeAppointment({ 
                      appointmentId: appointment.id,
                      employeeId: e.target.value }))}
                  >
                    {employees.map((employee) =>(
                      <option 
                      value={employee.id}
                      key={employee.id}>
                        {employee.full_name}
                      </option>
                    ))}
                  </select>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col h-[500px]">
          <h2 className="font-semibold text-lg mb-4">User Roles</h2>

          <ul className="spsace-y-3 overflow-y-auto flex-1 pr-2">
            {users.map((user) => (
              <li 
                key={user.id}
                className="flex flex-row item-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span>{user.full_name}</span>
                  <select 
                    className="p-1 border rounded bg-white text-sm"
                    value={user.role}
                    onChange={(e) => dispatch(updateProfileRole({ id: user.id, role: e.target.value }))}
                  >
                    <option value="client">client</option>
                    <option value="employee">employee</option>
                    <option value="admin">admin</option>
                  </select>
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ManagementConsole