import React,{useEffect, useState} from 'react' ;
import {  Route, Routes  } from 'react-router-dom';

import './App.css'
import { Footer, Navbar} from './Component';
import {Landing, Register, Login, Processing, Technology,Theory, Tutorials} from './Pages';


const App = () => {

  const [sticky, setSticky]=useState(false);

  useEffect(()=> {
    const handleScroll =()=>{
      setSticky(window.scrollY>0);
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
          <Route path='/Intrinsic_Technology' element={<Technology/>}/>
          <Route path='/Intrinsic_Theory' element={<Theory/>}/>
          <Route path='/Process_Tutorials' element={<Tutorials/>}/>
        
        </Routes>
      </div>
      <div className='footer'>
        <Footer/>
      </div>
    </div>
    </>
  )
}

export default App

