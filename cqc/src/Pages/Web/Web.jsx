import React, { useState } from 'react'
import './web.css';
import img from "../../assets/diffuser.png"
import dis from "../../assets/price_discount.png"
import { useNavigate } from "react-router-dom";
import { getCookie } from '../../utils/cookies';
import { userData, order, getShippingPrice } from '../../api/api'
import { RequestAPI } from '../../utils/request-api'

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import tele_0 from "../../assets/telescope/tele_0.jpeg"
import tele_1 from "../../assets/telescope/tele_1.jpeg"
import tele_2 from "../../assets/telescope/tele_2.jpeg"
import tele_3 from "../../assets/telescope/tele_3.jpeg"
import tele_4 from "../../assets/telescope/tele_4.jpeg"
import tele_5 from "../../assets/telescope/tele_5.jpeg"
import tele_6 from "../../assets/telescope/tele_6.jpeg"
import tele_7 from "../../assets/telescope/telescope_1.JPG"
import tele_8 from "../../assets/telescope/telescope_2.JPG"

import cube_0 from "../../assets/cube/cube_0.JPG"
import cube_1 from "../../assets/cube/cube_1.JPG"
import cube_2 from "../../assets/cube/cube_2.JPG"
import cube_3 from "../../assets/cube/cube_3.JPG"
import cube_4 from "../../assets/cube/cube_4.JPG"
import cube_5 from "../../assets/cube/cube_5.JPG"
import cube_6 from "../../assets/cube/cube_6.JPG"
import cube_7 from "../../assets/cube/cube_7.JPG"

import mobile_1 from "../../assets/mobilediffusers/mobile_1.JPG"
import mobile_2 from "../../assets/mobilediffusers/mobile_2.JPG"
import mobile_3 from "../../assets/mobilediffusers/mobile_3.JPG"

import hand_1 from "../../assets/handheld/hand_1.jpeg"
import hand_2 from "../../assets/handheld/hand_2.JPG"
import hand_3 from "../../assets/handheld/hand_3.JPG"
import hand_4 from "../../assets/handheld/hand_4.JPG"
import hand_5 from "../../assets/handheld/hand_5.JPG"
import hand_6 from "../../assets/handheld/hand_6.JPG"
import hand_7 from "../../assets/handheld/hand_7.JPG"
import hand_8 from "../../assets/handheld/hand_8.JPG"
import hand_9 from "../../assets/handheld/hand_9.JPG"

