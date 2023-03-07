import React , {useState}from 'react';
import { useNavigate } from "react-router-dom";
import { RequestAPI } from '../../utils/request-api'
import { register } from '../../api/register'
import { setCookie } from '../../utils/cookies';
import './register.css';
import { details } from '../../api/details';
import back from "./back.jpeg"

import StripeContainer from '../../Component/Stripe/StripeContainer';

const Register = () => {

  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(false)

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorText, setPasswordErrorText] = useState('')

  const [address, setAddress] = useState('')
  const [adressError, setAddressError] = useState(false);

  const [state, setState] = useState('')
  const [stateError, setStateError] = useState(false);

  const [zipCode, setZipCode] = useState('')
  const [zipCodeError, setZipCodeError] = useState(false);

  const [phoneNumber, setPhoneNumder] = useState('')
  const [phoneNumberError, setPhoneNumberError] = useState(false);


  const [registerError, setRegisterError] = useState(false)
  const [registerErrorText, setRegisterErrorText] = useState('')

  const [detailsError, setDetailsError] = useState(false)
  const [detailsErrorText, setDetailsErrorText] = useState('')

  const [amount, setAmount] = useState(10);
  const [amountError, setAmountError] = useState(false);

  const [success, setSucess] = useState(false);

  const [regStep, setRegStep] = useState(0) //0 je registracija usera, 1 - je unos sippinga i godina, 2 je depozit

  const onNameChanged = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const onEmailChanged = (e) => {
    e.preventDefault()
    setEmail(e.target.value)
  }

  const onPasswordChanged = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
  }

  const onConfirmPasswordChanged = (e) => {
    e.preventDefault()
    setConfirmPassword(e.target.value)
  }

  const onAddressChanged = (e) => {
    e.preventDefault()
    setAddress(e.target.value)
  }

  const onStateChanged = (e) => {
    e.preventDefault()
    setState(e.target.value)
  }

  const onZipCodeChanged = (e) => {
    e.preventDefault()
    setZipCode(e.target.value)
  }

  const onPhoneNumberChanged = (e) => {
    e.preventDefault()
    setPhoneNumder(e.target.value)
  }

  const onAmountChanged = (e) => {
    e.preventDefault()
    setAmount(e.target.value)
  }


  const submitRegister = async (e) => {
    e.preventDefault();

    if(name==='') {
      setNameError(true)
    } else if(email==='') {
      setEmailError(true)
    } else if(password==='' || password.length<6) {
      setPasswordErrorText("Password must be al least 6 caracters!")
      setPasswordError(true)
    } else if(password!==confirmPassword) {
      setPasswordErrorText("Passwords do not match!")
      setPasswordError(true)
    } else {
      const registerObj = {
        name: name,
        email: email,
        password: password,
      }
  
      try {
          const response = await RequestAPI(register(registerObj));
          console.log(response)
          if (response.status === 200) {
            setCookie('_jwt',response.data.token)
            setCookie('_name',response.data.name)
            setCookie('_email',response.data.email)
            console.log("EMAIL")
            console.log(response.data.email)
            setRegStep(1);
          } else if(response.status === 201) {
            console.log(response.data)
            setRegisterErrorText(response.data.error)
            setRegisterError(true)
          }
  
      } catch (error) {
          console.log(error);
      }
    } 
  }

  const submitDetails = async (e) => {
    e.preventDefault();

    if(address==='') setAddressError(true)
    else if(state==='') setStateError(true)
    else if(phoneNumber==='') setPhoneNumberError(true)
    else if(zipCode==='') setZipCodeError(true)
    else {
      const detailsObj = {
        email: email,
        address: address,
        state: state,
        zipCode: zipCode,
        phoneNumber: phoneNumber
      }
  
      try {
          const response = await RequestAPI(details(detailsObj));
          console.log(response)
          if (response.status === 200) {
            setRegStep(2);
          } else if(response.status === 201) {
            console.log(response.data)
            setDetailsErrorText(response.data.error)
            setDetailsError(true)
          }
  
      } catch (error) {
          console.log(error);
      }
    } 
  }

  const onPaymentResut = (response) => {
    if(response) setSucess(true);
  }

  return (
    <>
       
       <div className='cqc__header b'>
         {
           regStep===0 && <>
             <div className='title'>
                 <spam>Registration</spam>
             </div>
             <form className="register-form" onSubmit={submitRegister}>
                 <spam htmlFor='name'>Full name</spam>
                 <input value ={name} onChange={(e) => onNameChanged(e)} type={'name'}  placeholder='Full Name' id='name' name='name'/>
                 {nameError && <label className="error_text">Name cannot be empty!</label>}
                 <spam htmlFor='email'>Email</spam>
                 <input value ={email} onChange={(e) => onEmailChanged(e)} type={'email'} placeholder='youremail@gmail.com' id='email' name='email'/>
                 {emailError && <label className="error_text">Email cannot be empty!</label>}
                 <spam htmlFor='password'>Password</spam>
                 <input value ={password} onChange={(e) => onPasswordChanged(e)} type={'password'} placeholder='********' id='password' name='password'/>
                 {passwordError && <label className="error_text">{passwordErrorText}</label>}
                 <spam htmlFor='password'>Confirm password</spam>
                 <input value ={confirmPassword} onChange={(e) => onConfirmPasswordChanged(e)} type={'password'} placeholder='********' id='confirm' name='confirm'/>
                 {registerError && <label className="error_text">{registerErrorText}</label>}
                 <button className='blue_button' onClick={(e)=> submitRegister(e)}>Register</button>
             </form>
           </>
         }
         {
           regStep===1 && <>
             <div className='title'>
                 <spam>Add Shipping Details</spam>
             </div>
             <form className="register-form" onSubmit={submitDetails}>
                 <spam htmlFor='address'>Shipping Address</spam>
                 <input value ={address} onChange={(e) => onAddressChanged(e)} placeholder='Shipping Address' />
                 {adressError && <label className="error_text">Address cannot be empty!</label>}
                 <spam htmlFor='address'>State</spam>
                 <input value ={state} onChange={(e) => onStateChanged(e)} placeholder='State' />
                 {stateError && <label className="error_text">State cannot be empty!</label>}
                 <spam htmlFor='address'>Zip Code</spam>
                 <input value ={zipCode} onChange={(e) => onZipCodeChanged(e)} placeholder='Zip Code' />
                 {zipCodeError && <label className="error_text">Zip Code cannot be empty!</label>}
                 <spam htmlFor='address'>Phone Number</spam>
                 <input value ={phoneNumber} onChange={(e) =>  onPhoneNumberChanged(e)} placeholder='Phone Number'/>
                 {phoneNumberError && <label className="error_text">Phone Number cannot be empty!</label>}
                 <button className='blue_button' onClick={(e)=> submitDetails(e)}>Add Shipping Details</button>
             </form>
           </>
         }
         {
           regStep===2 && <>
              <div className='title'>
                 <spam>Make a Deposit</spam>
              </div>
          
              { !success ?
                <>
                  <spam htmlFor='amount'>Enter Deposit Amount (min $10)</spam>
                  <input className="depositInput" value ={amount} onChange={(e) => onAmountChanged(e)} type={'number'}  placeholder='$10' id='amount' name='amount'/>
                  {amountError && <label className="error_text">Amount must be greater then $10!</label>}

                  <div className='cardField'>
                    <StripeContainer onResult={onPaymentResut} paymentAmount={amount*100} userEmail={email} />
                  </div>
                </>
                :
                <>
                  <spam htmlFor='amount'>Payment successfull!</spam>
                  <spam htmlFor='amount'>Registration completed!</spam>
                </>
              }

           </>
         }
        </div>    
          
       </>
  )
}

export default Register
