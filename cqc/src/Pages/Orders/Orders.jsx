import React, { useState } from 'react';
import { getCookie } from '../../utils/cookies';
import { order, userData } from '../../api/api'
import { RequestAPI } from '../../utils/request-api'
import back from "../../assets/back.jpeg"
import { useEffect } from 'react';
import { MdInsertEmoticon } from 'react-icons/md';
import "./Orders.css"
import OrderItem from '../../Component/OrderItem/OrderItem';

const Orders = () => {

    const [dataFetched, setDataFetched] = useState(false);
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [orders, setOrders] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState("")
    const [loading, setLoading] = useState(false);


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
                setAddress(response.data.address)
                setState(response.data.state)
                setZipCode(response.data.zipCode)
                setPhoneNumber(response.data.phoneNumber)
                setOrders(response.data.orders)
                console.log(response.data.orders)
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className='container'>
            <img src={back} alt="Girl in a jacket" className='backgroundImage' />
            <div className='checkout_body'>
                {
                    loading && <div class="reg-spinner-overlay">
                        <div class="reg-spinner"></div>
                    </div>
                }
                <div className='checkout_title'>My Orders</div>

                <>
                    {
                        orders.map((item) => (
                            <div className="cart">
                                {item.items.map((it) => (
                                    <OrderItem item={it} />
                                ))}
                                <table>
                                    <tr>
                                        <td>Total: </td>
                                        <td>${parseFloat(item.totalPriceInCents / 100).toFixed(2)} USD</td>
                                    </tr>
                                    <tr>
                                        <td>Shipping Address: </td>
                                        <td>{item.address}</td>
                                    </tr>
                                    <tr>
                                        <td>Status: </td>
                                        <td>{item.status}</td>
                                    </tr>
                                </table>
                            </div>
                        ))
           
                    }

                </>

            </div>


        </div>
    )
}

export default Orders
