import React, { useState } from 'react'
import './web.css';
import img from "../../assets/diffuser.png"
import dis from "../../assets/price_discount.png"
import { useNavigate } from "react-router-dom";
import { getCookie } from '../../utils/cookies';
import { userData, order, getShippingPrice } from '../../api/api'
import { RequestAPI } from '../../utils/request-api'
import Gallery  from '../../Component/Gallery/Gallery'

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import tele_0 from "../../assets/telescope/tele_0.jpg"
import tele_1 from "../../assets/telescope/tele_1.jpg"
import tele_2 from "../../assets/telescope/tele_2.jpg"
import tele_5 from "../../assets/telescope/tele_5.jpg"
import tele_6 from "../../assets/telescope/tele_6.jpg"
import tele_7 from "../../assets/telescope/telescope_1.jpg"
import tele_8 from "../../assets/telescope/telescope_2.jpg"

import cube_1 from "../../assets/cube/cube_1.jpeg"
import cube_2 from "../../assets/cube/cube_2.jpg"
import cube_3 from "../../assets/cube/cube_3.jpg"
import cube_4 from "../../assets/cube/cube_4.jpg"
import cube_5 from "../../assets/cube/cube_5.jpg"
import cube_6 from "../../assets/cube/cube_6.jpg"
import cube_7 from "../../assets/cube/cube_7.jpg"
import cube_8 from "../../assets/cube/micro-new-1.jpg"
import cube_9 from "../../assets/cube/micro-new-2.jpg"
import cube_10 from "../../assets/cube/micro-new-3.jpg"

import mobile_1 from "../../assets/mobilediffusers/cell_1.jpg"
import mobile_2 from "../../assets/mobilediffusers/cell_2.jpg"
import mobile_3 from "../../assets/mobilediffusers/cell_3.jpg"

import hand_1 from "../../assets/handheld/hand_1.jpg"
import hand_2 from "../../assets/handheld/hand_2.jpg"
import hand_3 from "../../assets/handheld/hand_3.JPG"
import hand_4 from "../../assets/handheld/hand_4.jpg"
import hand_5 from "../../assets/handheld/hand_5.jpg"
import hand_6 from "../../assets/handheld/hand_6.jpg"
import hand_8 from "../../assets/handheld/hand_8.jpg"
import hand_9 from "../../assets/handheld/hand_9.jpg"
import hand_11 from "../../assets/handheld/hand_11.jpg"

const telescope_images = [tele_0,tele_1,tele_2,tele_5,tele_6,tele_7,tele_8];
const hand_images = [hand_1,hand_2,hand_3,hand_4,hand_5,hand_6,hand_8,hand_9,hand_11];
const mobile_images = [ mobile_1, mobile_2,mobile_3 ]
const cube_images = [cube_1,cube_2,cube_3,cube_4,cube_5,cube_6,cube_7,cube_8,cube_9,cube_10]

