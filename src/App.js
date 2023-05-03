import React from "react";
import ReactDOM from 'react-dom';
import { useState } from "react";
import logo from './logo.svg';
import './App.css';
import { useForm } from 'react-hook-form';
import bgImg from './2.png';
import Navbar from 'D:\\reactmat\\ui-try\\src\\components\\navbar\\navbar.jsx';
import Home from 'D:\\reactmat\\ui-try\\src\\components\\home\\home.jsx'
import Admin from 'D:\\reactmat\\ui-try\\src\\components\\admin\\admin.jsx';
import SignUp from './SignUp.js';
function App() {
  const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = data => console.log(data);
    const [Username, setUsername] = useState(" ");
    const [pass, setPass] = useState(" ");
    const [isShown, setIsShown] = useState(false);
    const [data , setData] = useState([{}]);
    const[isAdmin,setIsAdmin]=useState(false);
    const[isSignup,setIsSignup]=useState(false);
    const login=(event)=>{
      console.log("Button Clicked");
      
      fetch('/validate_password',{
        method : 'POST' ,
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body : new URLSearchParams({
          'setUsername' : Username,
          'setPass' : pass,
          
        })
      })
      .then(response => response.json())
      .then(data=>{setData(data)
      console.log(data)})
      .catch(error => console.error(error));
      
      if(data.UsernameFlag==='True' && data.PasswordFlag==='True'){
        
        setIsShown((current)=>true);
        console.log("Setting n to 1");
        if(data.UserName==="admin"){
          setIsAdmin((current)=>true);
        }
        
      }
    };
    const signup=(event)=>{
        setIsSignup((current)=>true);
    }
    if(isSignup){
      return(<div><SignUp/></div>)
    }

    if(isShown && isAdmin===false){
      return(
        <>
        <Navbar data={Username}/>
        <Home data={Username}/>
        
        </>
      );
    }
    else if(isShown && isAdmin){
      return(<>
      <Navbar data={Username}/>
      <Admin/>
      </>);
    }
    else{
  return (
    <div className='App'>
    <section>
    <div className="register">
        <div className="col-1">
            <h2>Log In</h2>
            <span>Register and enjoy the service</span>

            <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("username")} placeholder='username' onChange={(e)=>setUsername(e.target.value)}/>
                <input type="password" {...register("password")} placeholder='password' onChange={(e)=>setPass(e.target.value)}/>
                 <button  onClick={login} className='btn'>Log In</button> 
            </form>
            <h4>Create an account?</h4>
            <button onClick={signup} className='btn'>Sign Up</button> 
        </div>
        <div className="col-2">
            <img src={bgImg} alt="" />
        </div>
    </div>
</section>
</div>
  );}
}

export default App;
