import React, { useState, useEffect  } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { RequestAPI } from '../../utils/request-api'
import { register, details } from '../../api/api'
import { setCookie, getCookie, } from '../../utils/cookies';
import './register.css';
import back from "../../assets/back.jpeg"

const Register = ({ signIn }) => {

  const { id } = useParams();

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

  const [address2, setAddress2] = useState('')
  const [adress2Error, setAddress2Error] = useState(false);

  const [city, setCity] = useState('')
  const [cityError, setCityError] = useState(false);

  const [state, setState] = useState('')
  const [stateError, setStateError] = useState(false);

  const [country, setCountry] = useState('')
  const [countryError, setCountryError] = useState(false);

  const [zipCode, setZipCode] = useState('')
  const [zipCodeError, setZipCodeError] = useState(false);

  const [phoneNumber, setPhoneNumder] = useState('')
  const [phoneNumberError, setPhoneNumberError] = useState(false);


  const [registerError, setRegisterError] = useState(false)
  const [registerErrorText, setRegisterErrorText] = useState('')

  const [loading, setLoading] = useState(false);

  const [regStep, setRegStep] = useState(0) //0 je registracija usera, 1 - je unos sippinga i godina, 2 je depozit

  const navigate = useNavigate();

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

  const onAddress2Changed = (e) => {
    e.preventDefault()
    setAddress2(e.target.value)
  }

  const onCityChanged = (e) => {
    e.preventDefault()
    setCity(e.target.value)
  }

  const onStateChanged = (e) => {
    e.preventDefault()
    setState(e.target.value)
  }

  const onCountryChanged = (e) => {
    e.preventDefault()
    setCountry(e.target.value)
  }

  const onZipCodeChanged = (e) => {
    e.preventDefault()
    setZipCode(e.target.value)
  }

  const onPhoneNumberChanged = (e) => {
    e.preventDefault()
    setPhoneNumder(e.target.value)
  }

  const submitRegister = async (e) => {
    e.preventDefault();

    if (name === '' || email === '' || password === '' || password.length < 6 || password !== confirmPassword) {

      if (name === '') setNameError(true);
      else setNameError(false);

      if (email === '') setEmailError(true);
      else setEmailError(false);

      if (password === '' || password.length < 6) {
        setPasswordErrorText("Password must be al least 6 caracters!")
        setPasswordError(true)
      } else if (password !== confirmPassword) {
        setPasswordErrorText("Passwords do not match!")
        setPasswordError(true)
      } else setPasswordError(false)

    } else {

      setNameError(false)
      setEmailError(false)
      setPasswordError(false)

      setLoading(true);

      const registerObj = {
        name: name,
        email: email,
        password: password,
      }

      try {
        const response = await RequestAPI(register(registerObj));
        setLoading(false);
        if (response.status === 200) {
          setCookie('_jwt', response.data.token)
          setCookie('_name', response.data.name)
          setCookie('_email', response.data.email)
          signIn(response.data.name, response.data.email)
          setRegStep(1);
        } else if (response.status === 201) {
          console.log(response.data)
          setRegisterErrorText(response.data.error)
          setRegisterError(true)
        }

      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }

  const submitDetails = async (e) => {
    e.preventDefault();

    if (address === '' || state === '' || country === '' || phoneNumber === '' || zipCode === '') {
      if (address === '') setAddressError(true)
      else setAddressError(false)

      if (country === '') setCountryError(true)
      else setCountryError(false)

      if (phoneNumber === '') setPhoneNumberError(true)
      else setPhoneNumberError(false)

      if (zipCode === '') setZipCodeError(true)
      else setZipCodeError(false)

    } else {
      setAddressError(false)
      setStateError(false)
      setCountryError(false)
      setPhoneNumberError(false)
      setZipCodeError(false)
      setLoading(true);


      const _email = getCookie('_email');
      setEmail(_email)

      const detailsObj = {
        email: _email,
        address: address,
        address2: address2,
        city: city,
        state: state,
        country: country,
        zipCode: zipCode,
        phoneNumber: phoneNumber
      }

      try {
        const response = await RequestAPI(details(detailsObj));
        setLoading(false)
        if (response.status === 200) {
          navigate('/My_Profile');
        }

      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    console.log(id);
    if (id != null && id != undefined) setRegStep(2);
  }, [id])

  return (
    <>
      <div className='register_container'>
        <img src={back} alt="Girl in a jacket" className='backgroundImage' />
        <div className='register_body'>
          {
            loading && <div class="reg-spinner-overlay">
              <div class="reg-spinner"></div>
            </div>
          }
          {
            regStep === 0 && <>
              <div className='title'>
                <spam>Registration</spam>
              </div>
              <form className="register-form" onSubmit={submitRegister}>
                <spam htmlFor='name'>Full name</spam>
                <input value={name} onChange={(e) => onNameChanged(e)} type={'name'} placeholder='Full Name' id='name' name='name' />
                {nameError && <label className="error_text">Name cannot be empty!</label>}
                <spam htmlFor='email'>Email</spam>
                <input value={email} onChange={(e) => onEmailChanged(e)} type={'email'} placeholder='youremail@gmail.com' id='email' name='email' />
                {emailError && <label className="error_text">Email cannot be empty!</label>}
                <spam htmlFor='password'>Password</spam>
                <input value={password} onChange={(e) => onPasswordChanged(e)} type={'password'} placeholder='********' id='password' name='password' />
                {passwordError && <label className="error_text">{passwordErrorText}</label>}
                <spam htmlFor='password'>Confirm password</spam>
                <input value={confirmPassword} onChange={(e) => onConfirmPasswordChanged(e)} type={'password'} placeholder='********' id='confirm' name='confirm' />
                {registerError && <label className="error_text">{registerErrorText}</label>}
                <button className='blue_button' onClick={(e) => submitRegister(e)}>Register</button>
              </form>
            </>
          }
          {
            regStep === 1 && <>
              <div className='title'>
                <spam>Please verify your email address!</spam>
                <spam>We sent an emil to: {email}</spam>
              </div>
            </>
          }
          {
            regStep === 2 && <>
              <div className='title'>
                <spam>Email Sucessfuly Verified</spam>
                <spam>Please Add Shipping Details</spam>
              </div>
              <form className="register-form" onSubmit={submitDetails}>
                <spam htmlFor='address'>Shipping Address</spam>
                <input value={address} onChange={(e) => onAddressChanged(e)} placeholder='Shipping Address' />
                {adressError && <label className="error_text">Address cannot be empty!</label>}

                <spam htmlFor='address'>Aditional Address</spam>
                <input value={address2} onChange={(e) => onAddress2Changed(e)} placeholder='Additional Address' />

                <spam htmlFor='address'>City</spam>
                <input value={city} onChange={(e) => onCityChanged(e)} placeholder='City' />

                <spam htmlFor='address'>State</spam>
                <input value={state} onChange={(e) => onStateChanged(e)} placeholder='State' />

                <spam htmlFor='address'>Zip Code</spam>
                <input value={zipCode} onChange={(e) => onZipCodeChanged(e)} placeholder='Zip Code' />
                {zipCodeError && <label className="error_text">Zip Code cannot be empty!</label>}

                <spam htmlFor='address'>Country</spam>
                <input value={country} onChange={(e) => onCountryChanged(e)} placeholder='Country' />
                {countryError && <label className="error_text">Country cannot be empty!</label>}

                <spam htmlFor='address'>Phone Number</spam>
                <input value={phoneNumber} onChange={(e) => onPhoneNumberChanged(e)} placeholder='Phone Number' />
                {phoneNumberError && <label className="error_text">Phone Number cannot be empty!</label>}
                <button className='blue_button' onClick={(e) => submitDetails(e)}>Add Shipping Details</button>
              </form>
            </>
          }
        </div>
      </div>
    </>
  )
}

export default Register