const Web = (props, signedIn, userEmail) => {

    const [itemClicked, setItemCLicked] = useState(false);
    const [item, setItem] = useState({})
    const [user, setUser] = useState({})
    const [orderConfirmed, setConfirmOrder] = useState(false)
    const [shipping, setShipping] = useState(0.0)
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [diffuserPack, setDiffuserPack] = useState(0);
    const [diffuserOrdered, setDiffuserOrdered] = useState(false);
    const [telescope, setTelescope] = useState(0);
    const [telescopeOrdered, setTelescopeOrdered] = useState(false);
    const [micro, setMicro] = useState(0);
    const [microOrdered, setMicroOrdered] = useState(false);
    const [hand, setHand] = useState(0);
    const [handOrdered, setHandOrdered] = useState(false);
    const [token, setToken] = useState(0);
    const [tokenOrdered, setTokenOrdered] = useState(false);


    const fetchData = async () => {
        try {
            const email = getCookie('_email')
            const body = {
                email: email
            }
            const response = await RequestAPI(userData(body));

            if (response.status === 200) {
                setUser(response.data)
                const shippingRequest = {
                    destinationZip: response.data.zipCode,
                    pounds: 0,
                    ounces: 1
                }
                const response2 = await RequestAPI(getShippingPrice(shippingRequest));
                setLoading(false)
                if (response2.status === 200) {
                    setShipping(response2.data.rate)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addDiffuserOrder = () => {

        if(diffuserPack == 0){
            const order = {
                itemType: 0,
                item: "5 Diffusers + 20 Tokens",
                tokens: 20,
                amountInCents: 1500
            }
            props.addOrder(order)
        }
        if(diffuserPack == 1){
            const order = {
                itemType: 0,
                item: "10 Diffusers + 40 Tokens",
                tokens: 40,
                amountInCents: 2800
            }
            props.addOrder(order)
        }
        if(diffuserPack == 2){
            const order = {
                itemType: 0,
                item: "25 Diffusers + 100 Tokens",
                tokens: 100,
                amountInCents: 6200
            }
            props.addOrder(order)
        }
        if(diffuserPack == 3){
            const order = {
                itemType: 0,
                item: "50 Diffusers + 200 Tokens",
                tokens: 200,
                amountInCents: 10500
            }
            props.addOrder(order)
        }
        if(diffuserPack == 4){
            const order = {
                itemType: 0,
                item: "100 Diffusers + 400 Tokens",
                tokens: 400,
                amountInCents: 19000
            }
            props.addOrder(order)
        }
        setDiffuserOrdered(true);
    }

    const addTelescopeOrder = () => {

        if(telescope==0){
            const order = {
                itemType: 1,
                item: "AstroDiffuser SystemsTM Objective lens 101 mm (4 in) + 20 Tokens White",
                tokens: 20,
                amountInCents: 35000
            }
            props.addOrder(order)
        }
        if(telescope==1){
            const order = {
                itemType: 1,
                item: "AstroDiffuser SystemsTM Objective lens 101 mm (4 in) + 20 Tokens Black",
                tokens: 20,
                cost:  35000
            }
            props.addOrder(order)
        }
        if(telescope==2){
            const order = {
                itemType: 1,
                item: "AstroDiffuser SystemsTM Objective lens 130 mm (5 in) + 20 Tokens White",
                tokens: 20,
                amountInCents: 37500
            }
            props.addOrder(order)
        }
        if(telescope==3){
            const order = {
                itemType: 1,
                item: "AstroDiffuser SystemsTM Objective lens 130 mm (5 in) + 20 Tokens Black",
                tokens: 20,
                amountInCents:  37500
            }
            props.addOrder(order)
        }
        if(telescope==4){
            const order = {
                itemType: 1,
                item: "AstroDiffuser SystemsTM Objective lens 155 mm (6 in) + 20 Tokens White",
                tokens: 20,
                amountInCents: 40000
            }
            props.addOrder(order)
        }
        if(telescope==5){
            const order = {
                itemType: 1,
                item: "AstroDiffuser SystemsTM Objective lens 155 mm (6 in) + 20 Tokens Black",
                tokens: 20,
                amountInCents:  40000
            }
            props.addOrder(order)
        }
        if(telescope==6){
            const order = {
                itemType: 1,
                item: "AstroDiffuser SystemsTM Objective lens 203 mm (8 in) + 20 Tokens White",
                tokens: 20,
                amountInCents: 45000
            }
            props.addOrder(order)
        }
        if(telescope==7){
            const order = {
                itemType: 1,
                item: "AstroDiffuser SystemsTM Objective lens 203 mm (8 in) + 20 Tokens Black",
                tokens: 20,
                amountInCents:  45000
            }
            props.addOrder(order)
        }
        setTelescopeOrdered(true);
    }

    const addMicroOrder = () => {

        if(micro == 0){
            const order = {
                itemType: 2,
                item: "A set of MicroDiffusersTM contain two framed MicroDiffusers and two frameless MicroDiffusers. ",
                tokens: 20,
                amountInCents: 2000
            }
            props.addOrder(order)
        }
        setMicroOrdered(true);
    }

    const addHandOrder = () => {

        if(hand==0){
            const order = {
                itemType: 3,
                item: "Diameter 101 mm (4 in) + 20 Tokens White",
                tokens: 20,
                amountInCents: 3500
            }
            props.addOrder(order)
        }
        if(hand==1){
            const order = {
                itemType: 3,
                item: "Diameter 101 mm (4 in) + 20 Tokens Black",
                tokens: 20,
                amountInCents:  3500
            }
            props.addOrder(order)
        }
        if(hand==2){
            const order = {
                itemType: 3,
                item: "Diameter 130 mm (5 in) + 20 Tokens White",
                tokens: 20,
                amountInCents: 4000
            }
            props.addOrder(order)
        }
        if(hand==3){
            const order = {
                itemType: 3,
                item: "Diameter 130 mm (5 in) + 20 Tokens Black",
                tokens: 20,
                amountInCents:  4000
            }
            props.addOrder(order)
        }
        if(hand==4){
            const order = {
                itemType: 3,
                item: "Diameter 155 mm (6 in) + 20 Tokens White",
                tokens: 20,
                amountInCents: 4500
            }
            props.addOrder(order)
        }
        if(hand==5){
            const order = {
                itemType: 3,
                item: "Diameter 155 mm (6 in) + 20 Tokens Black",
                tokens: 20,
                amountInCents:  4500
            }
            props.addOrder(order)
        }
        if(hand==6){
            const order = {
                itemType: 3,
                item: "Diameter 203 mm (8 in) + 20 Tokens White",
                tokens: 20,
                amountInCents: 5000
            }
            props.addOrder(order)
        }
        if(hand==7){
            const order = {
                itemType: 3,
                item: "Diameter 203 mm (8 in) + 20 Tokens Black",
                tokens: 20,
                amountInCents:  5000
            }
            props.addOrder(order)
        }
        setHandOrdered(true);
    }

    const addTokenOrder = () => {

        if(token == 0){
            const order = {
                itemType: 4,
                item: "Pack of 10 Tokens + 2",
                tokens: 12,
                amountInCents: 250
            }
            props.addOrder(order)
        }
        if(token == 1){
            const order = {
                itemType: 4,
                item: "Pack of 25 Tokens +2",
                tokens: 27,
                amountInCents: 625
            }
            props.addOrder(order)
        }
        if(token == 2){
            const order = {
                itemType: 4,
                item: "Pack of 50 Tokens +2",
                tokens: 52,
                amountInCents: 1250
            }
            props.addOrder(order)
        }
        if(token == 3){
            const order = {
                itemType: 4,
                item: "Pack of 75 Tokens +2",
                tokens: 77,
                amountInCents: 1500
            }
            props.addOrder(order)
        }
        if(token == 4){
            const order = {
                itemType: 4,
                item: "Pack of 100 Tokens +2",
                tokens: 102,
                amountInCents: 2500
            }
            props.addOrder(order)
        }
        if(token == 5){
            const order = {
                itemType: 4,
                item: "Pack of 200 Tokens +2",
                tokens: 202,
                amountInCents: 5000
            }
            props.addOrder(order)
        }
        setTokenOrdered(true);
    }


    const goToCheckout = () => {
        navigate('/Checkout');
    }

    return (

        <div className='web_background'>
            {
                loading && <div class="reg-spinner-overlay">
                    <div class="reg-spinner"></div>
                </div>
            }

            <div className='web_title'>
                <h1>Welcome to the Intrinsic Web Shop</h1>
                <p>Obtaining Intrinsic Images requires three elements, a digital camera, a diffuser, and access to an intrinsic processing program. If you have a digital camera, you can acquire the diffuser and access to the Intrinsic processing program from this Web Shop. To show our appreciation of your participation of this novel technology, we have provided you with free processing Tokens with each order. The following <b>Diffusers and Tokens</b> are offered to get you started.</p>
            </div>

            <div className="web_diffuser_section">
                <h1><b>AttachableDiffusers</b><sup>TM</sup></h1>
                <div className='image_text_row'>
                    <div className="web_tele_img"><Gallery images={mobile_images}/></div>
                    <p>
                        Cell phones and tablets come in many different sizes and configurations. The AttachableDiffusers<sup>TM</sup> are designed to accommodate most every cell phone and tablet. They easily attached below the camera lens and may be flipped up into position with one finger to cover the lens to take a diffuse image. Refer to the Tutorial Page for details of how to use each of the Products.
                    </p>
                </div>
                <h3><b>Available in packs of</b>: </h3>
                <table>
                    <tr>
                        <td>5 Diffusers + 20 Tokens </td>
                        <td>$15.00 USD</td>
                        <td><input type="radio" checked={diffuserPack==0} onChange={() => setDiffuserPack(0)} /></td>
                    </tr>
                    <tr>
                        <td>10 Diffusers + 40 Tokens </td>
                        <td>$28.00 USD</td>
                        <td><input type="radio" checked={diffuserPack==1} onChange={() => setDiffuserPack(1)} /></td>
                    </tr>
                    <tr>
                        <td>25 Diffusers + 100 Tokens </td>
                        <td>$62.00 USD</td>
                        <td><input type="radio" checked={diffuserPack==2} onChange={() => setDiffuserPack(2)} /></td>
                    </tr>
                    <tr>
                        <td>50 Diffusers + 200 Tokens </td>
                        <td>$105.00 USD</td>
                        <td><input type="radio" checked={diffuserPack==3} onChange={() => setDiffuserPack(3)} /></td>
                    </tr>
                    <tr>
                        <td>100 Diffusers + 400 Tokens </td>
                        <td>$190.00 USD</td>
                        <td><input type="radio" checked={diffuserPack==4} onChange={() => setDiffuserPack(4)} /></td>
                    </tr>
                </table>
                {
                    diffuserOrdered ?
                    <div className="web_button_row">
                        <button className='checkout_button' onClick={()=> setDiffuserOrdered(false)} >Continue Ordering</button>
                        <button className='checkout_button' onClick={()=> goToCheckout()} >Go To Checkout</button>
                    </div>
                    :
                    <button className='checkout_button' onClick={()=> addDiffuserOrder()} >Add to Cart</button>
                }
            </div>

            <div className="web_hand_section">
                <h1><b>HandheldDiffusers </b><sup>TM</sup></h1>
                <div className='image_text_row'>
                    <div className="web_tele_img"><Gallery images={hand_images}/></div>
                    <p>
                        For situations where AttachableDiffusers<sup>TM</sup> are not appropriate for the situation, HandheldDiffusers<sup>TM</sup> may be used to obtain the diffuse images. The most common situation is when the camera is mounted on a tripod and exposure periods are less than of 10 seconds. The HandheldDiffuser<sup>TM</sup> is simply held close to the camera lens without touching it during the exposure. This procedure ensures that the field of view is the same for the Original and Diffuse image.
                    </p>
                </div>
               
                <h3><b>The following framed Handheld Diffusers<sup>TM</sup> are available</b>: </h3>
                <table>
                    <tr>
                        <td>Diameter 101 mm (4 in) + 20 Tokens</td>
                        <td>$35.00 USD</td>
                        <td><input type="radio" checked={hand==0} onChange={() => setHand(0)} />White</td>
                        <td><input type="radio" checked={hand==1} onChange={() => setHand(1)} />Black</td>
                    </tr>
                    <tr>
                        <td>Diameter 130 mm (5 in) + 20 Tokens</td>
                        <td>$40.00 USD</td>
                        <td><input type="radio" checked={hand==2} onChange={() => setHand(2)} />White</td>
                        <td><input type="radio" checked={hand==3} onChange={() => setHand(3)} />Black</td>
                    </tr>
                    <tr>
                        <td>Diameter 155 mm (6 in) + 20 Tokens</td>
                        <td>$45.00 USD</td>
                        <td><input type="radio" checked={hand==4} onChange={() => setHand(4)} />White</td>
                        <td><input type="radio" checked={hand==5} onChange={() => setHand(5)} />Black</td>
                    </tr>
                    <tr>
                        <td>Diameter 203 mm (8 in) + 20 Tokens</td>
                        <td>$50.00 USD</td>
                        <td><input type="radio" checked={hand==6} onChange={() => setHand(6)} />White</td>
                        <td><input type="radio" checked={hand==7} onChange={() => setHand(7)} />Black</td>
                    </tr>
                </table>
                {
                    handOrdered ?
                    <div className="web_button_row">
                        <button className='checkout_button' onClick={()=> setHandOrdered(false)} >Continue Ordering</button>
                        <button className='checkout_button' onClick={()=> goToCheckout()} >Go To Checkout</button>
                    </div>
                    :
                    <button className='checkout_button' onClick={()=> addHandOrder()} >Add to Cart</button>
                }
            </div>


            <div className="web_micro_section">
                <h1><b>MicroDiffusers</b><sup>TM</sup></h1>
                <div className='image_text_row'>
                    <div className="web_tele_img"><Gallery images={cube_images} /></div>
                    <p>
                    Intrinsic imaging can easily be performed with any microscope that has a digital camera. Choose a field of view, focus, and take an image. When using objective lenses of 10x or below, place the framed MicroDiffuser<sup>TM</sup> on microscope slide, and take a diffuse image. When using objective lenses greater than 10x where the framed MicroDiffuser<sup>TM</sup> cannot fit under the objective lens, slip the Diffuser with the white hand tab between the objective lens and the microscope slide and take a diffuse image. Imaging with stereo microscopes can use HandheldDiffusers of appropriate diameter.
                      </p>
            
                </div>
                <h3><b>A set of MicroDiffusersTM contain two framed MicroDiffusers and two frameless MicroDiffusers. </b>: </h3>
                <table>
                    <tr>
                        <td>$20.00 USD</td>
                        <td><input type="radio" checked={micro==0} onChange={() => setMicro(0)} /></td>
                    </tr>
                </table>
                <h3>Contact us for custom sized MicroDiffusersTM</h3>
                {
                    microOrdered ?
                    <div className="web_button_row">
                        <button className='checkout_button' onClick={()=> setMicroOrdered(false)} >Continue Ordering</button>
                        <button className='checkout_button' onClick={()=> goToCheckout()} >Go To Checkout</button>
                    </div>
                    :
                    <button className='checkout_button' onClick={()=> addMicroOrder()} >Add to Cart</button>
                }
            </div>

            <div className="web_tele_section">
                <h1><b>AstroDiffusers</b><sup>TM</sup></h1>
                <h1><b>(Telescopes and Telephoto Cameras)</b></h1>
                <div className='image_text_row'>
                <div className="web_tele_img"><Gallery images={telescope_images} /></div>
                    <p>
                        Intrinsic astro-imaging controlled by computer where a Diffuser is remotely moved in and out of the path between the field of view and the lens of the objective telescope. Our AstroDiffuser<sup>TM</sup> System connects the control box to a computer via a standard USB and is controlled by AstroDiffuser<sup>TM</sup> software that appears on the desktop. The AstroDiffuser Unit attaches to the object end of the telescope via a Velcro band. The system is powered by a 5 – 12v DC source.
                    </p>
                </div>
                <h3><b>Available for telescopes and cameras with the following Objective lenses</b>: </h3>
                <table>
                    <tr>
                        <td>Objective lens 101 mm (4 in) + 20 Tokens</td>
                        <td>$350.00 USD</td>
                        <td><input type="radio" checked={telescope==0} onChange={() => setTelescope(0)} />White</td>
                        <td><input type="radio" checked={telescope==1} onChange={() => setTelescope(1)} />Black</td>
                    </tr>
                    <tr>
                        <td>Objective lens 130 mm (5 in) + 20 Tokens</td>
                        <td>$375.00 USD</td>
                        <td><input type="radio" checked={telescope==2} onChange={() => setTelescope(2)} />White</td>
                        <td><input type="radio" checked={telescope==3} onChange={() => setTelescope(3)} />Black</td>
                    </tr>
                    <tr>
                        <td>Objective lens 155 mm (6 in) + 20 Tokens</td>
                        <td>$400.00 USD</td>
                        <td><input type="radio" checked={telescope==4} onChange={() => setTelescope(4)} />White</td>
                        <td><input type="radio" checked={telescope==5} onChange={() => setTelescope(5)} />Black</td>
                    </tr>
                    <tr>
                        <td>Objective lens 203 mm (8 in) + 20 Tokens</td>
                        <td>$450.00 USD</td>
                        <td><input type="radio" checked={telescope==6} onChange={() => setTelescope(6)} />White</td>
                        <td><input type="radio" checked={telescope==7} onChange={() => setTelescope(7)} />Black</td>
                    </tr>
                </table>
                <h3>Contact us for custom sized AstroDiffuser SystemsTM</h3>
                {
                    telescopeOrdered ?
                    <div className="web_button_row">
                        <button className='checkout_button' onClick={()=> setTelescopeOrdered(false)} >Continue Ordering</button>
                        <button className='checkout_button' onClick={()=> goToCheckout()} >Go To Checkout</button>
                    </div>
                    :
                    <button className='checkout_button' onClick={()=> addTelescopeOrder()} >Add to Cart</button>
                }
            </div>



            <div className="web_token_section">
                <h1>Intrinsic Processing Tokens</h1>
                <p>Tokens provide the pathway to Intrinsic Processing. Each Token processes one Original and Diffuse image set. To help participants get started, at least 2 free Tokens are included with every purchase from the Web Shop.</p>
                <p>Image sets can be processed on this website using one Token per image set. Tokens may be purchased in quantities listed below. As you process image sets, your balance of Tokens is displayed in youjr account profile as well as on the processing page.</p>
                <h3><b>Tokens are available in the following Packets</b>: </h3>
                <table>
                    <tr>
                        <td>Pack of   10 Tokens + 2</td>
                        <td>$2.50 USD</td>
                        <td><input type="radio" checked={token==0} onChange={() => setToken(0)} /></td>
                    </tr>
                    <tr>
                        <td>Pack of    25 Tokens +2</td>
                        <td>$6.25 USD</td>
                        <td><input type="radio" checked={token==1} onChange={() => setToken(1)} /></td>
                    </tr>
                    <tr>
                        <td>Pack of    50 Tokens +2</td>
                        <td>$12.50 USD</td>
                        <td><input type="radio" checked={token==2} onChange={() => setToken(2)} /></td>
                    </tr>
                    <tr>
                        <td>Pack of    75 Tokens +2</td>
                        <td>$15.00 USD</td>
                        <td><input type="radio" checked={token==3} onChange={() => setToken(3)} /></td>
                    </tr>
                    <tr>
                        <td>Pack of   100 Tokens +2</td>
                        <td>$25.00 USD</td>
                        <td><input type="radio" checked={token==4} onChange={() => setToken(4)} /></td>
                    </tr>
                    <tr>
                        <td>Pack of   200 Tokens +2</td>
                        <td>$50.00 USD</td>
                        <td><input type="radio" checked={token==5} onChange={() => setToken(5)} /></td>
                    </tr>
                </table>
                {
                    tokenOrdered ?
                    <div className="web_button_row">
                        <button className='checkout_button' onClick={()=> setTokenOrdered(false)} >Continue Ordering</button>
                        <button className='checkout_button' onClick={()=> goToCheckout()} >Go To Checkout</button>
                    </div>
                    :
                    <button className='checkout_button' onClick={()=> addTokenOrder()} >Add to Cart</button>
                }
            </div>
        </div>
    )
}

export default Web
