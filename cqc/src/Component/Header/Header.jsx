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

import tutorilaimage from '../../assets/tutorial.jpg';
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
                    <h1>Intrinsic Tutorials</h1>
                    <img src={tutorilaimage} alt='img' />
                    <p>Three steps are required to create Intrinsic images: Obtaining mage sets, Renaming image sets, and Processing image sets. The following instructions provide the way to produce Intrinsic images. The Process of obtaining and processing Intrinsic images requires an Intrinsic DiffuserTM that is available, among other items, from the <a className='header_link_button' onClick={goToWebShop}>Web Shop.</a> Web Shop</p>
                    <button type='button' className='blue_button' onClick={goToWebShop}>Web Shop</button>
                    <h2>Obtaining Image Sets</h2>
                    <p>Producing an Intrinsic image requires a set of Focused and Diffused images of the same field of view. The images are taken one after the other to insure that the camera settings, environmental conditions and field of view are the same for both exposures. </p>
                    <ol>
                        <li>Have the Diffusing element such that the diffusing material can cover and uncover the camera lens. </li>
                        <li>Set the camera to the desired the exposure parameters. </li>
                        <li>Focus on the subject matter and take a picture. </li>
                        <li>While still focused on the subject, cover the camera lens with the diffuse material and take another exposure. </li>
                        <li>A successful image set contains the original image that is well exposed and focused, and the second image that is diffuse and has no detail in field of view.</li>
                    </ol>
                    <div className='header_video_row'>
                        <div className='header_video_column'>
                            <iframe clasName="header_video" title="vimeo-player" src="https://player.vimeo.com/video/737342731?h=17a1d5f9ec" width="640" height="360" frameborder="1" allowfullscreen></iframe>
                            <h2>How to Attach a Diffuser to a Cell Phone</h2>
                        </div>
                        <div className='header_video_column'>
                            <iframe clasName="header_video" title="vimeo-player" src="https://player.vimeo.com/video/737336712?h=431e8e7179" width="640" height="360" frameborder="1" allowfullscreen></iframe>
                            <h2>How to Use a Diffuser with a Cell Phone</h2>
                        </div>
                    </div>
                    <h2>Processing Image Sets</h2>
                    <p><i>For Cell Phone Apps</i></p>
                    <ol>
                        <li>Sign in</li>
                        <li>Press the Image Processing button</li>
                    </ol>
                    <p>All image sets that have not been processed will be processed and saved (Focused, Diffused and Intrinsic) in the Intrinsic Images folder that is automatically generated on your cell phone.</p>
                    <p><i>For Computers</i></p>
                    <ol>
                        <li>Sign in</li>
                        <li>Press the Image Processing button</li>
                        <li>Upload and review the Focused and Diffused image sets by navigating to their location in the computer.</li>
                        <li>Name the image set for future reference.</li>
                        <li>Press the Process button, or enter additional image sets for batch processing. </li>
                    </ol>
                    <p>All image sets that have not been processed will be processed and saved (Focused, Diffused and Intrinsic) in the Intrinsic Images folder that is automatically generated in your computer.</p>
                    <br />
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
                        <li>Obtain a Focused and Diffused set of images of a subject interest.</li>
                        <li>Process the image set with the Intrinsic Process available in this website.</li>
                        <li>Press the Image Submission button to access the Submission form.</li>
                        <li>Enter your information in the Submission form and upload your complete image set (Focused, Diffuse and Intrinsic). Also, tell us a little about the subject you submitted and the camera and settings used.</li>
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
