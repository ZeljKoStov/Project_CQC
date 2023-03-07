import React , {Fragment,useState}from 'react';
import { login } from '../../api/login';
import { RequestAPI } from '../../utils/request-api'
import { useNavigate } from "react-router-dom";
import { setCookie } from '../../utils/cookies';
import './login.css';

const Login = ({signIn}) => {

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
            console.log(response)
            if (response.data.success) {
                console.log(response.data)
                setCookie('_jwt',response.data.token)
                setCookie('_name',response.data.name)
                setCookie('_email',response.data.email)
                signIn(response.data.name,response.data.email)
                navigate(`/`);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
        {     
        
            <div className='container'>
                <div className='form-container'>
                
    
                    <h2>Login</h2>
                    <form className='login-form' onSubmit={(e) => submitLogin(e)}>
                        <label htmlFor='email'>email</label>
                        <input value ={loginObj['email']} onChange={(e) => onChangeInput(e)} type={'email'} placeholder='youremail@gmail.com' id='email' name='email'/>
                        <label htmlFor='password'>password</label>
                        <input value={loginObj['password']} onChange={(e) => onChangeInput(e)} type={'password'} placeholder='********' id='password' name='password'/>
                        <button type='submit'>Sign In</button>
                    </form>
                    <button className="link-btn" onClick={routeChange}>Don't have an account? Register here.</button>
                </div>
            </div>
            
        }
      </Fragment>
  )
}

export default Login
