import React, { useState } from 'react';
import { getCookie } from '../../utils/cookies';
import { order, userData } from '../../api/api'
import { RequestAPI } from '../../utils/request-api'
import back from "../../assets/back.jpeg"
import { useEffect } from 'react';
import { MdInsertEmoticon } from 'react-icons/md';
import "./Orders.css"


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
        <div className='web_background'>
            {
                loading && <div class="reg-spinner-overlay">
                    <div class="reg-spinner"></div>
                </div>
            }
            {
                <>
                    <div className='web_title'>
                        <h1>Orders</h1>
                    </div>
                    {orders.map((item, index) =>
                        <div className='web_row'>
                            {
                                <div className='order_item'>
                                    <div>{item.address}</div>
                                    <div>{item.createdAt}</div>
                                </div>

                            }
                            {/* {
                                    item[1] &&
                                    <div className='web_item'>
                                        <Card item={item[1]} onClick={handleOnClick} />
                                    </div>
                                }
                                {
                                    item[2] &&
                                    <div className='web_item'>
                                        <Card item={item[2]} onClick={handleOnClick} />
                                    </div>
                                } */}
                        </div>
                    )}
                </>
            }

        </div>
    )
}

export default Orders
