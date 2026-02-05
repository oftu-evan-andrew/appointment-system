import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearSelection, selectService } from '../../store/serviceSlice';
import { type AppDispatch, type RootState } from '../../store/store';


const AppointmentPage = () => {
  const navigate = useNavigate();
  const selectedService = useSelector((state: RootState) => state.services.selectedService);
  const services = useSelector((state: RootState) => state.services.services)
  const dispatch = useDispatch<AppDispatch>();

  const handleSetAppointment = () => {
    if (selectedService) {
      navigate('/details');
    } else {
      alert ("Please select a service first");
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-6 flex flex-col gap-2 shrink-0">
        <h2 className="font-bold cursor-pointer text-lg">Dashboard</h2>
        <button
        onClick={handleSetAppointment}
        className="transition-all duration-300 ease-in-out font-bold bg-black text-white rounded-2xl flex justify-center item-center py-[0.5rem] hover:bg-gray-800 cursor-pointer">
          Set Appointment
        </button>
      </div>

      {/* Service Grid */}
      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {/* Service Card */}     
        {services.map((service) => (
          <div
           key={service.id}
           onClick={() => {
            if (selectedService?.id === service.id) {
              dispatch(clearSelection());
            } else { 
              dispatch(selectService(service));
            }
           }}
           className={`flex flex-col h-full border p-4 rounded-xl shadow-sm transition-all cursor-pointer ${
            selectedService?.id === service.id ? "bg-blue-50 border-blue-50 ring-2 ring-blue-200" : "bg-white border-gray-200"
           }`}>
            <div className="flex flex-col flex-1 min-w-0 ">
              <h2 className="font-bold text-lg truncate mb-2">{service.title}</h2>
              <p className="text-xs text-gray-500 line-clamp-4">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div> 
  </div>
  )
}

export default AppointmentPage