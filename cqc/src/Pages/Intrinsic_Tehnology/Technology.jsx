import React from 'react';
import orignalimage from '../../assets/original-image.jpg';
import intrinsicimage from '../../assets/intrinsic-image.jpg';
import './technology.css';

const Technology = () => {
  return (
    <div className='technology'>
      <div className='title'>
        <h1>Intrinsic Dark</h1>
      </div>
      <div className='image'>
        <div className='imagediv1'>
            <img  src={orignalimage} alt='img' />
        </div>
        <div className='imagediv1'>
            <img  src={intrinsicimage} alt='img' />
        </div>
      </div>
      <div className='textdiv'>
        <h2>Intrinsic Technology</h2>
        <p>Can darkness reveal information? Yes! A simple example is suggested in the question, “Are the stars still in the sky during daylight hours?” The basis of Intrinsic Technology involves removing light from an image after it has illuminated the field of view. So, when Intrinsic  darkness is achieved, details in an image are revealed. This website is dedicated to the theory and practical use of this new technology.</p>
      </div>
    </div>
  )
}

export default Technology
