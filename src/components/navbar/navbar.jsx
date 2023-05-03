import React ,{useState}from 'react';
import './navbar.css';
import {MdOutlineTravelExplore} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'
import {TbGridDots} from 'react-icons/tb'
import Signout from "D:\\reactmat\\ui-try\\src\\components\\signout\\signout.jsx"
import App from "D:\\reactmat\\ui-try\\src\\App.js"
import History from "D:\\reactmat\\ui-try\\src\\components\\history\\history.jsx"
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
const Navbar = (props) =>{
   const [active,setActive]=useState('navBar')
   const showNav=()=>{
    setActive('navBar activeNavbar')
   }
   const removeNav=()=>{
    setActive('navBar')
   }
   const [signoutf,setsignout]=useState(false);
   const [histf,sethist]=useState(false);
   const signoutb=()=>{
    setsignout((current)=>true);
   }
   const histb=()=>{
    sethist((current)=>true);
   }
   if(signoutf){
    window.location.reload(false);
    return(<><App/></>);
   }
   else if(histf){
    return(<><History/></>);
   }
   else{
  return(
    <section className='navBarSection' >
        <header className='header flex'>
            <div className='logoDiv'>
                <a href='#' className='logo flex'>
                    <h1><MdOutlineTravelExplore className="icon"/>Trip Estimator</h1>
                </a>

            </div>
            <div className='navBar'>
                <ul className="navLists flex">
             
                   
                    
                   
                    <li className="navItem">
                        <a href="#" className="navLink">Welcome, {props.data}</a>
                    </li>
                    
                    
                    <button className='btn'>
                        <a href=''>
                           HOME
                        </a>
                    </button>
                    <button className='btn' onClick={signoutb}>
                        <a href=''>
                            SIGN OUT
                        </a>
                    </button>
                </ul>
                
            </div>
            
        </header>

    </section>
  )}
}

export default Navbar