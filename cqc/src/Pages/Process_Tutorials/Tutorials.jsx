import React from 'react';
import tutorilaimage from '../../assets/tutorial.jpg';
import './tutorials.css';

const Tutorials = () => {
  return (
    <div className='technology'>
        <h1>Process Tutorials</h1>
      <div className='clip'>
        <div className='clip_item'>
          <iframe title="vimeo-player" src="https://player.vimeo.com/video/737342731?h=17a1d5f9ec" width="640" height="360" frameborder="0" allowfullscreen></iframe>
          <h2>How to Attach a Diffuser to a Cell Phone</h2>
        </div>
        <div className='clip_item'>
          <iframe title="vimeo-player" src="https://player.vimeo.com/video/737336712?h=431e8e7179" width="640" height="360" frameborder="0" allowfullscreen></iframe>
          <h2>How to Use a Diffuser with a Cell Phone</h2>
        </div>
        </div>
        <h1>Intrinsic Tutorials</h1>
      <div className='image'>
            <img  src={tutorilaimage} alt='img' />
      </div>
      <div className='textdiv'>
        <h2>Intrinsic Imaging</h2>
        <p>Three steps are required to create Intrinsic images: Obtaining mage sets, Renaming image sets, and Processing image sets. The following instructions provide the way to produce Intrinsic images.</p>
        <br/>
        <h2>Obtaining Image Sets</h2>
        <p>Producing an Intrinsic image requires a set of Focused and Diffused images of the same field of view. The images are taken one after the other to insure that the camera settings, environmental conditions and field of view are the same for both exposures. </p>
        <ol>
            <li>Have the Diffusing element such that the diffusing material can cover and uncover the camera lens. </li>
            <li>Set the camera to the desired the exposure parameters. </li>
            <li>Focus on the subject matter and take a picture. </li>
            <li>While still focused on the subject, cover the camera lens with the diffuse material and take another exposure. </li>
            <li>A successful image set contains the original image that is well exposed and focused, and the second image that is diffuse and has no detail in field of view.</li>
        </ol>
      </div>
      <div className='textdiv'>
        <h2>Processing Image Sets</h2>
        <p>Now, the re-named image sets can be processed by pressing the Image Processing button on the Home page. </p>
        <ol>
            <li>Register as a user and Sign in.</li>
            <li>Click on the Import images button in the Intrinsic Processing page.</li>
            <li>Navigate to your folder containing the renamed image sets.</li>
            <li>Highlight the image pair, or pairs (batch processing) you wish to process</li>
        </ol>  
      </div>
    </div>
  )
}

export default Tutorials
