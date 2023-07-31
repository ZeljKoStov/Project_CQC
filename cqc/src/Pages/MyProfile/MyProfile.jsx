import React, { useState } from 'react';
import { getCookie } from '../../utils/cookies';
import { userData } from '../../api/api'
import { RequestAPI } from '../../utils/request-api'
import back from "../../assets/back.jpeg"
import { details } from '../../api/api'
import './myProfile.css';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import silver_token from "../../assets/silver_token.gif"


const MyProfile = () => {


    const [dataFetched, setDataFetched] = useState(false);
    const [name, setName] = useState("");
    const [tokens, setTokens] = useState(0);
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [newAddress, setNewAddress] = useState("");
    const [newAddress2, setNewAddress2] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newState, setNewState] = useState("");
    const [newCountry, setNewCountry] = useState("");
    const [newZipCode, setNewZipCode] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("")
    const [isAdmin, setIsAdmin] = useState(false);

    const [adressError, setAddressError] = useState(false);
    const [stateError, setStateError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    
    const [zipCodeError, setZipCodeError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);

    const navigate = useNavigate();

    const handleAddButton = (e) => {
        e.preventDefault()
        navigate("/Web_Shop")
    }

    useEffect(() => {
        if (!dataFetched) {
            fetchData()
            setDataFetched(true);
        }
    });

    const fetchData = async () => {
        try {
            const email = getCookie('_email')
            const body = {
                email: email
            }
            const response = await RequestAPI(userData(body));
            console.log(response)
            if (response.status === 200) {
                setName(response.data.name)
                setEmail(response.data.email)
                setAddress(response.data.address)
                setNewAddress(response.data.address)
                setAddress2(response.data.address2)
                setNewAddress2(response.data.address2)
                setCity(response.data.city)
                setNewCity(response.data.city)
                setState(response.data.state)
                setNewState(response.data.state)
                setCountry(response.data.country)
                setNewCountry(response.data.country)
                setZipCode(response.data.zipCode)
                setNewZipCode(response.data.zipCode)
                setPhoneNumber(response.data.phoneNumber)
                setNewPhoneNumber(response.data.phoneNumber)
                setTokens(response.data.tokens)

                if (response.data.admin != undefined && response.data.admin != null && response.data.admin == true) {
                    setIsAdmin(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditButton = (e) => {
        e.preventDefault();
        setNewAddress(address)
        setNewAddress2(address2)
        setNewCity(city)
        setNewState(state)
        setNewCountry(country)
        setNewZipCode(zipCode)
        setNewPhoneNumber(phoneNumber)
        setEditing(true);
    }

    const handleSaveButton = async (e) => {
        e.preventDefault()

        if (address === '' || state === '' || phoneNumber === '' || zipCode === '') {
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
            setCountryError(false)
            setPhoneNumberError(false)
            setZipCodeError(false)
            setLoading(true);

            const detailsObj = {
                email: email,
                address: newAddress,
                address2: newAddress2,
                city: newCity,
                state: newState,
                country: newCountry,
                zipCode: newZipCode,
                phoneNumber: newPhoneNumber
            }

            try {
                const response = await RequestAPI(details(detailsObj));
                setLoading(false)
                setEditing(false);
                if (response.status === 200) {
                    setAddress(newAddress)
                    setAddress2(newAddress2)
                    setCity(newCity)
                    setState(newState)
                    setCountry(newCountry)
                    setZipCode(newZipCode)
                    setPhoneNumber(phoneNumber)
                }
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
    }

    const handleCancelButton = (e) => {
        e.preventDefault()
        setEditing(false);

    }

    return (
        <div className='container'>
            <img src={back} alt="Girl in a jacket" className='backgroundImage' />
            {
                loading && <div class="reg-spinner-overlay">
                    <div class="reg-spinner"></div>
                </div>
            }
            <div className='login_body'>
                <div class="profile__name">My Profile</div>
                <div class="profile">
                    <table>
                        <tr>
                            <td>Name:</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>
                                {editing ?
                                    <input type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
                                    :
                                    address
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Additional Address:</td>
                            <td>
                                {editing ?
                                    <input type="text" value={newAddress2} onChange={(e) => setNewAddress2(e.target.value)} />
                                    :
                                    address2
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>City:</td>
                            <td>
                                {editing ?
                                    <input type="text" value={newCity} onChange={(e) => setNewCity(e.target.value)} />
                                    :
                                    city
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>State:</td>
                            <td>
                                {editing ?
                                    <input type="text" value={newState} onChange={(e) => setNewState(e.target.value)} />
                                    :
                                    state
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Zip Code:</td>
                            <td>
                                {editing ?
                                    <input type="text" value={newZipCode} onChange={(e) => setNewZipCode(e.target.value)} />
                                    :
                                    zipCode
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Country:</td>
                            <td>
                                {editing ?
                                    <input type="text" value={newCountry} onChange={(e) => setNewCountry(e.target.value)} />
                                    :
                                    country
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Phone Number:</td>
                            <td>
                                {editing ?
                                    <input type="text" value={newPhoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)} />
                                    :
                                    phoneNumber
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Orders:</td>
                            <td><button className="profile-link-btn" onClick={() => { navigate("/Orders") }} >View Orders</button></td>
                        </tr>
                        <tr>
                            <td>
                                <div className='profile_tokens_row_coin'>
                                    <img className="token_animation" src={silver_token} alt="Gallery" />
                                    <p>Processing Tokens: </p>
                                </div>
                                
                                </td>
                            <td>
                                <div className='profile_tokens_row_coin'>
                                    <p>{tokens} </p>
                                </div>
                            </td>
                        </tr>
                        {
                            isAdmin &&
                            <tr>
                                <td>Admin Panel</td>
                                <td><button className="profile-link-btn" onClick={() => { navigate("/Admin") }} >Go To Admin</button></td>
                            </tr>
                        }


                    </table>
                    {
                        <>
                            {
                                editing ?
                                    <div className='btnAdd'>
                                        <button className='blue_button' onClick={(e) => handleSaveButton(e)} style={{ marginRight: "2rem", width: "170px" }}>Save Changes</button>
                                        <button className='blue_button' onClick={(e) => handleCancelButton(e)} style={{ marginRight: "2rem", width: "170px" }}>Cancel Changes</button>
                                    </div>
                                    :
                                    <>
                                        <div className='btnAdd'>
                                            <button className='blue_button' onClick={(e) => handleEditButton(e)} style={{ marginRight: "2rem", width: "170px" }}>Edit Details</button>
                                            <button className='blue_button' onClick={(e) => handleAddButton(e)} style={{ marginRight: "2rem", width: "170px" }}>Get More Tokens</button>
                                        </div>
                                    </>
                            }
                        </>
                    }


                </div>

            </div>


        </div>
    )
}

export default MyProfile
