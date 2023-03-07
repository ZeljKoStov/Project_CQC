import React,  {useState} from 'react'
import './web.css';
import img from "../../assets/diffuser.png"
import { Card } from '../../Component'
import { getCookie } from '../../utils/cookies';
import { userData } from '../../api/login'
import { RequestAPI } from '../../utils/request-api'
import { order, getShippingPrice } from '../../api/order';

const Web = (signedIn, userEmail) => {

    const data=[
        [
            {id:0, title:'Item 1' , content:'This is the description of the item' , image:'img', price: 10},
            {id:1, title:'Item 2' , content:'This is the description of the item' , image:'img', price: 20},
            {id:2, title:'Item 3' , content:'This is the description of the item' , image:'img', price: 20}
        ],
        [
            {id:3, title:'Item 4' , content:'This is the description of the item' , image:'img', price: 30},
            {id:4, title:'Item 6' , content:'This is the description of the item' , image:'img', price: 40},
            {id:5, title:'Item 7' , content:'This is the description of the item' , image:'img', price: 40}
        ],
        [
            {id:6, title:'Item 8' , content:'This is the description of the item' , image:'img', price: 30},
            {id:7, title:'Item 9' , content:'This is the description of the item' , image:'img', price: 40},
            {id:8, title:'Item 10' , content:'This is the description of the item' , image:'img', price: 40}
        ],
        [
            {id:9, title:'Item 11' , content:'This is the description of the item' , image:'img', price: 30},
            {id:10, title:'Item 12' , content:'This is the description of the item' , image:'img', price: 50}
        ]
    ];

    const [itemClicked, setItemCLicked] = useState(false);
    const [item, setItem] = useState({})
    const [user,setUser] = useState({})
    const [orderConfirmed, setConfirmOrder] = useState(false)
    const [shipping, setShipping] = useState(0.0)
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState("")

    const fetchData = async () => {
        try {
            const email = getCookie('_email')
            const body = {
                email: email
            }
            const response = await RequestAPI(userData(body));
            console.log(response)
            if (response.status === 200) {
                setUser(response.data)
                const shippingRequest = {
                    destinationZip: response.data.zipCode, 
                    pounds: 0, 
                    ounces: 1
                }
                const response2 = await RequestAPI(getShippingPrice(shippingRequest));
                if (response2.status === 200) {
                    setShipping(response2.data.rate)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnClick = (index) => {
        if(signedIn){
            fetchData()
            const dataIndex = (index-index%3)/3
            setItem(data[dataIndex][index-dataIndex*3])
            setItemCLicked(true);
        }
    }

    const confirmOrder = async () => {
        try {
            const body = {
                email: user.email,
                item: item.title,
                address: user.address,
                itemPriceInCents: item.price*100,
                shippingPriceInCents: shipping*100,
            }
            const response = await RequestAPI(order(body));
            console.log(response)
            if (response.data.success) {
                setConfirmOrder(true);
            } else {
                setErrorText(response.data.message)
                setError(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <div className='web_background'>
            {
                !itemClicked ?
                <>            
                    <div className='web_title'>
                        <h1>Web Shop</h1>
                        <p>Order your diffusers here</p>
                    </div>
                    {data.map((item,index)=>
                        <div className='web_row'>
                            {
                                item[0] &&
                                <div className='web_item'>
                                    <Card item = {item[0]} onClick = {handleOnClick} />
                                </div>
                            }
                            {
                                item[1] &&
                                <div className='web_item'>
                                    <Card item = {item[1]} onClick = {handleOnClick}/>
                                </div>
                            }
                            {
                                item[2] &&
                                <div className='web_item'>
                                    <Card item = {item[2]} onClick = {handleOnClick}/>
                                </div>
                            }
                        </div>
                    )}
                </>
                :
                <>
                    {
                        !orderConfirmed ?
                        <>
                            <div className='web_title'>
                                <h1>{item.title}</h1>
                            </div>
                            <div className='web_row2'>
                                {
                                    <div className='web_item2'>
                                        <div className='web_item2_div'>
                                            <img  src={img} alt='img' />
                                            <p>{item.content}</p>
                                            <h1>Plase confirm shipping details:</h1>
                                            <p>{user.name}</p>
                                            <p>{user.address}</p>
                                            <p>{user.state}</p>
                                            <p>{user.zipCode}</p>
                                            <p>{user.phoneNumber}</p>
                                            <p>${item.price}</p>
                                            <p>Shipping cost: ${shipping}</p>
                                            { error && <div className='errortext'>{errorText}</div>}
                                            <button class="blue_button" onClick = {()=> {confirmOrder()}}>Confirm Order</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </>
                        :
                        <>
                           <div className='web_title'>
                                <h1>{item.title}</h1>
                            </div>
                            <div className='web_row2'>
                                {
                                    <div className='web_item2'>
                                        <div className='web_item2_div'>
                                            <img  src={img} alt='img' />
                                            <h1>Order Confirmed!</h1>
                                        </div>
                                    </div>
                                }
                            </div>
                        </>
                    }

                    
                </>

            }

        </div>
    )
}

export default Web
