import React,{useEffect, useState} from 'react' ;
import {  Route, Routes ,NavLink  } from 'react-router-dom';
import { motion} from "framer-motion";
import { getCookie, setCookie} from './utils/cookies';
import { Footer, Navbar,Header} from './Component';
import { Register, Login, Processing, Technology, Tutorials, Challenge, Submission,Web,MyProfil, Checkout, Orders, Admin, Applications, AdminSubbmissions, AdminOrders} from './Pages';
import './App.css'
import back from "./assets/back.jpeg"

const navigation=[
  {name: 'Home', href:'/' },
  {name: 'Intrinsic Technology', href:'/Intrinsic_Technology'},
  {name: 'Process Tutorials', href:'/Process_Tutorials'},
  {name: 'Intrinsic Challenge', href:'/Intrinsic_Challenge'},
  {name: 'Image Processing', href:'/Processing'},
  {name: 'Applications', href:'/Applications'},
  //{name: 'Web Shop', href:'/Web_Shop'},
];

const App = () => {

  const [sticky, setSticky]=useState(false);
  const [wid, setWid]=useState(true);
  const [vara,setVara]=useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [orders, setOrders] = useState([])

  const min = 1;
  const max = 10;
  const rand = min + Math.random() * (max - min);
 
  useEffect(()=> {
    const handleScroll =()=>{
      setSticky(window.scrollY>0);
    };
    window.addEventListener('scroll',handleScroll);
    return ()=> window.removeEventListener('scroll',handleScroll);
  });

  useEffect(()=>{
    const _name = getCookie('_name');
    const _email = getCookie('_email');
    if(_name!==" " && _name!==undefined && _name!==null){
      setUserName(_name)
      setUserEmail(_email)
      setSignedIn(true)
    }
  })
  
  setTimeout(()=>{
    setVara(false);
  },6000)

  const signIn = (name, email) => {
    setUserName(name);
    setUserEmail(email);
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
                <nav className={`${sticky ? 'sticky' : '' }`}>
                  <Navbar orders={orders} widChanger={setWid} signedIn={signedIn} userName={userName} signOut={signOut} />
                </nav>

                {/* <motion.div 
                    className='Animation'
                    initial={{ height: '100vh' }}
                    animate={{height:0}}
                    transition={{
                        duration: 0.5,
                        delay: 3.5,
                        ease: "linear"
                    }}
                >
                    <motion.img 
                        className='round'
                        src={require("./assets/d_"+parseInt(rand)+".png")} alt='img'
                        initial={{ 
                            width:"20vw" , 
                            height:"50vh"}}
                        animate={{
                            x:["-20vw","33vw","37vw","37vw","37vw","37vw","37vw"], 
                            y:["20vh","20vh","20vh","20vh","20vh","20vh","-58vh"],
                            opacity:[1 , 1, 0.8, 0.8, 0, 0, 0]}}
                        transition={{ 
                            duration: 3.7,
                            delay:0.3,
                            times:[0, 0.135, 0.324, 0.459, 0.729 , 0.862, 1], 
                            easings: ["circIn","easeInOut", "linear","linear","linear","linear"] }}
                    >

                    </motion.img>
                    <motion.img
                        className='round'
                        src={require("./assets/f_"+parseInt(rand)+".png")} alt='img'
                        initial={{ 
                            width:"20vw" , 
                            height:"50vh"}}
                        animate={{
                            x:["80vw","27vw","23vw","23vw","23vw","23vw","23vw"], 
                            y:["30vh","30vh","30vh","30vh","30vh","30vh","-58vh"],
                            opacity:[1 , 1, 0.8, 0.8, 0, 0, 0]}}
                        transition={{ 
                            duration: 3.7,
                            delay:0.3,
                            times:[0, 0.135, 0.324, 0.459, 0.729 , 0.862, 1], 
                            easings: ["circIn","easeInOut", "linear","linear","linear","linear"] }}
                    >

                    </motion.img>
                    <motion.img
                        className='round_2'
                        src={require("./assets/i_"+parseInt(rand)+".png")} alt='img'
                        initial={{ 
                            width:"14vw" , 
                            height:"40vh"}}
                        animate={{
                            x:["3vw","3vw","3vw","3vw"], 
                            y:["20vh","20vh","20vh","-65vh"],
                            opacity:[0 , 1, 1, 1]}}
                        transition={{ 
                            duration: 2.5,
                            delay:1.5,
                            times:[0, 0.2, 0.8, 1], 
                            easings: ["linear","linear","linear"]
                            }}
                    >

                    </motion.img>

                </motion.div>  */}
                
                
                <div className='Page'>
                  
                  <Routes>
                    <Route path='/' element={<Header prop={vara} userEmail={userEmail} />}/>
                    <Route path='/Register' element={<Register signIn={signIn}/>} />
                    <Route path='/Register/:id' element={<Register signIn={signIn}/>} />
                    <Route path='/Login' element={<Login signIn={signIn}/>} />
                    <Route path='/Processing' element={<Processing userEmail={userEmail}/>}/>
                    <Route path='/Intrinsic_Technology' element={<Technology/>}/>
                    <Route path='/Process_Tutorials' element={<Tutorials/>} />
                    <Route path='/Intrinsic_Challenge' element={<Challenge/>}/>
                    <Route path='/Image_Submission' element={<Submission userEmail={userEmail} />} />
                    <Route path='/Web_Shop' element={<Web signedIn={signedIn} userEmail={userEmail} addOrder={addOrder}/>}/>
                    <Route path='/My_Profile' element={<MyProfil/>}/>
                    <Route path='/Checkout' element={<Checkout orders={orders} setOrders={setOrders} removeOrder={removeOrder}/>}/>
                    <Route path='/Orders' element={<Orders />} />
                    <Route path='/Admin' element={<Admin />} />
                    <Route path='/AdminSubbmissions' element={<AdminSubbmissions />} />
                    <Route path='/AdminOrders' element={<AdminOrders />} />
                    <Route path='/Applications' element = { <Applications />} />
                  </Routes>
                </div>

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

