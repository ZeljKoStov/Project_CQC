import React from 'react';
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

import cube_1 from "../../assets/cube/cube_1.jpeg"
import cube_2 from "../../assets/cube/cube_2.jpeg"
import cube_3 from "../../assets/cube/cube_3.jpeg"
import cube_4 from "../../assets/cube/cube_4.jpeg"
import cube_5 from "../../assets/cube/cube_5.jpeg"
import cube_6 from "../../assets/cube/cube_6.jpeg"
import cube_7 from "../../assets/cube/cube_7.jpeg"
import cube_8 from "../../assets/cube/micro-new-1.jpeg"
import cube_9 from "../../assets/cube/micro-new-2.jpeg"
import cube_10 from "../../assets/cube/micro-new-3.jpeg"

import mobile_1 from "../../assets/mobilediffusers/mobile_1.JPG"
import mobile_2 from "../../assets/mobilediffusers/mobile_2.JPG"
import mobile_3 from "../../assets/mobilediffusers/mobile_3.JPG"

import hand_1 from "../../assets/handheld/hand_1.jpg"
import hand_2 from "../../assets/handheld/hand_2.jpg"
import hand_3 from "../../assets/handheld/hand_3.JPG"
import hand_4 from "../../assets/handheld/hand_4.jpg"
import hand_5 from "../../assets/handheld/hand_5.jpg"
import hand_6 from "../../assets/handheld/hand_6.jpg"
import hand_7 from "../../assets/handheld/hand_7.jpg"
import hand_8 from "../../assets/handheld/hand_8.jpg"
import hand_9 from "../../assets/handheld/hand_9.jpg"
import hand_10 from "../../assets/handheld/hand_10.jpg"
import hand_11 from "../../assets/handheld/hand_11.jpg"

const telescope_images = [{ original: tele_0 }, { original: tele_1 }, { original: tele_2 }, { original: tele_3 }, { original: tele_4 }, { original: tele_5 }, { original: tele_6 }, { original: tele_7 }, { original: tele_8 }];
const hand_images = [{ original: hand_1 }, { original: hand_2 }, { original: hand_3 }, { original: hand_4 }, { original: hand_5 }, { original: hand_6 }, { original: hand_7 }, { original: hand_8 }, { original: hand_9 }, { original: hand_10 }, { original: hand_11 }];
const mobile_images = [{ original: mobile_1 }, { original: mobile_2 }, { original: mobile_3 }]
const cube_images = [{ original: cube_1 }, { original: cube_2 }, { original: cube_3 }, { original: cube_4 }, { original: cube_5 }, { original: cube_6 }, { original: cube_7 }, { original: cube_8 }, { original: cube_9 }, { original: cube_10 }]

const OrderItem = ({ item, removeOrder }) => {
    return (
        <div className="cart-item">
            <div className="item-image">
                {item.itemType == 0 && <ImageGallery items={mobile_images} showPlayButton={false} slideDuration={0} />}
                {item.itemType == 1 && <ImageGallery items={telescope_images} showPlayButton={false} slideDuration={0} />}
                {item.itemType == 2 && <ImageGallery items={cube_images} showPlayButton={false} slideDuration={0} />}
                {item.itemType == 3 && <ImageGallery items={hand_images} showPlayButton={false} slideDuration={0} />}
            </div>
            <div className="item-details">
                <div className="item-header">
                    <h3 className="item-title">{item.item}</h3>
                    <span className="item-price">${(parseFloat(item.amountInCents) / 100).toFixed(2)} USD   {removeOrder!=null && <button type="button" onClick={() => removeOrder()} className="remove_button"> X</button>} </span>
                </div>
                <p className="item-description">
                    {item.itemType == 0 && <p>
                        These Cell phone Diffusers have been designed to accommodate most every cell phone available in the market. They are easily attached below the camera lens and may be flipped up into position to cover the lens when taking a diffuse image (see the Process Tutorial page). <br /> <br />
                        Cell phones and tablets come in many different sizes and configurations. However, the size of the camera lens on these units have a diameter of less that 2 cm and are grouped within 4 cm. To accommodate most of these units, we provider a diffusing element 5x7 cm that can be positioned on the unit to cover and uncover the camera lenses with a just a single finger, as shown in the tutorials of this website.
                    </p>}
                    {item.itemType == 1 && <p>
                        Intrinsic imaging with telescopes requires a diffuser system that can move the Diffuser in and out of the path between the field of view and the lens of the objective telescope without disturbing the position of the target in the image. The AstroDiffuserTM System connects the system via a standard USB to a computer and the control software may be opened on the desktop. The system is controllable from a computer at the location of the telescope or remotely from thousands of miles over the internet. <br /> <br />
                        Cameras that have large objective lenses, such as telescopes and Telescopic cameras may require a remote-control Diffuser so that the field of view remains steady when obtaining the focused and diffused image set, especially when done by remote operation via computer. These Diffusers have a control box that connects directly to the computer through a USB plug and to the Diffuser unit via an ethernet cable.
                    </p>}
                    {item.itemType == 2 && <p>
                        Intrinsic imaging can easily be performed with any microscope that has a digital camera. Choose a field of view, focus, and take an image. Stereoscopes can use Handheld Diffusers of appropriate diameter. Then place the MicroDiffuserTM over the specimen and take a Diffused image of the same field of view. This image set can then be entered into the Intrinsic Processing program.  <br /><br />
                        When using objective lenses of 10x or below, the framed MicroDiffuserTM can be simply placed over the microscope slid. When using objective lenses greater than 10x, where the framed MicroDiffuserTM cannot fit under the objective lens, then use the Diffuser with the white tab to fit between the objective lens and the microscope slide.
                    </p>}
                    {item.itemType == 3 && <p>
                        For situations where standard diffuser products are not appropriate for the situation, Handheld DiffusersTM may be useful to obtain the diffuse images. <br /><br />
                        For camera units that are not cell phones or tablets, the simplest method to obtain Intrinsic image sets is with of a handheld Diffuser provided that the camera is mounted on a tripod or similar structure to steady the field of view. The diffuser must have a larger diameter than the camera lens. The Diffuser is held close to the camera lens without touching it.
                    </p>}
                </p>
            </div>
        </div>
    );
};

export default OrderItem;