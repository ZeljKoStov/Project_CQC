import React, { useEffect, useState } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import { motion } from "framer-motion";
import { getCookie, setCookie } from './utils/cookies';
import { Footer, Navbar, Header } from './Component';
import { Register, Login, Processing, Technology, Tutorials, Challenge, Submission, Web, MyProfil, Checkout, Orders, Admin, Applications, AdminSubbmissions, AdminOrders, ImagePresenter } from './Pages';
import './App.css'
import back from "./assets/back.jpeg"

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Intrinsic Technology', href: '/Intrinsic_Technology' },
  { name: 'Process Tutorials', href: '/Process_Tutorials' },
  { name: 'Intrinsic Challenge', href: '/Intrinsic_Challenge' },
  { name: 'Image Processing', href: '/Processing' },
  { name: 'Applications', href: '/Applications' },
  //{ name: 'Web Shop', href: '/Web_Shop' },
];

const App = () => {

  const [sticky, setSticky] = useState(false);
  const [wid, setWid] = useState(true);
  const [vara, setVara] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [orders, setOrders] = useState([])

  const min = 1;
  const max = 10;
  const rand = min + Math.random() * (max - min);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  useEffect(() => {
    const _name = getCookie('_name');
    const _email = getCookie('_email');
    console.log(_email)
    if (_name !== " " && _name !== undefined && _name !== null) {
      setUserName(_name)
      setUserEmail(_email)
      console.log(_email)
      console.log("email set at 62")
      setSignedIn(true)
    }
  })

  setTimeout(() => {
    setVara(false);
  }, 6000)

  const signIn = (name, email) => {
    setUserName(name);
    setUserEmail(email);
    console.log(email)
    console.log("email set at 75")
    setSignedIn(true);
  }

  const signOut = () => {
    setUserName("");
    setUserEmail("");
    setSignedIn(false);
  }

  const addOrder = (newOrder) => {
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
  }

  const removeOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
  }


  return (
    <>
      <div className='App'>
        {wid && (
          <>
            <div className='App-second'>
              <div className='Up'>
                <nav className='sticky'>
                  <Navbar orders={orders} widChanger={setWid} signedIn={signedIn} userName={userName} userEmail={userEmail} signOut={signOut} />
                </nav>
                <div className='Page'>

                  <Routes>
                    <Route path='/' element={<Header prop={vara} userEmail={userEmail} />} />
                    <Route path='/Register' element={<Register signIn={signIn} />} />
                    <Route path='/Register/:id' element={<Register signIn={signIn} />} />
                    <Route path='/Login' element={<Login signIn={signIn} />} />
                    <Route path='/Processing' element={<Processing userEmail={userEmail} />} />
                    <Route path='/Intrinsic_Technology' element={<Technology />} />
                    <Route path='/Process_Tutorials' element={<Tutorials />} />
                    <Route path='/Intrinsic_Challenge' element={<Challenge />} />
                    <Route path='/Image_Submission' element={<Submission userEmail={userEmail} />} />
                    <Route path='/Web_Shop' element={<Web signedIn={signedIn} userEmail={userEmail} addOrder={addOrder} />} />
                    <Route path='/My_Profile' element={<MyProfil />} />
                    <Route path='/Checkout' element={<Checkout orders={orders} setOrders={setOrders} removeOrder={removeOrder} />} />
                    <Route path='/Orders' element={<Orders />} />
                    <Route path='/Admin' element={<Admin />} />
                    <Route path='/AdminSubbmissions' element={<AdminSubbmissions />} />
                    <Route path='/AdminOrders' element={<AdminOrders />} />
                    <Route path='/Applications' element={<Applications />} />
                    <Route path='/ImagePresenter' element={<ImagePresenter />} />

                  </Routes>
                </div>

              </div>
            </div>
          </>
        )}
        {!wid && (
          <>
            <nav className={`${sticky ? 'sticky' : ''}`}>
              <Navbar widChanger={setWid} />
            </nav>
            <div className='fulNav' onClick={() => { setWid(true) }}>
              {
                navigation.map((item) => (
                  <div className='fulNav_div'>
                    <p>
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) => {
                          return (
                            (!isActive
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
                ))
              }
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default App

