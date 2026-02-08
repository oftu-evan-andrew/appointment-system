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
      // Set the color right here in the data object!
      fill: COLORS[statusKey as keyof typeof COLORS] || '#94a3b8' 
    });
  }
  return acc;
}, []) || [];
    
  return (

    
    <div>
      <div className="flex flex-col justify-center items-center mt-2 mb-4 text-center gap-3">
        <h1 className="font-bold text-2xl">Lumina Health Collective</h1>
        <p className="max-w-[70rem]">Lumina Health Collective is a premier multi-disciplinary medical firm dedicated to the fusion of compassionate care and clinical precision. Established in 1998, Lumina has evolved from a specialized surgical center into a world-class healthcare network. We pride ourselves on maintaining a 1:4 staff-to-patient ratio, ensuring that every individual receives the focused attention required for optimal recovery. Our mission is to illuminate the path to wellness through transparency, advanced medical research, and an unwavering commitment to patient safety and surgical excellence.</p>
      </div>

      {/* Donut Chart */}
    <div className="h-75 w-full" >
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
          <Legend />
        </PieChart>
      </ResponsiveContainer>  
    </div>
  </div>
  )
}

export default Dashboard