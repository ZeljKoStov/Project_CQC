import React , {useState}from 'react';
import { login } from '../../api/login';
import { RequestAPI } from '../../utils/request-api'
import { useNavigate } from "react-router-dom";
import './login.css';

const Login = () => {

    const [loginObj, setLoginObj] = useState({
        email: '',
        password: '',
    });

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/Register`; 
      navigate(path);
    }

    const onChangeInput = (e) => {
        let val = e.target.value;
        let name = e.target.name;
        let newLogin = Object.assign({}, loginObj);
    
        newLogin[name] = val;

        setLoginObj(newLogin);
    }

    const submitLogin = async (e) => {
        e.preventDefault();
        console.log(loginObj);

        try {
            const response = await RequestAPI(login(loginObj));
            if (response.status === 200) {
                console.log(response.data.data);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className='form-container'>
                <h2>Login</h2>
                <form className='login-form' onSubmit={(e) => submitLogin(e)}>
                    <label htmlFor='email'>email</label>
                    <input value ={loginObj['email']} onChange={(e) => onChangeInput(e)} type={'email'} placeholder='youremail@gmail.com' id='email' name='email'/>
                    <label htmlFor='password'>password</label>
                    <input value={loginObj['password']} onChange={(e) => onChangeInput(e)} type={'password'} placeholder='********' id='password' name='password'/>
                    <button type='submit'>Log In</button>
                </form>
            <button className="link-btn" onClick={routeChange}>Don't have an account? Register here.</button>
            </div>
        </div>
  )
}

export default Login
