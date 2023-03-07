import React, {useState} from 'react';
import { getCookie } from '../../utils/cookies';
import { userData } from '../../api/login'
import { RequestAPI } from '../../utils/request-api'

import './myProfile.css';
import StripeContainer from '../../Component/Stripe/StripeContainer';
import { useEffect } from 'react';

const MyProfile = () => {
    
    const [showPayForm, setShowPayForm] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);
    const [name, setName] = useState("");
    const [balance, setBalance] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [zipCode,setZipCode] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("")
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState(10);
    const [amountError, setAmountError] = useState(false);
    const [orders, setOrders] = useState([])

    const handleAddButton = (e) => {
        e.preventDefault()
        setShowPayForm(true);
    }

    const onAmountChanged = (e) => {
        e.preventDefault()
        setAmount(e.target.value)
    }

    useEffect(() => {
        if(!dataFetched){
            fetchData()
            setDataFetched(true);
        }
            
    });

    const onPaymentResut = (response) => {
        if(response) {
            fetchData()
            setShowPayForm(false)
        }
    }

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
                setState(response.data.state)
                setZipCode(response.data.zipCode)
                setPhoneNumber(response.data.phoneNumber)
                setTransactions(response.data.transactions)
                setBalance(response.data.balance)
                setOrders(response.data.orders)
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='containerP'>
            <div className='Profile_container'> 
                <div className='SecondP'>
                    <div className='TextProfile'>
                        <div className='divRow'><p className='small'>Name: </p> <p className='bold'>{name} </p></div>
                        <div className='divRow'><p className='small'>Email: </p> <p className='bold'>{email} </p></div>
                        <div className='divRow'><p className='small'>Address: </p> <p className='bold'>{address}</p></div>
                        <div className='divRow'><p className='small'>State: </p> <p className='bold'>{state}</p></div>
                        <div className='divRow'><p className='small'>Zip Code: </p> <p className='bold'>{zipCode}</p></div>
                        <div className='divRow'><p className='small'>Phone Number: </p> <p className='bold'>{phoneNumber}</p></div>
                        <div className='divRow'><p className='small'>Balance: </p> <p className='bold'> ${balance/100}</p></div>
                        
                            {orders.map((item,index)=>
                                <div className='divColumn'>
                                    <div className='divRow'>
                                        <p className='small'> Item: {item.item}</p>
                                    </div>
                                    <div className='divRow'>
                                        <p className='small'> Price: ${item.itemPriceInCents/100}</p>
                                    </div>
                                    <div className='divRow'>
                                        <p className='small'> Shipping: ${item.shippingPriceInCents/100}</p>
                                    </div>
                                    <div className='divRow'>
                                        <p className='small'> Address: {item.address}</p>
                                    </div>
                                    <div className='divRow'>
                                        <p className='small'> Status: {item.status}</p>
                                    </div>
                                </div>
                            )}
                        
                    </div>
                    <div className='btnAdd'>
                        <button style={{marginRight:"2rem"}}>Manage acount</button>
                        <button onClick = {(e)=>handleAddButton(e)}>Add $</button>
                    </div>
                </div>
            </div>
            {
                showPayForm ?
                    <div className='cardField '>
                    <input className="depositInput2" value ={amount} onChange={(e) => onAmountChanged(e)} type={'number'}  placeholder='$10' id='amount' name='amount'/>
                    <StripeContainer onResult={onPaymentResut} paymentAmount={amount*100} userEmail={email}/>
                    </div>
                :
                <></>
            }
   
        </div>
    )
}

export default MyProfile
