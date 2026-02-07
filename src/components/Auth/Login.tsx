import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/authSlice';
import { type AppDispatch, type RootState } from '../../store/store';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {loading, error } = useSelector((state: RootState) => state.auth);
  
  const handleSubmit = async(e: React.FormEvent) => { 
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
       navigate('/');
    }
    
  };

  return (
    <div className="flex justify-center">
      <form 
      className="border border-solid flex flex-col justify-center w-[35%] items-center p-8 gap-4 h-125 m-[4rem] rounded"
      onSubmit={handleSubmit}
      >
        <div className="text-2xl font-bold">Login</div>
        <input 
        className="w-[60%] border border-solid p-1"
        type="email" 
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        <input
        type="password"
        placeholder="password"
        className="w-[60%] border border-solid p-1"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        <button 
        className="border border-solid w-[30%] rounded hover:bg-black hover:text-white cursor-pointer hover:border-black py-1 font-bold"
        type="submit"
        disabled={loading}
        >{loading  ? "Logging in..." : "Login"}</button>
      </form>  
    </div>
  )
}

export default Login