const telescope_images = [{original: tele_0},{original: tele_1},{original: tele_2},{original: tele_3},{original: tele_4},{original: tele_5},{original: tele_6},{original: tele_7},{original: tele_8}];
const hand_images = [{original: hand_1},{original: hand_2},{original: hand_3},{original: hand_4},{original: hand_5},{original: hand_6},{original: hand_7},{original: hand_8},{original: hand_9}];
const mobile_images = [{original: mobile_1},{original: mobile_2},{original: mobile_3}]
const cube_images = [{original: cube_0},{original: cube_1},{original: cube_2},{original: cube_3},{original: cube_4},{original: cube_5},{original: cube_6},{original: cube_7}]

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
                item: "5 Diffusers + 20 Tokens",
                tokens: 20,
                cost: 1500
            }
            props.addOrder(order)
        }
        if(diffuserPack == 1){
            const order = {
                item: "10 Diffusers + 40 Tokens",
                tokens: 40,
                cost: 2800
            }
            props.addOrder(order)
        }
        if(diffuserPack == 2){
            const order = {
                item: "25 Diffusers + 100 Tokens",
                tokens: 100,
                cost: 6200
            }
            props.addOrder(order)
        }
        if(diffuserPack == 3){
            const order = {
                item: "50 Diffusers + 200 Tokens",
                tokens: 200,
                cost: 10500
            }
            props.addOrder(order)
        }
        if(diffuserPack == 4){
            const order = {
                item: "100 Diffusers + 400 Tokens",
                tokens: 400,
                cost: 19000
            }
            props.addOrder(order)
        }
        setDiffuserOrdered(true);
    }

    const addTelescopeOrder = () => {

        if(telescope==0){
            const order = {
                item: "AstroDiffuser SystemsTM Objective lens 101 mm (4 in) + 20 Tokens White",
                tokens: 20,
                cost: 35000
            }
            props.addOrder(order)
        }
        if(telescope==1){
            const order = {
                item: "AstroDiffuser SystemsTM Objective lens 101 mm (4 in) + 20 Tokens Black",
                tokens: 20,
                cost:  35000
            }
            props.addOrder(order)
        }
        if(telescope==2){
            const order = {
                item: "AstroDiffuser SystemsTM Objective lens 130 mm (5 in) + 20 Tokens White",
                tokens: 20,
                cost: 37500
            }
            props.addOrder(order)
        }
        if(telescope==3){
            const order = {
                item: "AstroDiffuser SystemsTM Objective lens 130 mm (5 in) + 20 Tokens Black",
                tokens: 20,
                cost:  37500
            }
            props.addOrder(order)
        }
        if(telescope==4){
            const order = {
                item: "AstroDiffuser SystemsTM Objective lens 155 mm (6 in) + 20 Tokens White",
                tokens: 20,
                cost: 40000
            }
            props.addOrder(order)
        }
        if(telescope==5){
            const order = {
                item: "AstroDiffuser SystemsTM Objective lens 155 mm (6 in) + 20 Tokens Black",
                tokens: 20,
                cost:  40000
            }
            props.addOrder(order)
        }
        if(telescope==6){
            const order = {
                item: "AstroDiffuser SystemsTM Objective lens 203 mm (8 in) + 20 Tokens White",
                tokens: 20,
                cost: 45000
            }
            props.addOrder(order)
        }
        if(telescope==7){
            const order = {
                item: "AstroDiffuser SystemsTM Objective lens 203 mm (8 in) + 20 Tokens Black",
                tokens: 20,
                cost:  45000
            }
            props.addOrder(order)
        }
        setTelescopeOrdered(true);
    }

    const addMicroOrder = () => {

        if(micro == 0){
            const order = {
                item: "MicroDiffuser CubesTM for Nikon + 20 Tokens",
                tokens: 20,
                cost: 23000
            }
            props.addOrder(order)
        }
        if(micro == 1){
            const order = {
                item: "MicroDiffuser CubesTM for Olympus + 20 Tokens",
                tokens: 20,
                cost: 23000
            }
            props.addOrder(order)
        }
        if(micro == 2){
            const order = {
                item: "MicroDiffuser CubesTM for Zeiss + 20 Tokens",
                tokens: 20,
                cost: 23000
            }
            props.addOrder(order)
        }
        if(micro == 3){
            const order = {
                item: "MicroDiffuser CubesTM for Leica + 20 Tokens",
                tokens: 20,
                cost: 23000
            }
            props.addOrder(order)
        }
        setMicroOrdered(true);
    }

    const addHandOrder = () => {

        if(hand==0){
            const order = {
                item: "Diameter 101 mm (4 in) + 20 Tokens White",
                tokens: 20,
                cost: 3500
            }
            props.addOrder(order)
        }
        if(hand==1){
            const order = {
                item: "Diameter 101 mm (4 in) + 20 Tokens Black",
                tokens: 20,
                cost:  3500
            }
            props.addOrder(order)
        }
        if(hand==2){
            const order = {
                item: "Diameter 130 mm (5 in) + 20 Tokens White",
                tokens: 20,
                cost: 4000
            }
            props.addOrder(order)
        }
        if(hand==3){
            const order = {
                item: "Diameter 130 mm (5 in) + 20 Tokens Black",
                tokens: 20,
                cost:  4000
            }
            props.addOrder(order)
        }
        if(hand==4){
            const order = {
                item: "Diameter 155 mm (6 in) + 20 Tokens White",
                tokens: 20,
                cost: 4500
            }
            props.addOrder(order)
        }
        if(hand==5){
            const order = {
                item: "Diameter 155 mm (6 in) + 20 Tokens Black",
                tokens: 20,
                cost:  4500
            }
            props.addOrder(order)
        }
        if(hand==6){
            const order = {
                item: "Diameter 203 mm (8 in) + 20 Tokens White",
                tokens: 20,
                cost: 5000
            }
            props.addOrder(order)
        }
        if(hand==7){
            const order = {
                item: "Diameter 203 mm (8 in) + 20 Tokens Black",
                tokens: 20,
                cost:  5000
            }
            props.addOrder(order)
        }
        setHandOrdered(true);
    }

    const addTokenOrder = () => {

        if(token == 0){
            const order = {
                item: "Pack of 10 Tokens + 2",
                tokens: 12,
                cost: 250
            }
            props.addOrder(order)
        }
        if(token == 1){
            const order = {
                item: "Pack of 25 Tokens +2",
                tokens: 27,
                cost: 625
            }
            props.addOrder(order)
        }
        if(token == 2){
            const order = {
                item: "Pack of 50 Tokens +2",
                tokens: 52,
                cost: 1250
            }
            props.addOrder(order)
        }
        if(token == 3){
            const order = {
                item: "Pack of 75 Tokens +2",
                tokens: 77,
                cost: 1500
            }
            props.addOrder(order)
        }
        if(token == 4){
            const order = {
                item: "Pack of 100 Tokens +2",
                tokens: 102,
                cost: 2500
            }
            props.addOrder(order)
        }
        if(token == 5){
            const order = {
                item: "Pack of 200 Tokens +2",
                tokens: 202,
                cost: 5000
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
                <p>Intrinsic imaging is a new technology whose potential has yet to be realized in both recreational photography and in specialized imaging in professional fields. This shop provides hardware and access to software that enables you to join us in exploring technology. <br /><br /> The following <b>Diffusers and Tokens</b> are offered to get you started.</p>
                <h1></h1>
                <h1>Diffusers</h1>
                <p>Obtaining Intrinsic Images requires three elements, a digital camera, a diffuser, and access to an intrinsic processing program. If you have a digital camera, you can acquire the diffuser and access to the Intrinsic processing program from this Web Shop.<br /> To show our appreciation of your participation of this novel technology, we have provided you with free processing Tokens with each order.</p>
            </div>

            <div className="web_diffuser_section">
                <h1>Cell Phone Diffusers</h1>
                <div className='image_text_row'>
                    <div className="web_tele_img"><ImageGallery items={mobile_images} showPlayButton={false} slideDuration={0} /></div>
                    <p>
                        These Cell phone Diffusers have been designed to accommodate most every cell phone available in the market. They are easily attached below the camera lens and may be flipped up into position to cover the lens when taking a diffuse image (see the Process Tutorial page). <br/> <br/>
                        Cell phones and tablets come in many different sizes and configurations. However, the size of the camera lens on these units have a diameter of less that 2 cm and are grouped within 4 cm. To accommodate most of these units, we provider a diffusing element 5x7 cm that can be positioned on the unit to cover and uncover the camera lenses with a just a single finger, as shown in the tutorials of this website.
                    </p>
                </div>
                <p><b>Available in packs of</b>: </p>
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
                <h1>Handheld Diffusers</h1>
                <div className='image_text_row'>
                    <div className="web_tele_img"><ImageGallery items={hand_images} showPlayButton={false} slideDuration={0} /></div>
                    <p>
                        For situations where standard diffuser products are not appropriate for the situation, Handheld DiffusersTM may be useful to obtain the diffuse images. <br/><br/>
                        For camera units that are not cell phones or tablets, the simplest method to obtain Intrinsic image sets is with of a handheld Diffuser provided that the camera is mounted on a tripod or similar structure to steady the field of view. The diffuser must have a larger diameter than the camera lens. The Diffuser is held close to the camera lens without touching it.
                    </p>
                </div>
               
                <p><b>The following framed Handheld DiffusersTM are available</b>: </p>
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

            <div className="web_tele_section">
                <h1>Telescopes and Large Lens Cameras</h1>
                <div className='image_text_row'>
                    <div className="web_tele_img"><ImageGallery items={telescope_images} showPlayButton={false} slideDuration={0} /></div>
                    <p>
                        Intrinsic imaging with telescopes requires a diffuser system that can move the Diffuser in and out of the path between the field of view and the lens of the objective telescope without disturbing the position of the target in the image. The AstroDiffuserTM System connects the system via a standard USB to a computer and the control software may be opened on the desktop. The system is controllable from a computer at the location of the telescope or remotely from thousands of miles over the internet. <br/> <br/> 
                        Cameras that have large objective lenses, such as telescopes and Telescopic cameras may require a remote-control Diffuser so that the field of view remains steady when obtaining the focused and diffused image set, especially when done by remote operation via computer. These Diffusers have a control box that connects directly to the computer through a USB plug and to the Diffuser unit via an ethernet cable.
                    </p>
                </div>
                
                <p>AstroDiffuser SystemsTM</p>
                <p><b>Available for telescopes and cameras with the following Objective lenses</b>: </p>
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
                <p>Contact us for custom sized AstroDiffuser SystemsTM</p>
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

            <div className="web_micro_section">
                <h1>Microscopy</h1>
                <div className='image_text_row'>
                    <div className="web_tele_img"><ImageGallery items={cube_images} showPlayButton={false} slideDuration={0} /></div>
                    <p>
                        Intrinsic imaging can easily be performed with a epi-fluorescence microscope by replacing the fluorescence filter cube with our MicroDiffuser CubeTM. By moving the MicroDiffuser CubeTM in and out of the path between the camera and the target slide, Focused and Diffuse image set may be obtained.  <br/><br/>
                        Diffusers can be used with a microscope in two ways. Stereomicroscopes and low magnification (less then 100x) microscopes can use small handheld Diffusers by placing them between the sample slider and the objective lens. For high magnification, the diffuser needs to be between the camera and the objective lens. For epi- fluorescence microscopes, this is easily accomplished by replacing one of the fluorescence filter cubes with a Diffuser cube, shown below. Otherwise, a filter wheel containing a Diffuser needs to be adapted to the high magnification microscope (not offered in this Web Shop).
                    </p>
            
                </div>
                <p><b>MicroDiffuser CubesTM for the following fluorescence microscopes are available</b>: </p>
                <table>
                    <tr>
                        <td>Nikon</td>
                        <td>$230.00 USD</td>
                        <td><input type="radio" checked={micro==0} onChange={() => setMicro(0)} /></td>
                    </tr>
                    <tr>
                        <td>Olympus</td>
                        <td>$230.00 USD</td>
                        <td><input type="radio" checked={micro==1} onChange={() => setMicro(1)} /></td>
                    </tr>
                    <tr>
                        <td>Zeiss</td>
                        <td>$230.00 USD</td>
                        <td><input type="radio" checked={micro==2} onChange={() => setMicro(2)} /></td>
                    </tr>
                    <tr>
                        <td>Leica</td>
                        <td>$230.00 USD</td>
                        <td><input type="radio" checked={micro==3} onChange={() => setMicro(3)} /></td>
                    </tr>
                </table>
                <p>Contact us for custom sized MicroDiffusersTM</p>
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

            <div className="web_token_section">
                <h1>Intrinsic Tokens</h1>
                <p>Tokens are the pathway to Intrinsic Processing. Each Token provides for intrinsic processing of one image set. To help participants get started, 2 free Tokens are included with every purchase from the Intrinsic Web Shop.</p>
                <p>Once the Intrinsic image sets have been obtained, they need to be processed on this website using an Intrinsic Token per image set. Tokens may be purchased in quantities listed below. As you process image sets, your balance of Tokens is displayed in the processing window.</p>
                <p><b>Tokens are available in the following Packets</b>: </p>
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
