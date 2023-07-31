import React, { Fragment, useState, useEffect } from 'react';
import './Checkout.css';
import back from "../../assets/back.jpeg"
import { userData, order, getShippingPrice, addOrder } from '../../api/api'
import { RequestAPI } from '../../utils/request-api'
import { getCookie } from '../../utils/cookies';
import { MdSentimentSatisfiedAlt } from 'react-icons/md';
import StripeContainer from '../../Component/Stripe/StripeContainer';
import OrderItem from '../../Component/OrderItem/OrderItem';

import { useNavigate } from "react-router-dom";

const Checkout = ({ orders, setOrders, removeOrder }) => {

    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);
    const [address, setAddress] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [confirm, setConfirm] = useState(0);
    const [totalItemCost, setTotalItemCost] = useState(0)
    const [totalShippingCost, setTotalShippingCost] = useState(0)
    const [tokens, setTokens] = useState(0);


    useEffect(() => {
        if (!dataFetched) {
            setTotalItemCost(orders.reduce((accumulator, order) => { return accumulator + order.amountInCents; }, 0))
            setTokens(orders.reduce((accumulator, order) => { return accumulator + order.tokens; }, 0))
            fetchData()
            setDataFetched(true);
        }
    });

    const fetchData = async () => {
        try {
            const email = getCookie('_email')
            setEmail(email)
            const body = {
                email: email
            }
            const response = await RequestAPI(userData(body));
            console.log(response)
            if (response.status === 200) {
                setName(response.data.name)
                setAddress(response.data.address)
                setState(response.data.state)
                setCountry(response.data.country)
                setAddress(response.data.address)
                setZipCode(response.data.zipCode)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const confirmOrder = async () => {
        setConfirm(1);
    }

    const goToWebShop = () => {
        let path = `/Web_Shop`;
        navigate(path);
        // Scroll to the top of the page
        window.scrollTo(0, 0);
    }

    const onPaymentResut = (response) => {
        if (response) {
            const _orders = []
            orders.map((order) => {
                _orders.push({
                    item: order.item,
                    itemType: order.itemType,
                    amountInCents: order.amountInCents,
                    shippingPriceInCents: order.shippingPriceInCents,
                    tokens: order.tokens
                })
            })

            try {
                addOrder(email, _orders, address, tokens,totalItemCost,0, orderCallback)
            } catch (error) {
                console.log(error);
            }
        }
    }

    const orderCallback = (response) => {
        setLoading(false);
        setOrders([])
        setConfirm(2)
        console.log(response);
    }

    const removeOrderIndexed = (index) => {
        removeOrder(index)
        orders.splice(index, 1);
        setTotalItemCost(orders.reduce((accumulator, order) => { return accumulator + order.amountInCents; }, 0))
        setTokens(orders.reduce((accumulator, order) => { return accumulator + order.tokens; }, 0))
    }

    return (
        <Fragment>
            {
                <div className='container'>
                    <img src={back} alt="Girl in a jacket" className='backgroundImage' />
                    <div className='checkout_body'>
                        {
                            loading && <div class="reg-spinner-overlay">
                                <div class="reg-spinner"></div>
                            </div>
                        }
                        <div className='checkout_title'>Checkout</div>

                        {
                            confirm == 0 &&

                            <div className="cart">
                                <h2 className="cart-title">Orders:</h2>
                                {orders.map((item, index) => (
                                    <OrderItem item={item} removeOrder={ (e)=>removeOrderIndexed(index) } />
                                ))}
                                <table>
                                    <tr>
                                        <td>Total: </td>
                                        <td>${parseFloat(totalItemCost / 100).toFixed(2)} USD</td>
                                    </tr>
                                    <tr>
                                        <td>New Tokens: </td>
                                        <td>{tokens}</td>
                                    </tr>
                                    <tr>
                                        <td>Shipping Adress: </td>
                                        <td>{address}</td>
                                    </tr>
                                    <tr>
                                        <td>State: </td>
                                        <td>{state}</td>
                                    </tr>
                                    <tr>
                                        <td>Country: </td>
                                        <td>{country}</td>
                                    </tr>
                                    <tr>
                                        <td>Zip Code: </td>
                                        <td>{zipCode}</td>
                                    </tr>
                                    <tr>
                                        <td><button class="checkout_confirm_button" onClick={() => { confirmOrder() }}>Confirm Order</button></td>
                                        <td><button class="checkout_confirm_button" onClick={() => { goToWebShop() }}>Continue Ordering</button></td>
                                    </tr>
                                </table>
                            </div>
                        }


                        <div className='checkout_row2'>
                        {
                            confirm == 1 &&
                            <div className='checkout_item2'>
                                <div className='checkout_item2_div'>
                                    <table>
                                        <tr>
                                            <td>All items cost:</td>
                                            <td>${parseFloat(totalItemCost / 100).toFixed(2)} USD</td>
                                        </tr>
                                        <tr>
                                            <td>Shiping cost:</td>
                                            <td>${parseFloat(totalShippingCost / 100).toFixed(2)} USD</td>
                                        </tr>
                                        <tr>
                                            <td>Total amount:</td>
                                            <td>${parseFloat((totalShippingCost + totalItemCost) / 100).toFixed(2)} USD</td>
                                        </tr>
                                    </table>
                                    <div className='payment_div'>
                                        <StripeContainer loading={setLoading} onResult={onPaymentResut} paymentAmount={totalShippingCost + totalItemCost} userEmail={email} />
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            confirm == 2 &&
                            <div className='checkout_item2'>
                                <div className='checkout_item2_div'>
                                    <h1>Items order!</h1>
                                </div>
                            </div>
                        }

                        </div>



                    </div>
                </div>

            }
        </Fragment>
    )
}

export default Checkout
