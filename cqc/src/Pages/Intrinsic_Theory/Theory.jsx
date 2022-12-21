import React from 'react';
import theoryfirst from '../../assets/theory-first.jpg';
import theorysecond from '../../assets/theory-second.jpg';
import './theory.css';

const Theory = () => {
  return (
    <div className='theory'>
        <h1>Original Image</h1>
      <div className='image1'>
            <img  src={theoryfirst} alt='img' />
      </div>
      <div className='textdiv'>
        <h2>Basic Intrinsic Theory</h2>
        <p>Applying the analogy of paint to intrinsic imaging, consider the illumination (ambient light) equivalent to the white base paint and the color pigments as the intrinsic spectral components.  When the white base and pigments are mixed in the proper ratios, the mixture has the characteristics of the desired colored paint. However, removal of the white base paint would leave only the properties of the pigments. Intrinsic Technology is a patented* method that removes the illumination component from images to reveal the intrinsic components (the pigments) in a field of view. The novelty of Intrinsic Technology is that it can remove wide wavelength ranges of illumination, such as white light, without the use for spectral filters or mirrors. Intrinsic processing does not involve software algorithms, e.g., power stretching, compressing, color balancing, sharpening, deconvolution, etc., that manipulate the original image. </p>
         <br/>   
         <br/>   
         <br/>       
        <p>*US Patent 10,652,484<br/>*US Patent 10,969,523</p>
        <br/>  
      </div>
        <h1>Intrinsic Image</h1>
      <div className='image2'>
            <img  src={theorysecond} alt='img' />
        </div>
    </div>
  )
}

export default Theory