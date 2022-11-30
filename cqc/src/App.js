import React,{useEffect, useState} from 'react' ;
import {  Route, Routes  } from 'react-router-dom';

import './App.css'
import { Navbar } from './Component';
import {Landing, Register, Login, Processing} from './Pages';

const App = () => {

  const [sticky, setSticky]=useState(false);

  useEffect(()=> {
    const handleScroll =()=>{
      setSticky(window.scrollY>200);
      console.log(window.scrollY);
    };
    window.addEventListener('scroll',handleScroll);
    return ()=> window.removeEventListener('scroll',handleScroll);
  });

  return (
    <>
    <div className='App'>
    
      <nav className={`${sticky ? 'sticky' : '' }`}>
        <Navbar/>
      </nav>
      
      <div className='Page'>
        <Routes>
          
          <Route path='/' element={<Landing/>}/>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Register' element={<Login/>}/>
          <Route path='/Processing' element={<Processing/>}/>
        
        
        </Routes>
      </div>
    </div>
    </>
  )
}

export default App

