import React from 'react';
import Slider from '../../Component/Slider/Slider'
import { useNavigate } from "react-router-dom";

import "./challenge.css"



const Chalange = () => {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/Image_Submission`; 
      navigate(path);
    }


  return (
    <div className='Challenge'>
        <h1>Intrinsic Image of the Week</h1>
        <Slider />     
        <div className='BlackBox'>
            <h2>Welcome to our Intrinsic Challenge!</h2>
            <button onClick={routeChange }>Image Submission</button>
        </div>
        <div className='TextBox'>
            <h2 className='H2'>Intrinsic Image of the Week</h2>
            <div className='TextBlock'>
                <h2>The Process & Goal</h2>
                <p>Intrinsic imaging is a completely new method of photography. How the Intrinsic Image will appear is rarely predictable. The goal of this photographic challenge, relative to the original image, is to produce the most surprising, most interesting image of the week for display on the website! The subject of the image is up to you.</p>
            </div>
            <div className='TextBlock'>
                <h2>Submission of Image Sets</h2>
                <ol>
                    <li>Obtain a Focused and Diffused set of images of a field of view of your interest.</li>
                    <li>Process the image set with the Intrinsic Processing Program in this website.</li>
                    <li>Press the Image Submission button above to access the Submission form.</li>
                    <li>Enter your information in the Submission form and upload your complete processed image set (Focused, Diffuse and Intrinsic). Also, tell us a little about the image you submitted and the camera and settings you used.</li>
                </ol>
            </div>
            <div className='TextBlock'>
                <h2>Guidelines & Rules</h2>
                <ol>
                    <li> Image may be of any appropriate subject matter.</li>
                    <li>Intrinsic Images sets must be processed with CQC software.</li>
                    <li>No additional software processing is permitted. </li>
                    <li>Only one Image set submitted per Submitter per week.</li>
                    <li>The winner retains the copyrights, but permits CQC use and publication of the winning submission.</li>
                </ol>
            </div>
        </div>
    </div>
  )
}

export default Chalange
