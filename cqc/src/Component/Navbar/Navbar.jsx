import React,{ useState,useRef,useEffect} from 'react' ;
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { NavLink,Link } from 'react-router-dom';
import { getCookie } from '../../utils/cookies';
import { useNavigate } from "react-router-dom";

import './navbar.css';

const navigation=[
  {name: 'Home', href:'/'},
  {name: 'Intrinsic Technology', href:'/Intrinsic_Technology'},
  {name: 'Intrinsic Theory', href:'/Intrinsic_Theory'},
  {name: 'Process Tutorials', href:'/Process_Tutorials'},
  {name: 'Intrinsic Challenge', href:'/Intrinsic_Challenge'},
  {name: 'Image Processing', href:'/Processing'},
];

const Navbar = ({widChanger, ...rest}) => {

  const getWindowsDimensions=()=>{
    const {innerWidth: width, innerHeight: height}=window;
    return {
      width,
      height
    };
  }
  const [toggleMenu, setToggleMenu] = useState(false);
  const [name,setName] = useState('')
  const [signin,setSignIn] = useState(false)
  const [wid, setWid]=useState(getWindowsDimensions());
  const boxRef = useRef();

  function useOutsideAlerter(boxRef,toggleMenu) {
    useEffect(() => {

      function handleClickOutside(event) {
        if (boxRef.current && !boxRef.current.contains(event.target) ) {
          setToggleMenu(false);
          console.log("You clicked outside of me!");
        }
      }
      if(toggleMenu){
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
      
        document.removeEventListener("mousedown", handleClickOutside);
      };}
    }, );
  }

  

  useEffect(()=> {
    const handleResize =()=>{
      setWid(getWindowsDimensions());
    };
    window.addEventListener('resize',handleResize);
    return ()=> window.removeEventListener('resize',handleResize);
  },[]);

  useEffect(() => {

    const _name = getCookie('_name');
    setName(_name)
    setSignIn(true)
    
  }, [name]);

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/login`; 
    navigate(path);
  }
  
  return (
    <>
    {useOutsideAlerter(boxRef,toggleMenu)}
      <div className='cqc__navbar'>
        <div className='cqc__navbar_frst'>
          <div className='cqc__navbar_frst-empty'>
          </div>
          <div className='cqc__navbar_frst-logo'>
              <p><NavLink to='/'>Center for Quantitative Cytometry</NavLink></p>
          </div>
          <div className='cqc__navbar_frst-end'>
            <div className='cqc__navbar_frst-sign'>
              { signin 
                ? <p>{name}</p>
                : <p></p>
              }
              <p><NavLink to='Register'>Register</NavLink></p>
              <button  type='button' onClick={routeChange}>Login</button>
            </div>
            <div className='cqc__navbar_frst-menu' ref={boxRef}>
            {toggleMenu 
              ? <RiCloseLine color="#fff" size={27} onClick={() =>{ setToggleMenu(false);widChanger(true)} } />
              : <RiMenu3Line color="#fff" size={27} onClick={() =>{ setToggleMenu(true);wid.width<=425?widChanger(false):widChanger(true)}} />}
            {toggleMenu && wid.width>425 && (
              <div className='cqc__navbar_frst-menu_container'  onClick={() => {setToggleMenu(false);widChanger(true)}}>
                  <div className='cqc__navbar_frst-menu_container-links'>
                     {navigation.map((item)=>(
                        <p>
                          <NavLink
                            key={item.name}
                            to={item.href}
                            className={({isActive})=> {
                                return(
                                  ( !isActive
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
                    <button  type='button' onClick={routeChange}>Login</button>
                  </div>
              </div>
            )}
            </div>
            </div> 
        </div>
        <div className='cqc__navbar_second'>
              {navigation.map((item)=>(
                <p>
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({isActive})=> {
                        return(
                          ( !isActive
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
      </div>
    </>
  )
}

export default Navbar
