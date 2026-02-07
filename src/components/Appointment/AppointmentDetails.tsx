import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createAppointment } from '../../store/appointmentSlice';
import { fetchServicesById } from '../../store/serviceSlice';
import { type AppDispatch, type RootState } from '../../store/store';


const AppointmentDetails = () => {
  const {id} = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [step, setStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const timeSlots = useSelector((state: RootState) => state.services.availableSlots);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (date: Date, selectedTime: string) => {
    const appointmentData = {
        service_id: Number(selectedService?.id) || 0,
        appointment_date: date.toISOString().split('T')[0],
        appointment_time: selectedTime,
    };

    try { 
        const result = await dispatch(createAppointment(appointmentData)).unwrap();
        console.log("Success:", result);
    } catch (err: any) {
        console.error("Error", err);
    }
  }

  useEffect(() => {
    if (id) {
        dispatch(fetchServicesById(id))
      }
    }, [dispatch, id]);
    

  const { selectedService } = useSelector((state: RootState) => state.services);

  return (
    <div className="flex items-center justify-center flex-col gap-2">
            <h1 className="font-bold text-2xl my-3">{selectedService?.title}</h1>
            <button 
            onClick={() => { 
                if (user) { 
                    setOpenCalendar(true); setStep(1);
                }
                else {
                    navigate('/login');
                }}}
            className="transition-all duration-300 ease-in-out font-bold bg-black text-white rounded-2xl flex justify-center item-center px-[0.5rem] py-[0.5rem] hover:bg-gray-800 cursor-pointer">
                Set Appointment
            </button>
            <p>{selectedService?.description}</p>

            {openCalendar && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                        {step === 1 && (
                            <>
                                <h1 className="text-xl">
                                    Book Appointment For: <span className="font-bold">{selectedService?.title}</span>
                                </h1>
                                <div className="border rounded-lg p-2 bg-white">
                                    <Calendar onChange={(d) => setDate(d as Date)} value={date} />
                                </div>

                                <div className="flex gap-2 w-full">
                                    <button 
                                    onClick={() => setOpenCalendar(false)}
                                    className="flex-1 py-2 rounded-xl border border-gray-300 font-semibold hover:bg-gray-50 cursor-pointer">
                                        Close
                                    </button>
                                    <button
                                    onClick={() => {
                                        setStep(2); 
                                    }}
                                    className="flex-1 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 cursor-pointer">
                                        Confirm Date
                                    </button>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <h2 className="font-bold text-lg">Pick a Time</h2>
                                <div className="flex flex-wrap justify-center gap-3 w-full my-4">
                                    {timeSlots.map((time) => (
                                        <button 
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`py-3 rounded-lg border transition-all px-2 cursor-pointer ${
                                            selectedTime === time ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-200 hover:border-blue-400"
                                        }`}>
                                            {time}
                                        </button>
                                    ))}    
                                </div>
                                <div className="flex gap-2 w-full">
                                    {/* Go bakc button */}
                                    <button onClick={() => setStep(1)} className="flex-1 py-2 border rounded-xl bg-gray-50 cursor-pointer">Back</button>
                                    {/* Final Confirm */}
                                    <button
                                    disabled={!selectedTime}
                                    onClick={() => { if (date && selectedTime) {
                                        handleSubmit(date, selectedTime)
                                        setOpenCalendar(false);
                                    } else { 
                                        alert("Please select both a date and a time!")
                                    } }}
                                    className={`flex-1 py-2 rounded-xl text-white cursor-pointer ${selectedTime ? "bg-green-600" : "bg-gray-300 cursor-not-allowed"}`}                              >
                                        Confirm Date
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
    </div>
  )
}

export default AppointmentDetails