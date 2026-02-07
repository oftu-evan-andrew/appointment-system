import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../store/authSlice';
import type { AppDispatch, RootState } from '../../store/store';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullname] = useState('')
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const result = await dispatch(register({ email, password, fullName }));
        if (register.fulfilled.match(result)) {
            navigate('/');
        }
    };

  return (
    <div className="flex justify-center">
      <form
       onSubmit={handleSubmit}
       className="border border-solid flex flex-col justify-center w-[35%] items-center p-8 gap-4 h-125 m-[4rem] rounded">
        <div className="text-2xl font-bold">Register</div>
        <input 
        className="w-[60%] border border-solid p-1"
        type="text" 
        placeholder="full name"
        value={fullName}
        onChange={(e) => setFullname(e.target.value)}
        required
        />
        <input 
        className="w-[60%] border border-solid p-1"
        type="email" 
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        <input
        value={password}
        type="password"
        placeholder="password"
        className="w-[60%] border border-solid p-1"
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        <input
        type="password"
        placeholder="Confirm Password"
        className="w-[60%] border border-solid p-1"
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        required
        />
        <button
         type='submit'
         disabled={loading}
         className="border border-solid w-[30%] rounded hover:bg-gray-400 hover:text-white cursor-pointer hover:border-black">Sign Up</button>
      </form>  
    </div>
  )
}

export default Register