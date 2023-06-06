import React from 'react';
import { motion, } from "framer-motion";
import orignalimage from '../../assets/original-image.jpg';
import intrinsicimage from '../../assets/intrinsic-image.jpg';

import './technology.css';

import theoryfirst from '../../assets/theory-first.jpg';
import theorysecond from '../../assets/theory-second.jpg';
import { Footer } from '../../Component';

import back from "./back.jpeg"

document.body.style.overflow = "auto";

const Technology = () => {


  return (
    <>

      <div className='web_background'>
        


        <div className='web_title'>
            <h1>Intrinsic Technology</h1>
            <p>Can darkness reveal information? Yes! A simple example is suggested in the question, “Are the stars still in the sky during daylight hours?” The basis of Intrinsic Technology involves removing light from an image after it has illuminated the field of view. So, when Intrinsic  darkness is achieved, details in an image are revealed. This website is dedicated to the theory and practical use of this new technology.</p>
            <p></p>
            <img className="technology_img" src={theoryfirst} alt='img' />
            <p></p>
            <p className='technology_black_text'>Applying the analogy of paint to intrinsic imaging, consider the illumination (ambient light) equivalent to the white base paint and the color pigments as the intrinsic spectral components.  When the white base and pigments are mixed in the proper ratios, the mixture has the characteristics of the desired colored paint. However, removal of the white base paint would leave only the properties of the pigments. Intrinsic Technology is a patented* method that removes the illumination component from images to reveal the intrinsic components (the pigments) in a field of view. The novelty of Intrinsic Technology is that it can remove wide wavelength ranges of illumination, such as white light, without the use for spectral filters or mirrors. Intrinsic processing does not involve software algorithms, e.g., power stretching, compressing, color balancing, sharpening, deconvolution, etc., that manipulate the original image. </p>
            <p></p>
            <img className="technology_img" src={theorysecond} alt='img' />
        </div>
     

      </div>

    </>
  )
}

export default Technology
