import React,{useEffect, useState} from 'react' ;
import {  Route, Routes ,NavLink  } from 'react-router-dom';
import { motion} from "framer-motion";
import { getCookie, setCookie} from './utils/cookies';
import { Footer, Navbar,Header} from './Component';
import { Register, Login, Processing, Technology,Theory, Tutorials, Challenge, Submission,Web,MyProfil} from './Pages';
import './App.css'

const navigation=[
  {name: 'Home', href:'/' },
  {name: 'Intrinsic Technology', href:'/Intrinsic_Technology'},
  {name: 'Intrinsic Theory', href:'/Intrinsic_Theory'},
  {name: 'Process Tutorials', href:'/Process_Tutorials'},
  {name: 'Intrinsic Challenge', href:'/Intrinsic_Challenge'},
  {name: 'Image Processing', href:'/Processing'},
  {name: 'Web Shop', href:'/Web_Shop'},
];

const App = () => {

  const [sticky, setSticky]=useState(false);
  const [wid, setWid]=useState(true);
  const [vara,setVara]=useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

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
    console.log(_name);
    console.log(_email)
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


  return (
    <>
    <div className='App'>
        {wid && (
          <>
          <div className='App-second'>
             <div className='Up'>
                <nav className={`${sticky ? 'sticky' : '' }`}>
                  <Navbar  widChanger={setWid} signedIn={signedIn} userName={userName} signOut={signOut} />
                </nav>

                <motion.div 
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

                </motion.div> 
                
                
                <div className='Page'>
              
                  <Routes>
                    <Route path='/' element={<Header prop={vara} />}/>
                    <Route path='/Register' element={<Register/>} />
                    <Route path='/Login' element={<Login signIn={signIn}/>} />
                    <Route path='/Register' element={<Login/>}/>
                    <Route path='/Processing' element={<Processing/>}/>
                    <Route path='/Intrinsic_Technology' element={<Technology/>}/>
                    <Route path='/Intrinsic_Theory' element={<Theory/>}/>
                    <Route path='/Process_Tutorials' element={<Tutorials/>} />
                    <Route path='/Intrinsic_Challenge' element={<Challenge/>}/>
                    <Route path='/Image_Submission' element={<Submission/>} />
                    <Route path='/Web_Shop' element={<Web signedIn={signedIn} userEmail={userEmail}/>}/>
                    <Route path='/My_Profile' element={<MyProfil/>}/>
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

