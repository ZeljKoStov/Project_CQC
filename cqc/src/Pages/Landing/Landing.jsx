import React from 'react'
import { useState } from 'react'
import { Header } from '../../Component'


const Landing = ({openChanger, ...rest}) => {

  const [set,setSet]=useState(false);
  
    return(
      <>{console.log("prvo odavde") }
        {!set &&<Header setChanger={setSet}/>}
        {console.log("unutar "+set)}
        {set &&<>{openChanger(true)}</> }
      </>
      )   
  
}

export default Landing
