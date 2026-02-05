
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  
  const [user, setUser] = useState(true);
  
  return (
    <nav className="border border-solid ">
        <div className="flex justify-between items-center">
            <Link to="/" className="text-black text-2xl px-6 py-3 rounded-lg font-bold">Appointment System</Link>
            <div className="flex gap-4 mr-1">
                {user ? (
                    <div className="">
                        <button 
                        onClick={() => setUser(false)}
                        className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 mx-[0.25rem] cursor-pointer"
                        >Logout</button>
                    </div>
                ) : (
                    <div className="">
                        <Link to="/login" className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 mx-2 my-5">Login</Link>
                        <Link to="/register" className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800">Register</Link>
                    </div>
                )}
            </div>
        </div>
    </nav>
  )
}

export default Navbar