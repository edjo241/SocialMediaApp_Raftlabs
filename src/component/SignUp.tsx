import React, { useState } from 'react';
import supabase from './supabase';
import {auth} from '../firebase'
import { Link, useNavigate } from 'react-router-dom';

const Registration: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<any | null>(null);
  const[username ,setUserName]=useState('');
  const[userData,setUserData]=useState<any>();

  const navigate = useNavigate();
  const signUp=(e:any)=>{

    e.preventDefault();
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser:any)=>{
       authUser.user.updateProfile({
        displayName:username
      })
      navigate('/home')
    })
    .catch((error:any)=>alert(error.messages));
  }



  return (
    <div>
  

<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    {/* <form className="space-y-6" action="#" method="POST"> */}
      <div>
        <label  className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" type="email"  
          required 
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          
        </div>
      </div>

      <div>
        <label  className="block text-sm font-medium leading-6 text-gray-900">User name</label>
        <div className="mt-2">
          <input id="email" name="username" type="text"  
          required 
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          />
          
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label  className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
          </div>
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password"  required 
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          /><br></br>
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>

        </div>
      </div>

      <div>
        <Link to='/home'>
        <button type="submit" 
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={signUp}
        >Sign in</button>
        </Link>
      </div>
    {/* </form> */}

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <Link to="/login">

      <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Log In</a>
      </Link>
    </p>
  </div>
</div>
        
      
      {error && <p>{error}</p>}
    </div>
  );
};

export default Registration;
