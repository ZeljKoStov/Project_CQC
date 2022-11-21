import React from 'react'
import sky from '../../assets/sky1jpg.jpg';

import './header.css'

const Header = () => {
  
    return(
        <>
        <div className='cqc__header'>
            <div className='cqc__header-left'>
                <h3>Intrinsic Image Processing Site</h3>
                <p>…powerful novel technology that reveals features in images that, for the most part, have  previously been hidden…</p>
            </div>
            <div className='cqc__header-right'>
                <img  src={sky} alt='img' />
            </div>
        </div>
        <div className='Prazan'>

            </div>
        </>
    )
}

export default Header
