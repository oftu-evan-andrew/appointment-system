import { useState } from 'react';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';


const AppointmentDetails = () => {
  const selectedService = useSelector((state: RootState) => state.services.selectedService);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex items-center justify-center flex-col gap-2">
        
        <h1 className="font-bold text-2xl my-3">{selectedService?.title}</h1>
        <button 
         onClick={() => setOpenCalendar(true)}
         className="transition-all duration-300 ease-in-out font-bold bg-black text-white rounded-2xl flex justify-center item-center px-[0.5rem] py-[0.5rem] hover:bg-gray-800 cursor-pointer">Set Appointment</button>
        <p>{selectedService?.description}</p>

        {openCalendar && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                    <h1 text-xl>Book Appointment For: <span className="font-bold">{selectedService?.title}</span></h1>
                    <div className="border rounded-lg p-2 bg-white">
                        <Calendar onChange={(d) => setDate(d as Date)} value={date} />
                    </div>

                    <div className="flex gap-2 w-full">
                        <button 
                        onClick={() => setOpenCalendar(false)}
                        className="flex-1 py-2 rounded-xl border border-gray-300 font-semibold hover:bg-gray-50 cursor-pointer"
                        >
                            Close
                        </button>
                        <button
                        onClick={() => {
                            setOpenCalendar(false);
                        }}
                        className="flex-1 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 cursor-pointer"
                        >
                            Confirm Date
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default AppointmentDetails