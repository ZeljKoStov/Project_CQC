import React , {useState}from 'react';
import { useNavigate } from "react-router-dom";

import './register.css';

const Register = () => {

  const [email, setEmail]=useState('');  
  const [pass, setPass]=useState('');
  const [name, setName]=useState('');

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/Login`; 
    navigate(path);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(email);
  }

  return (
    <div className='container'>
      <div className='form-container'>
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor='name'>Full name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type={'name'}  placeholder='full Name' id='name' name='name'/>
            <label htmlFor='email'>email</label>
            <input value ={email} onChange={(e) => setEmail(e.target.value)} type={'email'} placeholder='youremail@gmail.com' id='email' name='email'/>
            <label htmlFor='password'>password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type={'password'} placeholder='********' id='password' name='password'/>
            <button type='submit'>Log In</button>
        </form>
        <button className="link-btn" onClick={routeChange}>Alredy have an account? Login here.</button>
        </div>
    </div>
  )
}

export default Register
