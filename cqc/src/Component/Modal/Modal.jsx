import React ,{useEffect}from 'react'
import { useState } from 'react';
import {MdClear} from "react-icons/md"
import './modal.css'

const Modal = ({num,ind,mapNumber,pair,onClose}) => {
  
    const [counter,setCounter]=useState(ind);
    const[localCounter,setLocalCounter]=useState();
    //const[urlimg,setUrlimg]=useState('')
    let urlimg=''

    let length=pair.length;

    if(mapNumber == undefined || mapNumber == null || mapNumber == 0){
      if(num==="furl"){urlimg=pair[ind].furl;/*setLocalCounter(0)*/}
      else if(num==="durl") {urlimg=pair[ind].durl;/*setLocalCounter(1)*/}
      else {urlimg=`${pair[ind].intrinsic}`;/*setLocalCounter(2)*/}
    } else {
      switch (mapNumber){
        case 1: urlimg=`${pair[ind].map1}`; break;
        case 2: urlimg=`${pair[ind].map2}`; break;
        case 3: urlimg=`${pair[ind].map3}`; break;
        case 4: urlimg=`${pair[ind].map4}`; break;
        case 5: urlimg=`${pair[ind].map5}`; break;
        case 6: urlimg=`${pair[ind].map6}`; break;
        case 7: urlimg=`${pair[ind].map7}`; break;
        case 8: urlimg=`${pair[ind].map8}`; break;
        case 9: urlimg=`${pair[ind].map9}`; break;
      }
    }





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
      
        <img src={urlimg} alt='mapping_image' />
      </div>
    </div>
  )
}

export default Modal


