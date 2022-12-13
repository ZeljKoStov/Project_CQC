import React,{ useState} from 'react' ;
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import './navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/login`; 
    navigate(path);
  }

  return (
    <>
      <div className='cqc__navbar'>
        <div className='cqc__navbar_frst'>
          <div className='cqc__navbar_frst-empty'>
          </div>
          <div className='cqc__navbar_frst-logo'>
              <p><Link to='/'>Center for Quantitative Cytometry</Link></p>
          </div>
          <div className='cqc__navbar_frst-end'>
            <div className='cqc__navbar_frst-sign'>
              <p><Link to='Register'>Register</Link></p>
              <button  type='button' onClick={routeChange}>Login</button>
            </div>
            <div className='cqc__navbar_frst-menu'>
            {toggleMenu
              ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
              : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
            {toggleMenu && (
              <div className='cqc__navbar_frst-menu_container'>
                  <div className='cqc__navbar_frst-menu_container-links'>
                    <p id='p1'><Link to='/'>Home</Link></p>
                    <p id= 'p2'><Link to='/Intrinsic_Technology'>Intrinsic Technology</Link></p>
                    <p id='p3'><Link to='/Intrinsic_Theory'>Intrinsic Theory</Link></p>
                    <p id='p4'><Link to='/Process_Tutorials'>Process Tutorials</Link></p>
                    <p id='p5'><Link to='/Intrinsic_Challenge'>Intrinsic Challenge</Link></p>
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
          <div className='cqc__navbar-links_container'>
              <p><Link to='/'>Home</Link></p>
              <p><Link to='/Intrinsic_Technology'>Intrinsic Technology</Link></p>
              <p><Link to='/Intrinsic_Theory'>Intrinsic Theory</Link></p>
              <p><Link to='/Process_Tutorials'>Process Tutorials</Link></p>
              <p><Link to='/Intrinsic_Challenge'>Intrinsic Challenge</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
