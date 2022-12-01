import React, {useState,useEffect} from 'react'
import sky from '../../assets/darksky.png';
import { getCookie } from '../../utils/cookies';
import { useNavigate } from "react-router-dom";

import './header.css'

const Header = () => {

    const [name,setName] = useState('')

    useEffect(() => {
  
      const _name = getCookie('_name');
      setName(_name)
      
    }, [name]);
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/Processing`; 
      navigate(path);
    }
  
    return(
        <>
        <div className='cqc__header'>
            <div className='cqc__image'>
                <img  src={sky} alt='img' />
            </div>
            <div className='cqc__text'>
                <h1>Intrinsic Image Processing Site</h1>
                <p>…powerful novel technology that reveals features <br/> in images that, for the most part, have  previously been hidden…</p>
            </div>
            <div className='cqc__button'>
                <button type='button' onClick={routeChange}>Image Processing</button>
            </div>
        </div>
        </>
    )
}

export default Header
