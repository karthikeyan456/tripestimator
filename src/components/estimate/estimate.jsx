import React from 'react';
import './estimate.css';
import bg from '../../assets/2.mp4'
import {GrLocation} from 'react-icons/gr'
import {GiCommercialAirplane} from 'react-icons/gi'
import {MdOutlineAccessTimeFilled} from 'react-icons/md'
import {MdOutlineHotelClass} from 'react-icons/md'
import { useState } from "react";
import {IoFastFoodOutline} from 'react-icons/io5'
import {MdOutlineAllInclusive} from 'react-icons/md'
import Navbar from 'D:\\reactmat\\ui-try\\src\\components\\navbar\\navbar.jsx';
import Output from 'D:\\reactmat\\ui-try\\src\\components\\output\\output.jsx';

const Estimate = (props) =>{
  const [airfareup, setairfareup] = useState(" ");
  const [airfaredown, setairfaredown] = useState(" ");
  const [hotel, sethotel] = useState(" ");
  const [food, setfood] = useState(" ");
  const [mis, setmis] = useState(" ");
  const[gotofinal,setfinal]=useState(false);
  const [data , setData] = useState([{}]);
  const estimator=()=>{
    if(airfareup===" " || airfaredown===" " || hotel===' ' || food===' ' || mis===' '){
        alert("Invalid Data");
      }
    else{
        fetch('/estimator',{
            method : 'POST' ,
            headers : {
              'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body : new URLSearchParams({
              'airfareup':airfareup,
              'airfaredown':airfaredown,
              'hotel':hotel,
              'food':food,
              'misc':mis,
              
              
            })
          })
          .then(response => response.json())
          .then(data=>{setData(data)
          console.log(data)})
          .catch(error => console.error(error));
          if(data.status==='True'){
          setfinal((current)=>true);}
          else{
            
          }
          
        
    }
  }
  if(gotofinal){
    return(
    <>
    <Navbar data={props.data}/>
    <Output data={data}/>
    </>);
  }
  else{
  return(
    <section className='his'>
      <div className='overlay'>
      <video src={bg} muted autoPlay loop />
      </div>
    <div className='homeContent container'>
        <div className='textDiv'>
          
      
            <h1 className="homeTitle">
                Your Estimate
            </h1>
            <span className='smallText'>
                Enter and enjoy our services
            </span>
        </div>

        <div className='cardDiv grid'>
            <div className='destinationInput'>
               <label htmlFor="city">Airfare Up</label>
               <div className='input flex'>
               <input type='text' placeholder='Enter your estimate' onChange={(e)=>setairfareup(e.target.value)}/>
               <GiCommercialAirplane className="icon"/>
               </div>
            </div>
       
            <div className='destinationInput'>
                <label htmlFor="city">Airfare Down</label>
                <div className='input flex'>
                <input type='text' placeholder='Enter your estimate' onChange={(e)=>setairfaredown(e.target.value)}/>
                <GiCommercialAirplane className="icon"/>
                </div>
            </div>

        

            <div className='destinationInput'>
                <label htmlFor="city">Hotel(Per Day)</label>
                <div className='input flex'>
                <input type='text' placeholder='Enter your estimate' onChange={(e)=>sethotel(e.target.value)}/>
                    <MdOutlineHotelClass className="icon"/>
                </div>
            </div>

            <div className='destinationInput'>
                <label htmlFor="city">Food (Per Meal)</label>
                <div className='input flex'>
                <input type='text' placeholder='Enter your estimate' onChange={(e)=>setfood(e.target.value)}/>
                <IoFastFoodOutline className="icon"/>
                </div>
            </div>

            <div className='destinationInput'>
                <label htmlFor="city">Miscellaneous</label>
                <div className='input flex'>
                <input type='text' placeholder='Enter your estimate'onChange={(e)=>setmis(e.target.value)}/>
                <MdOutlineAllInclusive className="icon"/>
                </div>
            </div>
         

         
            <div className="next">
            <button className='btn' onClick={estimator}>
               
                ESTIMATE
            </button>
            </div>
        </div>
    </div>
        
    </section>
  )}
}

export default Estimate