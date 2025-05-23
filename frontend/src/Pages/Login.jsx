import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const {backendUrl,token,setToken} = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
      
    if (state === 'Sign Up') {
      if (!name || !email || !password || !confirmPassword) {
        return toast.error("All fields are required");
      }

      if (password !== confirmPassword) {
        return toast.error("Passwords do not match");
      }

    } else {
      if (!email || !password) {
        return toast.error("Email and Password are required");
      }
    
    }

    try {
      if(state === "Sign Up") {
        const {data} = await axios.post(backendUrl + '/api/user/register',{name,email,password})
        if(data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        } else{
          toast.error(data.message)
        } 
      } else{
        const {data} = await axios.post(backendUrl + '/api/user/login',{email,password})
        if(data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  
  };

  useEffect(() => {
    if(token) {
      navigate('/')
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
          <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
          <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>

          {state === "Sign Up" && (
            <>
              <div className='w-full'>
                <p>Full Name</p>
                <input
                  className='border border-zinc-300 rounded w-full p-2 mt-1'
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
            </>
          )}

          <div className='w-full'>
            <p>Email</p>
            <input
              className='border border-zinc-300 rounded w-full p-2 mt-1'
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className='w-full'>
            <p>Password</p>
            <input
              className='border border-zinc-300 rounded w-full p-2 mt-1'
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          {state === "Sign Up" && (
            <div className='w-full'>
              <p>Confirm Password</p>
              <input
                className='border border-zinc-300 rounded w-full p-2 mt-1'
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
          )}

          <button className='bg-blue-600 text-white w-full p-2 rounded-md text-base cursor-pointer'>
            {state === 'Sign Up' ? "Create Account" : "Login"}
          </button>

          {state === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span onClick={() => setState('Login')} className='text-blue-600 underline cursor-pointer'>Login Here</span>
            </p>
          ) : (
            <p>
              Create an account?{" "}
              <span onClick={() => setState('Sign Up')} className='text-blue-600 underline cursor-pointer'>click here</span>
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default Login;
