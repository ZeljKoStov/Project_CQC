import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='cqc__footer'>
        <div>
            <h3>Intrinsic S&I</h3>
        </div>
        <div className='cqc__footer-row'>
            <div>
            <p color="textSecondary" >
            {'Copyright © '}Intrinsic S&I{' '}{new Date().getFullYear()}{'.'}
            </p>
            </div>
            <div>
                <p>Intrinsic Image Processing - All Rights Reserved.</p>
            </div>
            <div>
                <p>Contact: info@intrinsicsi.com</p>
            </div>
        </div>
    </div>
  )
}

export default Footer
