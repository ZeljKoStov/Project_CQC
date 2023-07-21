
import React, { Fragment, useState, useRef } from 'react';
import tutorilaimage from '../../assets/tutorial.jpg';
import './tutorials.css';
import ReactPlayer from 'react-player'

import back from "../../assets/back.jpeg"


import { useNavigate } from "react-router-dom";

const Tutorials = () => {

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
      <div className='tutorial_container'>
          <img src={back} alt="Girl in a jacket" className='backgroundImage' />
          <div className='tutorials_body'>
              <div className='title'>
                  <spam>Intrinsic Tutorials</spam>
              </div>
              <div className='tutorials'>
                <div className='tutorials_video_row'>
                  <div className='att_video_column'>
                    <ReactPlayer
                      className="att_video"
                      url={"https://youtu.be/YWKpG12h50w"}
                      controls = {true}
                    />
                    <h2>How to Attach a AttachableDiffusers<sup className='supSmall'>TM</sup> to a Cell Phone</h2>
                  </div>
                  <div className='att_video_column'>
                    <ReactPlayer
                      className="att_video"
                      url={"https://youtu.be/b5FmLJiE40U"}
                      controls = {true}
                    />
                    <h2>How to Use a AttachableDiffusers<sup className='supSmall'>TM</sup> with a Cell Phone</h2>
                  </div>
                </div>
                <div className='tutorials_video_row'>
                  <div className='att_video_column'>
                    <ReactPlayer
                      className="att_video"
                      url={"https://youtu.be/B07lvA8M_Fw"}
                      controls = {true}
                    />
                    <h2>Handheld Diffuser<sup className='supSmall'>TM</sup></h2>
                  </div>
                  <div className='att_video_column'>
                    <ReactPlayer
                      className="att_video"
                      url={"https://youtu.be/TbEa1cUb6CY"}
                      controls = {true}
                    />
                    <h2>Handheld Diffuser<sup className='supSmall'>TM</sup> use with camera</h2>
                  </div>
                </div>
                <div className='tutorials_video_row'>
                  <div className='att_video_column'>
                    <ReactPlayer
                      className="att_video"
                      url={"https://youtu.be/2MkcP_E5i3Q"}
                      controls = {true}
                    />
                    <h2>AstroDiffuser<sup className='supSmall'>TM</sup></h2>
                  </div>
                  <div className='att_video_column'>
                    <ReactPlayer
                      className="att_video"
                      url={"https://youtu.be/YJ2_P3-V2D8"}
                      controls = {true}
                    />
                    <h2>AstroDiffuser<sup className='supSmall'>TM</sup> operation with App</h2>
                  </div>
                </div>
                <div className='tutorials_video_row'>
                  <div className='att_video_column'>
                    <ReactPlayer
                      className="att_video"
                      url={"https://youtu.be/UHvNh1GjBvc"}
                      controls = {true}
                    />
                    <h2>MicroDiffuser<sup className='supSmall'>TM</sup></h2>
                  </div>
                </div>
                {/* <div className='tutorial_processing_image_sets'>
                  <h1>Processing Image Sets</h1>
                  <h2><b>For Cell Phone Apps</b></h2>
                  <ol>
                    <li>Sign in</li>
                    <li>Press the Image Processing button</li>
                  </ol>
                  <p>All image sets that have not been processed will be processed and saved (Original, Diffused and Intrinsic) in the Intrinsic Images folder that is automatically generated on your cell phone.</p>
                  <h2><b>For Computers</b></h2>
                    <ol>
                      <li>Sign in</li>
                      <li>Press the Image Processing button</li>
                      <li>Upload and review the Original and Diffused image sets by navigating to their location in the computer.</li>
                      <li>Name the image set for future reference.</li>
                      <li>Press the Process button, or enter additional image sets for batch processing. </li>
                    </ol>
                  <p>All image sets that have not been processed will be processed and saved (Original, Diffused and Intrinsic) in the Intrinsic Images folder that is automatically generated in your computer.</p>

                </div> */}
              
                {/* <img src={tutorilaimage} alt='img' />
                <p>Three steps are required to create Intrinsic images: Obtaining mage sets, Renaming image sets, and Processing image sets. The following instructions provide the way to produce Intrinsic images. The Process of obtaining and processing Intrinsic images requires an Intrinsic DiffuserTM that is available, among other items, from the <a className='header_link_button' onClick={goToWebShop}>Web Shop.</a> Web Shop</p>
                <button type='button' className='blue_button' onClick={goToWebShop}>Web Shop</button>
                <br />

                <h2>Obtaining Image Sets</h2>
                <p>Producing an Intrinsic image requires a set of Original and Diffused images of the same field of view. The images are taken one after the other to insure that the camera settings, environmental conditions and field of view are the same for both exposures. </p>
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
                <p>All image sets that have not been processed will be processed and saved (Original, Diffused and Intrinsic) in the Intrinsic Images folder that is automatically generated on your cell phone.</p>
                <p><i>For Computers</i></p>
                <ol>
                  <li>Sign in</li>
                  <li>Press the Image Processing button</li>
                  <li>Upload and review the Original and Diffused image sets by navigating to their location in the computer.</li>
                  <li>Name the image set for future reference.</li>
                  <li>Press the Process button, or enter additional image sets for batch processing. </li>
                </ol>
                <p>All image sets that have not been processed will be processed and saved (Original, Diffused and Intrinsic) in the Intrinsic Images folder that is automatically generated in your computer.</p> */}

              </div>
          </div>
      </div>

    }
    </Fragment>
  )
}

export default Tutorials
