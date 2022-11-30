import React , {useState}from 'react';
import { useNavigate } from "react-router-dom";
import { RequestAPI } from '../../utils/request-api'
import { register } from '../../api/register'
import { setCookie } from '../../utils/cookies';

import './register.css';

const Register = () => {

  const [registerObj, setRegisterObj] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [confirm, setConfirm] = useState('')

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/Login`; 
    navigate(path);
  }
  const onChangeInput = (e) => {
    let val = e.target.value;
    let name = e.target.name;
    let newRegObj = Object.assign({}, registerObj);

    newRegObj[name] = val;

    setRegisterObj(newRegObj);
  }

  const onChangeConfirm = (e) => {
    let val = e.target.value
    setConfirm(val)
  }

  const submitRegister = async (e) => {
    e.preventDefault();
    console.log(registerObj);

    try {
        const response = await RequestAPI(register(registerObj));
        console.log(response)
        if (response.status === 200) {
            setCookie('_jwt',response.data.token)
            setCookie('_name',response.data.name)
            navigate(`/`);
        }

    } catch (error) {
        console.log(error);
    }
}

  return (
    <div className='container'>
      <div className='form-container'>
        <h2>Register</h2>
        <form className="register-form" onSubmit={submitRegister}>
            <label htmlFor='name'>Full name</label>
            <input value ={registerObj['name']} onChange={(e) => onChangeInput(e)} type={'name'}  placeholder='full Name' id='name' name='name'/>
            <label htmlFor='email'>Email</label>
            <input value ={registerObj['email']} onChange={(e) => onChangeInput(e)} type={'email'} placeholder='youremail@gmail.com' id='email' name='email'/>
            <label htmlFor='password'>Password</label>
            <input value ={registerObj['password']} onChange={(e) => onChangeInput(e)} type={'password'} placeholder='********' id='password' name='password'/>
            <label htmlFor='password'>Confirm password</label>
            <input value ={confirm} onChange={(e) => onChangeConfirm(e)} type={'password'} placeholder='********' id='confirm' name='confirm'/>
            <button type='submit'>Register</button>
        </form>
        <button className="link-btn" onClick={routeChange}>Alredy have an account? Login here.</button>
        </div>
    </div>
  )
}

export default Register
