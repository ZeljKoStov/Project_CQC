import React, { Fragment, useState } from 'react';
import { login } from '../../api/api';
import { RequestAPI } from '../../utils/request-api'
import { useNavigate } from "react-router-dom";
import { setCookie } from '../../utils/cookies';
import './login.css';
import back from "../../assets/back.jpeg"

const Login = ({ signIn }) => {

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [signInError, setSignInError] = useState(false)
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/Register`;
        navigate(path);
    }

    const onEmailChanged = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const onPasswordChanged = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }


    const submitLogin = async (e) => {
        e.preventDefault();
        

        if(email === '' || password === ''){
            if(email === '') setEmailError(true);
            else setEmailError(false);
            
            if(password === '') setPasswordError(true);
            else setPasswordError(false);
        } else {
            setLoading(true);
            setEmailError(false);
            setPasswordError(false);

            const body = {
                email: email,
                password: password,
            };
    
            try {
                const response = await RequestAPI(login(body));
                setLoading(false)
                if (response.data.success) {
                    console.log(response.data)
                    setCookie('_jwt', response.data.token)
                    setCookie('_name', response.data.name)
                    setCookie('_email', response.data.email)
                    signIn(response.data.name, response.data.email)
                    navigate(`/`);
                } else {
                    setSignInError(true);
                }
    
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
            
        }
    }

    return (
        <Fragment>
            {

                <div className='container'>
                    <img src={back} alt="Girl in a jacket" className='backgroundImage' />
                    <div className='login_body'>
                        {
                            loading && <div class="reg-spinner-overlay">
                                <div class="reg-spinner"></div>
                            </div>
                        }
                        <div className='title'>
                            <spam>Sign In</spam>
                        </div>
                        <form className="login-form">
                            <spam htmlFor='email'>Email</spam>
                            <input value={email} onChange={(e) => onEmailChanged(e)} type={'name'} placeholder='Full Name' id='name' name='name' />
                            {emailError && <label className="error_text">Email is empty!</label>}
                            <spam htmlFor='password'>Password</spam>
                            <input value={password} onChange={(e) => onPasswordChanged(e)} type={'password'} placeholder='********' id='password' name='password' />
                            {passwordError && <label className="error_text">Password is empty!</label>}
                            {signInError && <label className="error_text">Incorrect Email or Password! </label>}
                            <button className='blue_button' onClick={(e) => submitLogin(e)}>Sign In</button>
                            <button className="link-btn" onClick={routeChange}>Don't have an account? Register here.</button>
                        </form>
                    </div>
                </div>

            }
        </Fragment>
    )
}

export default Login
