import React,{useEffect, useState} from 'react' ;
import {  Route, Routes ,NavLink } from 'react-router-dom';

import './App.css'
import { Footer, Navbar} from './Component';
import {Landing, Register, Login, Processing, Technology,Theory, Tutorials} from './Pages';

const navigation=[
  {name: 'Home', href:'/'},
  {name: 'Intrinsic Technology', href:'/Intrinsic_Technology'},
  {name: 'Intrinsic Theory', href:'/Intrinsic_Theory'},
  {name: 'Process Tutorials', href:'/Process_Tutorials'},
  {name: 'Intrinsic Challenge', href:'/Intrinsic_Challenge'},
  {name: 'Image Processing', href:'/Processing'},
];

const App = () => {

  const [sticky, setSticky]=useState(false);
  const [wid, setWid]=useState(true);

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
        {wid && (
          <><div className='App-second'>
            <div>
            <nav className={`${sticky ? 'sticky' : '' }`}>
              <Navbar widChanger={setWid}/>
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
            </div>
            <div className='footer'>
              <Footer/>
            </div>
            </div>
          </>
        )}
        {!wid && (
          <>
           <nav className={`${sticky ? 'sticky' : '' }`}>
             <Navbar widChanger={setWid}/>
           </nav>
            <div className='fulNav' onClick={()=> {setWid(true)}}>
               {navigation.map((item)=>(
                    <div className='fulNav_div'>
                      <p>
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({isActive})=> {
                              return(
                                ( !isActive
                                    ? 'cqc__fulNavP2'
                                    : 'cqc__fulNavP'
                                )
                              ); 
                            }}
                        >
                          {item.name}
                        </NavLink>
                      </p>
                  </div>
                ))}
            </div>
          </>
        )}
    </div>
    </>
  )
}

export default App

