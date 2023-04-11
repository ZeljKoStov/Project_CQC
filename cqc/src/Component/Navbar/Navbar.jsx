import React, { useState, useRef, useEffect } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { BiUser } from "react-icons/bi";
import { NavLink, Link } from 'react-router-dom';
import { getCookie, setCookie } from '../../utils/cookies';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import  shoping_cart  from "./shoping_cart.png"


import './navbar.css';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Intrinsic Technology', href: '/Intrinsic_Technology' },
  { name: 'Intrinsic Theory', href: '/Intrinsic_Theory' },
  { name: 'Process Tutorials', href: '/Process_Tutorials' },
  { name: 'Intrinsic Challenge', href: '/Intrinsic_Challenge' },
  { name: 'Image Processing', href: '/Processing' },
  { name: 'Web Shop', href: 'Web_Shop' }
];

const Navbar = ({ orders, widChanger, signedIn, userName, signOut }) => {

  const getWindowsDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  const [toggleMenu, setToggleMenu] = useState(false);
  const [name, setName] = useState('')
  const [signin, setSignIn] = useState(false)
  const [wid, setWid] = useState(getWindowsDimensions());
  const boxRef = useRef();
  const [vari, setVari] = useState(true);

  function useOutsideAlerter(boxRef, toggleMenu) {
    useEffect(() => {

      function handleClickOutside(event) {
        if (boxRef.current && !boxRef.current.contains(event.target)) {
          setToggleMenu(false);
          console.log("You clicked outside of me!");
        }
      }
      if (toggleMenu) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {

          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    },);
  }



  useEffect(() => {
    const handleResize = () => {
      setWid(getWindowsDimensions());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    const _name = getCookie('_name');
    if (_name !== " ") {
      setName(_name)
      setSignIn(true)
    }

  }, [name], [signin]);


  const logOut = () => {
    setSignIn(false);
    setCookie('_jwt', " ");
    setCookie('_name', " ");
    setName(" ");
    signOut();
  }

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/login`;
    navigate(path);
  }

  const changeR = () => {
    let path = `/`;
    const _name = getCookie('_name');
    if (_name !== " ") {
      setName(_name)
      setSignIn(true)
    }
    navigate(path);
  }

  const goToProfil = () => {
    let path = `/My_Profile`;
    navigate(path);
  }

  setTimeout(() => {
    setVari(false);
  }, 4050)

  return (
    <>
      {useOutsideAlerter(boxRef, toggleMenu)}
      <AnimatePresence>
        {!vari && (
          <motion.div
            key={"frst"}
            className='cqc__navbar'
            initial={{ opacity: 0.8, height: 0 }}
            animate={{ opacity: 1, height: "6rem" }}
            transition={{

              duration: 0.3,
              ease: "easeIn"
            }}
          >
            <div className='cqc__navbar_frst'>
              <div className='cqc__navbar_frst-empty'>
              </div>
              <div className='cqc__navbar_frst-logo'>
                <p><NavLink to='/'>Intrinsic S&I</NavLink></p>
              </div>
              <div className='cqc__navbar_frst-end'>
                {signedIn
                  ?
                  <>
                    <div className="login_div">

                      <div className="shoping_cart_container" onClick={() => { navigate("/Checkout");}}>
                        <img className="shoping_cart" src={shoping_cart} />
                        {orders.length>0 && orders.length}
                      </div>
                      

                      <div className='biuser' onClick={goToProfil}>
                        <BiUser size={"2rem"} color={"white"} />
                      </div>
                      <p >{userName}</p>
                      <button type='button' onClick={() => { logOut(); changeR() }}>Sign Out</button>
                    </div>
                  </>
                  :
                  <>
                    <div className='cqc__navbar_frst-sign'>
                      <p><NavLink to='Register'>Register</NavLink></p>
                      <button type='button' onClick={routeChange}>Sign In</button>
                    </div>
                  </>
                }
                <div className='cqc__navbar_frst-menu' ref={boxRef}>
                  {toggleMenu
                    ? <RiCloseLine color="#fff" size={27} onClick={() => { setToggleMenu(false); widChanger(true) }} />
                    : <RiMenu3Line color="#fff" size={27} onClick={() => { setToggleMenu(true); wid.width <= 425 ? widChanger(false) : widChanger(true) }} />}
                  {toggleMenu && wid.width > 425 && (
                    <div className='cqc__navbar_frst-menu_container' onClick={() => { setToggleMenu(false); widChanger(true) }}>
                      <div className='cqc__navbar_frst-menu_container-links'>
                        {navigation.map((item) => (
                          <p>
                            <NavLink
                              key={item.name}
                              to={item.href}
                              className={({ isActive }) => {
                                return (
                                  (!isActive
                                    ? 'cqc__navbar-links_container'
                                    : 'cqc__navbar-links_container2'
                                  )
                                );
                              }}
                            >
                              {item.name}
                            </NavLink>
                          </p>
                        ))}
                      </div>
                      <div className='cqc__navbar_frst-menu_containers-links-sign'>
                        <p><Link to='Register'>Register</Link></p>
                        <button type='button' onClick={routeChange}>Login</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='cqc__navbar_second'>
              {navigation.map((item) => (
                <p>
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => {
                      return (
                        (!isActive
                          ? 'cqc__navbar-links_container'
                          : 'cqc__navbar-links_container2'
                        )
                      );
                    }}
                  >
                    {item.name}
                  </NavLink>
                </p>
              ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </>
  )
}

export default Navbar
