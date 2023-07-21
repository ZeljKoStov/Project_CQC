
import React, { Fragment, useState } from 'react';
import tutorilaimage from '../../assets/tutorial.jpg';
import './applications.css';
import ReactPlayer from 'react-player'

import back from "../../assets/back.jpeg"

import i1 from "./intrinsic_1.png"
import i2 from "./intrinsic_2.png"
import f1 from "./original_1.png"
import f2 from "./original_2.png"


import { useNavigate } from "react-router-dom";

const Applications = () => {

  let navigate = useNavigate();

  const goToWebShop = () => {
    let path = `/Web_Shop`;
    navigate(path);
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }

  return (
    <Fragment>
    {
      <div className='container'>
          <img src={back} alt="Girl in a jacket" className='backgroundImage' />
          <div className='login_body'>
              <div className='applications_title2'>
                    <h1>Applications</h1>
                    {/* <div>
                      <p>Once in a while an intersection occurs in technologies which can reveal unique aspects of nature which can intrigue both scientists and artists alike.  Capturing intrinsic images from our ordinary to eclectic surroundings is one of those unique opportunities.  We are introducing some rapid image processing that captures the essence of intrinsic light emission which may reveal unusual and/or critical features and information about images.  Fundamentally, intrinsic image processing is a simple procedure thanks to 21st century mobile phones and other affiliated patented digital technology. </p>
                      <p>Johann Wolfgang von Goethe is the most recognized German literary figure of the 19th century, he is often compared to Shakespeare and Dante.  He was fascinated by how light from the sun can be split into visible spectral elements of a rainbow.  And again the spectral display can be recombined into white light. There is a distinction between spectrum, as was observed by Newton, and the human colour perception as described by Goethe.  He was a renaissance man whose interest crossed over literature and the theory of colors.</p>
                      <p>Back to the case of intrinsic processing, the ambient light is subtracted from the reflection captured by the camera.  This way the emitted light is a unique essential nature or the true intrinsic essence of the image.  Once the original image is processed the intrinsic image can be studied instantly side by side with it.  Will this kind of study enrich both the humanities and the natural sciences in most of us?  It is up to you and your generation to discover a novel way to reveal what is often hidden!</p>
                    </div> */}
                    

                    <p>Once in a while an intersection occurs in technologies which can reveal unique aspects of nature which can intrigue both scientists and artists alike.  Capturing intrinsic images from our ordinary to eclectic surroundings is one of those unique opportunities.  We are introducing some rapid image processing that captures the essence of intrinsic light emission which may reveal unusual and/or critical features and information about images.  Fundamentally, intrinsic image processing is a simple procedure thanks to 21st century mobile phones and other affiliated patented digital technology. </p>
                    <p>Johann Wolfgang von Goethe is the most recognized German literary figure of the 19th century, he is often compared to Shakespeare and Dante.  He was fascinated by how light from the sun can be split into visible spectral elements of a rainbow.  And again the spectral display can be recombined into white light. There is a distinction between spectrum, as was observed by Newton, and the human colour perception as described by Goethe.  He was a renaissance man whose interest crossed over literature and the theory of colors.</p>
                    <p>Back to the case of intrinsic processing, the ambient light is subtracted from the reflection captured by the camera.  This way the emitted light is a unique essential nature or the true intrinsic essence of the image.  Once the original image is processed the intrinsic image can be studied instantly side by side with it.  Will this kind of study enrich both the humanities and the natural sciences in most of us?  It is up to you and your generation to discover a novel way to reveal what is often hidden!</p>
                    
              </div>
              <div className='tutorials'>
                <div className='applications_image_row'>
                  <div className='header_video_column'>
                  <img src={f1} alt="reload" width="720" height="360"/>
                  <h2>Original</h2>
                  </div>
                  <div className='header_video_column'>
                    <img src={i1} alt="reload" width="720" height="360" />
                    <h2>Intrinsic</h2>
                  </div>
                </div>
                <h2>Evening Star 1917 Georgia O’Keeffe</h2>
                <div className='applications_image_row'>
                  <div className='header_video_column'>
                  <img src={f2} alt="reload" width="720" height="360"/>
                  <h2>Original</h2>
                  </div>
                  <div className='header_video_column'>
                    <img src={i2} alt="reload" width="720" height="360" />
                    <h2>Intrinsic</h2>
                  </div>
                </div>
                <h2>Lagoon Nebula M20 from San Juan, PR</h2>
              </div>
              
          </div>
      </div>

    }
    </Fragment>
  )
}

export default Applications
