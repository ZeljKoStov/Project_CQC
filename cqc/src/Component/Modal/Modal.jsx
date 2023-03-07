import React ,{useEffect}from 'react'
import { useState } from 'react';
import {MdClear} from "react-icons/md"
import './modal.css'

const Modal = ({num,ind,pair,onClose}) => {
  
    const [counter,setCounter]=useState(ind);
    const[localCounter,setLocalCounter]=useState();
    //const[urlimg,setUrlimg]=useState('')
    let urlimg=''

    let length=pair.length;
    console.log(length+" length");
    console.log(counter+" counter");

    if(num==="furl"){urlimg=pair[ind].furl;/*setLocalCounter(0)*/}
    else if(num==="durl") {urlimg=pair[ind].durl;/*setLocalCounter(1)*/}
    else {urlimg=`${pair[ind].intrinsic}`;/*setLocalCounter(2)*/}



  /*{  console.log(urlimg)

    const counterDecrese=()=>{
      if(counter>0)
        setCounter(counter-1)
      else
        setCounter(length)
    }
    const counterIncrese=()=>{
      if(counter<length)
        setCounter(counter+1)
      else
        setCounter(0) 
    }

   const localCounterDecrese=()=>{
      if(localCounter>0)
        setLocalCounter(localCounter-1)
      else if(length>1){
        counterDecrese()
        setLocalCounter(2)
      }

      if(localCounter===0){setUrlimg(pair[counter].furl)}
      else if(localCounter===1){setUrlimg(pair[counter].durl)}
      else{setUrlimg(`${pair[counter].intrinsic}`)}
    }

    const localCounterIncrese=()=>{
      if(localCounter<2)
        setLocalCounter(localCounter+1)
      else if(length>1){
        counterIncrese()
        setLocalCounter(0)
      }

      if(localCounter===0){setUrlimg(pair[counter].furl)}
      else if(localCounter===1){setUrlimg(pair[counter].durl)}
      else{setUrlimg(`${pair[counter].intrinsic}`)}
    }
  }*/
  return (
    <div onClick={onClose} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
        <div className='escape' onClick={onClose}> 
            <MdClear size={"2rem"}/>
        </div>
      
        <img src={urlimg} alt='focused_image' />
      </div>
    </div>
  )
}

export default Modal


