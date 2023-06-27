import React, { useState } from 'react';
import Slider from '../../Component/Slider/Slider'
import { useNavigate } from "react-router-dom";

import "./challenge.css"

import f1 from "../../assets/week/week1_f.jpg"
import i1 from "../../assets/week/week1_i.jpg"

import f2 from "../../assets/week/week2_f.jpg"
import i2 from "../../assets/week/week2_i.jpg"

import f3 from "../../assets/week/week3_f.jpg"
import i3 from "../../assets/week/week3_i.jpg"

import f4 from "../../assets/week/week4_f.jpg"
import i4 from "../../assets/week/week4_i.jpg"

import f5 from "../../assets/week/week5_f.jpg"
import i5 from "../../assets/week/week5_i.jpg"

import f6 from "../../assets/week/week6_f.jpg"
import i6 from "../../assets/week/week6_i.jpg"

import f7 from "../../assets/week/week7_f.jpg"
import i7 from "../../assets/week/week7_i.jpg"

import f8 from "../../assets/week/week8_f.jpg"
import i8 from "../../assets/week/week8_i.jpeg"

import f9 from "../../assets/week/week9_f.jpg"
import i9 from "../../assets/week/week9_i.jpg"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Footer, Modal } from '../../Component';
import { MdClear } from "react-icons/md"



const Chalange = () => {


    const [index, setIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [imageToShow, setImageToShow] = useState(f1);

    const focused = [f9, f1, f2, f3, f4, f5, f6, f7, f8 ];
    const intrinsic = [i9, i1, i2, i3, i4, i5, i6, i7, i8 ];

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/Image_Submission`;
        navigate(path);
    }




    return (
        <div className='Challenge'>
            <h1>Intrinsic Images of the Week</h1>
            {
                index != -1 &&
                <div className='challange_submissions'>
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="challange_submission_button"
                        onClick={() => { if (index == 0) { setIndex(8) } else setIndex(index - 1) }}
                    />
                    <div className='challange_submission_image'>
                        <img src={focused[index]} alt="reload" onClick={() => {
                            setOpenModal(true)
                            setImageToShow(focused[index])
                        }} />
                    </div>
                    <div className='challange_submission_image'>
                        <img src={intrinsic[index]} alt="reload" onClick={() => {
                            setOpenModal(true)
                            setImageToShow(intrinsic[index])
                        }} />
                    </div>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="challange_submission_button"
                        onClick={() => { if (index == 8) { setIndex(0) } else setIndex(index + 1) }}
                    />
                </div>
            }
            
            {/* <div className='BlackBox'>
                <h2>Welcome to our Intrinsic Challenge!</h2>
                <button onClick={routeChange}>Image Submission</button>
            </div> */}
            <div className='TextBox'>
                <button type='button' className='blue_button' onClick={routeChange}>Image Submission</button>
                <div className='TextBlock'>
                    <h2>The Process & Goal</h2>
                    <p>Intrinsic imaging is a completely new method of photography. How the Intrinsic Image will appear is rarely predictable. The goal of this photographic challenge, relative to the original image, is to produce the most surprising, most interesting image of the week for display on the website! The subject of the image is up to you.</p>
                </div>
                <div className='TextBlock'>
                    <h2>Submission of Image Sets</h2>
                    <ol>
                        <li>Obtain a Original and Diffused set of images of a field of view of your interest.</li>
                        <li>Process the image set with the Intrinsic Processing Program in this website.</li>
                        <li>Press the Image Submission button above to access the Submission form.</li>
                        <li>Enter your information in the Submission form and upload your complete processed image set (Original, Diffuse and Intrinsic). Also, tell us a little about the image you submitted and the camera and settings you used.</li>
                    </ol>
                </div>
                <div className='TextBlock'>
                    <h2>Guidelines & Rules</h2>
                    <ol>
                        <li> Image may be of any appropriate subject matter.</li>
                        <li>Intrinsic Images sets must be processed with Intrinsic S&I software.</li>
                        <li>No additional software processing is permitted. </li>
                        <li>Only one Image set submitted per Submitter per week.</li>
                        <li>The winner retains the copyrights, but permits Intrinsic S&I use and publication of the winning submission.</li>
                    </ol>
                </div>
            </div>

            {openModal &&
                <div onClick={() => setOpenModal(false)} className='header_overlay'>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className='header_modalContainer'
                    >
                        <div className='header_escape' onClick={() => setOpenModal(false)}>
                            <MdClear size={"2rem"} />
                        </div>

                        <img src={imageToShow} alt='focused_image' />
                    </div>
                </div>
            }
        </div>
    )
}

export default Chalange
