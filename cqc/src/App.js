import React from 'react'
import {  Route, Routes,Outlet  } from 'react-router-dom';

import './App.css'
import { Navbar } from './Component';
import {Landing, Register, Login} from './Pages';

const App = () => {
  return (
    <>
    <div className='App'>
    
      <div className='Nav'>
        <Navbar/>
        <Outlet/>
      </div>
      
      <div className='Page'>
        <Routes>
          
          <Route path='/' element={<Landing/>}/>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Register' element={<Login/>}/>
        
        
        </Routes>
          
      </div>
    </div>
    </>
  )
}

export default App

