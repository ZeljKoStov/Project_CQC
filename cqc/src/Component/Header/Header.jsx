import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import { TextAnim } from '../index';
import './header.css'
import back from "./back.jpeg"




const Header = ({prop}) => {

    const [vara,setVara]=useState(true);

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/Processing`; 
      navigate(path);
    }

   const pro=prop;


    return(
        <div className='mainContainer'>
            <img src={back} alt="Girl in a jacket" className='backgroundImage'/> 
        
            <div className='cqc__header2'>
                <div className='cqc__text1'>
                    {!pro&&<spam>Intrinsic Image Processing Site</spam> }
                    {pro&&<TextAnim text={"Intrinsic Image Processing Site"}/>}
                    <p>…powerful novel technology that reveals features <br/> in images that, for the most part, have  previously been hidden…</p>
                </div>
                <button type='button' className='blue_button' onClick={routeChange}>Image Processing</button>
                
            </div>   
        </div>
    )
}

export default Header
