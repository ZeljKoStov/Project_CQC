import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import astro_1 from "../../assets/astro/astro_1.jpeg"
import astro_2 from "../../assets/astro/astro_2.jpeg"
import astro_3 from "../../assets/astro/astro_3.jpeg"
import astro_4 from "../../assets/astro/astro_4.jpeg"
import astro_5 from "../../assets/astro/astro_5.jpeg"
import astro_6 from "../../assets/astro/astro_6.jpeg"
import astro_7 from "../../assets/astro/astro_7.jpeg"


import micro_1 from "../../assets/micro/micro_1.jpg"
import micro_2 from "../../assets/micro/micro_2.jpg"
import micro_3 from "../../assets/micro/micro_3.jpg"
import micro_4 from "../../assets/micro/micro_4.jpg"

import attach_1 from "../../assets/attach/attach_1.jpeg"
import attach_2 from "../../assets/attach/attach_2.jpeg"
import attach_3 from "../../assets/attach/attach_3.jpeg"
import attach_4 from "../../assets/attach/attach_4.jpeg"

import hand_1 from "../../assets/hand/hand_1.jpeg"
import hand_2 from "../../assets/hand/hand_2.jpeg"
import hand_3 from "../../assets/hand/hand_3.jpeg"
import hand_4 from "../../assets/hand/hand_4.jpeg"

const telescope_images = [{ original: astro_1 }, { original: astro_2 }, { original: astro_3 }, { original: astro_4 }, { original: astro_5 }, { original: astro_6 }, { original: astro_7 }];
const hand_images = [{ original: hand_1 }, { original: hand_2 }, { original: hand_3 }, { original: hand_4 }];
const mobile_images = [{ original: attach_1 }, { original: attach_2 }, { original: attach_3 }, { original: attach_4 }]
const micro_images = [{ original: micro_1},{ original:micro_2},{ original:micro_3},{ original:micro_4}]

const OrderItem = ({ item, removeOrder }) => {
    return (
        <div className="cart-item">
            <div className="item-image">
                {item.itemType == 0 && <ImageGallery items={mobile_images} showPlayButton={false} slideDuration={0} />}
                {item.itemType == 1 && <ImageGallery items={telescope_images} showPlayButton={false} slideDuration={0} />}
                {item.itemType == 2 && <ImageGallery items={micro_images} showPlayButton={false} slideDuration={0} />}
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
                        Cameras that have large objective lenses, such as telescopes and Telescopic cameras may require a remote-control Diffuser so that the field of view remains steady when obtaining the Original and Diffused image set, especially when done by remote operation via computer. These Diffusers have a control box that connects directly to the computer through a USB plug and to the Diffuser unit via an ethernet cable.
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