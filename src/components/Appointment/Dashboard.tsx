import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { fetchAppointments } from "../../store/appointmentSlice";
import { type RootState, useAppDispatch } from "../../store/store";

import '../../index.css';

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const { appointments, error } = useSelector((state: RootState) => state.appointments);

  useEffect(() => {
      dispatch(fetchAppointments());
  }, [dispatch])

  // Colors for the donut chart. 
  const COLORS = {
  scheduled: '#3b82f6', // Red
  completed: '#10b981', // Blue 
  cancelled: '#ef4444', // Green
};


  // If a status already exist we increment the value (count of the status), otherwise
  // we create a name property for that status and set the initial value to 1 in the 
  // accumulator object.  
  const chartData = appointments?.reduce((acc: any[], curr) => {
  const statusKey = curr.status.toLowerCase(); // Ensure matching
  const existing = acc.find(item => item.name === statusKey);

  if (existing) {
    existing.value += 1;
  } else {
    acc.push({ 
      name: statusKey, 
      value: 1, 
      fill: COLORS[statusKey as keyof typeof COLORS] || '#94a3b8' 
    });
  }
  return acc;
}, []) || [];
    
  return (

    
    <div>
      <div className="flex flex-col justify-center items-center mt-2 mb-4 text-center gap-3">
        <h1 className="font-bold text-5xl my-[1rem]">Lumina Health Collective</h1>
        <p className="max-w-[70rem] text-[1.1rem] text-gray-700 mt-[1rem]">Lumina Health Collective is a premier multi-disciplinary medical firm dedicated to the fusion of compassionate care and clinical precision. Established in 1998, Lumina has evolved from a specialized surgical center into a world-class healthcare network. We pride ourselves on maintaining a 1:4 staff-to-patient ratio, ensuring that every individual receives the focused attention required for optimal recovery. Our mission is to illuminate the path to wellness through transparency, advanced medical research, and an unwavering commitment to patient safety and surgical excellence.</p>
      </div>

    {/* Donut Chart */}
    <div className="flex flex-col items-center w-full p-8 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.15)] bg-white border border-gray-100 mt-[10rem]">
      <h1 className="text-4xl font-bold mb-4">Performance Stats</h1>
    
      {/* Set a specific height here so it doesn't push the legend out */}
      <div className="w-full h-[300px]"> 
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
            />
            <Tooltip />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer> 
      </div>
    </div>

    <div className="my-[10rem] mx-2">
      <h1 className="text-4xl flex flex-col items-center justify-center text-center">
        <span className="font-bold">Active Medical Staff:</span> 100+
      </h1>
      <p className="mt-[1rem] text-[1.1rem] text-gray-700 mt-2 mb-4 text-center gap-3 mx-auto line-h-[1.6]">
        With our actively growing medical staff, we are looking forward to providing you with the highest standard of healthcare and a supportive environment for your recovery. Our team is dedicated to continuous growth and excellence, ensuring that every patient receives personalized attention and world-class medical expertise in a facility designed for your comfort and peace of mind.
      </p>
    </div>
  </div>
  )
}

export default Dashboard