import React from "react";
import './App.css';
import { set, useForm } from 'react-hook-form';
import {useState} from "react";
import bgImg from './2.png';
import App from './App.js';
function SignUp(){
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = data => console.log(data);
    const [Username, setUsername] = useState(" ");
    const [pass, setPass] = useState(" ");
    const[cpass,setCpass]=useState(" ");
    const[mob,setmob]=useState(" ");
    const[signupstatus,setSignupstatus]=useState(false);
    const [data , setData] = useState([{}]);
    // console.log(watch('username'));
    const[gotologin,setGotologin]=useState(false);
    const backtologin=(event)=>{
        setGotologin((current)=>true);
        
    }
    const addUser=(event)=>{
        if(pass!==cpass){
            alert("Bad Credentials");
        }
        if(mob.length!==10){
            alert("Bad Credentials");
        }
        if(Username.length===0){
            alert("Bad Credentials");
        }
        if(pass===cpass && mob.length===10 && Username.length!==0){
            fetch('/add_user',{
                method : 'POST' ,
                headers : {
                  'Content-Type' : 'application/x-www-form-urlencoded'
                },
                body : new URLSearchParams({
                  'Username' : Username,
                  'Pass' : pass,
                  'mobile':mob,
                  
                })
              })
              .then(response => response.json())
              .then(data=>{setData(data)
              console.log(data)})
              .catch(error => console.error(error));
        }
        if(data.Found==='True'){
            alert("User already found");
        }
        if(data.Inserted==='True'){
            alert("Sign Up Successful!Visit Login Page to Start Using the Trip Estimator");
        }

    }
  if(gotologin){
    return (<div><App/></div>);
  }
  else{
  return (
    <div className="App">
    <section>
        <div className="register">
            <div className="col-1">
                <h2>Sign Up</h2>
                <span>register and enjoy the service</span>

                <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("username")} placeholder='username' onChange={(e)=>setUsername(e.target.value)}/>
                    <input type="password" {...register("password")} placeholder='password' onChange={(e)=>setPass(e.target.value)} />
                    <input type="password" {...register("confirmpwd")} placeholder='confirm password'onChange={(e)=>setCpass(e.target.value)} />
                    <input type="text" {...register("mobile", { required : true, maxLength: 10 })} placeholder='mobile number'onChange={(e)=>setmob(e.target.value)} />
                    {errors.mobile?.type === "required" && "Mobile Number is required"}
                    {errors.mobile?.type === "maxLength" && "Max Length Exceed"}
                    { <button className='btn' onClick={addUser}> Sign Up</button> }
                </form>
                <h4>Already have an account?</h4>
                <button onClick={backtologin}  className="btn">Log In</button>
            </div>
            <div className="col-2">
                <img src={bgImg} alt="" />
            </div>
        </div>
    </section>
    </div>
  );}
}
export default SignUp;