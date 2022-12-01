import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='cqc__footer'>
        <div>
            <h3>Center for Quantitative Cytometry</h3>
        </div>
        <div className='cqc__footer-row'>
            <div>
            <p color="textSecondary" >
            {'Copyright © '}CQC{' '}{new Date().getFullYear()}{'.'}
            </p>
            </div>
            <div>
                <p>Intrinsic Image Processing - All Rights Reserved.   </p>
            </div>
            <div>
                <p>  Contact: info@quantcyte.org   </p>
            </div>
        </div>
    </div>
  )
}

export default Footer
