import React, { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { TextAnim } from '../index';
import './header.css'
import back from "./back.jpeg"
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { MdClear } from "react-icons/md"
import { RequestAPI } from '../../utils/request-api'
import { vote } from '../../api/api'

import { Footer } from '../../Component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Modal } from '../../Component';

import orignalimage from '../../assets/original-image.jpg';
import intrinsicimage from '../../assets/intrinsic-image.jpg';

import theoryfirst from '../../assets/theory-first.jpg';
import theorysecond from '../../assets/theory-second.jpg';


import i0 from "../../assets/week/i0.jpg"
import i1 from "../../assets/week/i1.jpg"
import i2 from "../../assets/week/i2.jpg"
import i3 from "../../assets/week/i3.jpg"
import i4 from "../../assets/week/i4.jpg"
import i5 from "../../assets/week/i5.jpg"
import i6 from "../../assets/week/i6.jpg"
import i7 from "../../assets/week/i7.jpg"
import i8 from "../../assets/week/i8.jpg"
import i9 from "../../assets/week/i9.jpg"
import f0 from "../../assets/week/f0.jpg"
import f1 from "../../assets/week/f1.jpg"
import f2 from "../../assets/week/f2.jpg"
import f3 from "../../assets/week/f3.jpg"
import f4 from "../../assets/week/f4.jpg"
import f5 from "../../assets/week/f5.jpg"
import f6 from "../../assets/week/f6.jpg"
import f7 from "../../assets/week/f7.jpg"
import f8 from "../../assets/week/f8.jpg"
import f9 from "../../assets/week/f9.jpg"



const Header = ({ prop, userEmail }) => {


    const focused = [f0, f1, f2, f3, f4, f5, f6, f7, f8, f9];
    const intrinsic = [i0, i1, i2, i3, i4, i5, i6, i7, i8, i9];

    const [vara, setVara] = useState(true);
    const [index, setIndex] = useState(0);
    const [voted, setVoted] = useState(false);
    const [loading, setLoading] = useState(false);
    const targetRef = useRef(null);

    const [openModal, setOpenModal] = useState(false);
    const [imageToShow, setImageToShow] = useState(f0);

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/Processing`;
        navigate(path);
    }


    const goToWebShop = () => {
        let path = `/Web_Shop`;
        navigate(path);
        // Scroll to the top of the page
        window.scrollTo(0, 0);
    }

    const goToSubmission = () => {
        let path = `/Image_Submission`;
        navigate(path);
        // Scroll to the top of the page
        window.scrollTo(0, 0);
    }


    const submitVote = async (e) => {
        e.preventDefault();

        setLoading(true);

        const body = {
            email: userEmail,
            index: index,
        }

        try {
            const response = await RequestAPI(vote(body));
            setLoading(false);
            if (response.status === 200) {
                setVoted(true);
            }

        } catch (error) {
            console.log(error);
            setLoading(false)
        }

    }

    const pro = prop;


    return (
        <div className='mainContainer'>
            <img src={back} alt="Girl in a jacket" className='backgroundImage' />

            <div className='header_body'>
                <div className='header_text_white'>
                    {!pro && <spam>Intrinsic Image Processing Site</spam>}
                    {pro && <TextAnim text={"Intrinsic Image Processing Site"} />}
                    <p>…powerful novel technology that reveals features <br /> in images that, for the most part, have  previously been hidden…</p>
                    <div className='header_image_row'>
                        <div className='imagediv1'>
                            <img src={orignalimage} alt='img' />
                        </div>
                        <div className='imagediv1'>
                            <img src={intrinsicimage} alt='img' />
                        </div>
                    </div>
                    <br />
                    <button type='button' className='blue_button' onClick={routeChange}>Image Processing</button>


                </div>

                <div className='header_text'>
                    <h1>Intrinsic Technology</h1>
                    <p>Can darkness reveal information? Yes! A simple example is suggested in the question, “Are the stars still in the sky during daylight hours?” The basis of Intrinsic Technology involves removing light from an image after it has illuminated the field of view. So, when Intrinsic  darkness is achieved, details in an image are revealed. This website is dedicated to the theory and practical use of this new technology.</p>

                    <img src={theoryfirst} alt='img' />
                    <p>Applying the analogy of paint to intrinsic imaging, consider the illumination (ambient light) equivalent to the white base paint and the color pigments as the intrinsic spectral components.  When the white base and pigments are mixed in the proper ratios, the mixture has the characteristics of the desired colored paint. However, removal of the white base paint would leave only the properties of the pigments. Intrinsic Technology is a patented* method that removes the illumination component from images to reveal the intrinsic components (the pigments) in a field of view. The novelty of Intrinsic Technology is that it can remove wide wavelength ranges of illumination, such as white light, without the use for spectral filters or mirrors. Intrinsic processing does not involve software algorithms, e.g., power stretching, compressing, color balancing, sharpening, deconvolution, etc., that manipulate the original image. </p>
                    <img src={theorysecond} alt='img' />
                   <h1>Intrinsic Images of the Week</h1>
                    {
                        index != -1 &&
                        <div className='header_submissions'>
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                className="header_submission_button"
                                onClick={() => { if (index == 0) { setIndex(9) } else setIndex(index - 1) }}
                            />
                            <div className='header_submission_image'>
                                <img src={focused[index]} alt="reload" onClick={() => {
                                    setOpenModal(true)
                                    setImageToShow(focused[index])
                                }} />
                                <h1>Original</h1>
                            </div>
                            <div className='header_submission_image'>
                                <img src={intrinsic[index]} alt="reload" onClick={() => {
                                    setOpenModal(true)
                                    setImageToShow(intrinsic[index])
                                }} />
                                <h1>Intrinsic</h1>
                            </div>
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className="header_submission_button"
                                onClick={() => { if (index == 9) { setIndex(0) } else setIndex(index + 1) }}
                            />
                        </div>
                    }

                    {
                        userEmail != "" &&
                        <>
                            {voted ?
                                <>
                                    <p>Thank you for voating!</p>
                                </>
                                :
                                <>
                                    <button type='button' className='blue_button' onClick={(e)=>submitVote(e)}>Vote for image</button>
                                    <div>Only one vote per user will counted!</div>
                                </>

                            }

                        </>
                    }
                    <br />
                    <h1>The Challenge</h1>
                    <ol>
                        <li>Obtain a Original and Diffused set of images of a subject interest.</li>
                        <li>Process the image set with the Intrinsic Process available in this website.</li>
                        <li>Press the Image Submission button to access the Submission form.</li>
                        <li>Enter your information in the Submission form and upload your complete image set (Original, Diffuse and Intrinsic). Also, tell us a little about the subject you submitted and the camera and settings used.</li>
                    </ol>

                    <button type='button' className='blue_button' onClick={goToSubmission}>Image Submission</button>
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
                    {
                        loading && <div class="header-spinner-overlay">
                            <div class="header-spinner"></div>
                        </div>
                    }
                </div>





                <Footer></Footer>
            </div>

        </div>
    )
}

export default Header
