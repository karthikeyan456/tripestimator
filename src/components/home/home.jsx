import React from 'react';
import './home.css';
import bg from '../../assets/2.mp4'
import {GrLocation} from 'react-icons/gr'
import {GiCommercialAirplane} from 'react-icons/gi'
import {MdOutlineAccessTimeFilled} from 'react-icons/md'
import {MdOutlineHotelClass} from 'react-icons/md'
import { useState } from "react";
import Hotel from 'D:\\reactmat\\ui-try\\src\\components\\hotel\\hotel.jsx'
import Navbar  from 'D:\\reactmat\\ui-try\\src\\components\\navbar\\navbar.jsx';
import History from "D:\\reactmat\\ui-try\\src\\components\\history\\history.jsx"
const Home = (props) =>{
  const [src, setSrc] = useState(" ");
  const [dest, setDest] = useState(" ");
  const [airlines, setairlines] = useState(" ");
  const [departure, setdeparture] = useState(" ");
  const [sd, setsd] = useState(" ");
  const [ed, seted] = useState(" ");
  const [clas , setclas] = useState(" ");
  const[hotelflag,sethotelflag]=useState(false);
  const[histflag,sethistflag]=useState(false);
  const [data , setData] = useState([{}]);
  const gotohist=()=>{
    sethistflag((current)=>true);
  }
  const gotohotel=()=>{
    if(src==="Source City" || dest==="Destination City" || airlines==="Airlines" || departure==="Departure Time"|| sd==="dd-mm-yyyy" || ed==="dd-mm-yyyy" || clas==="Class"){
      alert("Invalid Data");
    }
    else if(src===dest){
      alert("Invalid Data.");
    }
    else{
      fetch('/set_air',{
        method : 'POST' ,
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body : new URLSearchParams({
          'src' : src,
          'dest' : dest,
          'airlines' : airlines,
          'departure' : departure ,
          'sd' : sd,
          'ed' : ed,
          'clas' : clas,
        })
      })
      .then(response => response.json())
      .then(data=>{setData(data)
      console.log(data)})
      .catch(error => console.error(error));
      if(data.status==='True'){
        sethotelflag((current)=>true);
      }
      else{
        //alert("Error has occured");
      }
      
    }
  }
  if(histflag){
    return(
    <>
    <Navbar data={props.data}/>
    <History data={props.data}/></>);
  }
  if(hotelflag){
    return(
    <>
    <Navbar data={props.data}/>
    <Hotel data={props.data}/>
    </>);
  }
  else{
  return(
    <section className='home'>
      <div className='overlay'>
      <video src={bg} muted autoPlay loop />
      </div>
      <div className='homeContent container'>
        
        <div className='btdiv'>
        
          <a onClick={gotohist} className='btn'>
              
              Check Approval Status
          </a>
        </div>
      <div className='textDiv'>
          <h1 className="homeTitle">
            Airfare Prediction
          </h1>
          <span className='smallText'>
            Explore the world
          </span>
         
        </div>
        <div className='cardDiv grid'>
          <div className='destinationInput'>
            <label htmlFor="city">Source City</label>
            <div className='input flex'>
               <select onChange={(e) => setSrc(e.target.value)}>
                  <option value=" "> Source City</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
            <GrLocation className="icon"/>
            </div>
          </div>
       
          <div className='destinationInput'>
            <label htmlFor="city">Destination City</label>
            <div className='input flex'>
             <select onChange={(b) => setDest(b.target.value)}>
                  <option value="Destination_City"> Destination City</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Hyderabad">Hyderabad</option>
             </select>
            <GrLocation className="icon"/>
            </div>
          </div>

        

          <div className='destinationInput'>
            <label htmlFor="city">Airlines</label>
            <div className='input flex'>
            <select onChange={(e) => setairlines(e.target.value)}>
                  <option value=" "> Airlines</option>
                  <option value="AirAsia">Air Asia</option>
                  <option value="Air_India">Air India</option>
                  <option value="Go_First">Go First</option>
                  <option value="SpiceJet">Spice Jet</option>
                  <option value="Indigo">Indigo</option>
                  <option value="Vistara">Vistara</option>

                </select>
                <GiCommercialAirplane className="icon"></GiCommercialAirplane>
            </div>
          </div>

          <div className='destinationInput'>
            <label htmlFor="city">Departure Time</label>
            <div className='input flex'>
            <select onChange={(e) => setdeparture(e.target.value)}>
                  <option value="Departure Time"> Departure Time</option>
                  <option value="Early_Morning">Early Morning</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                  <option value="Late_Night">Late Night</option>
                </select>
            <MdOutlineAccessTimeFilled className="icon"/>
            </div>
          </div>

          
          <div className='dateInput'>
            <label htmlFor="date">Start date</label>
            <div className='input flex'>
              <input type='date' onChange = {(e) => setsd (e.target.value)}/>
            </div>
          </div> 
          <div className='dateInput'>
            <label htmlFor="date">End date</label>
            <div className='input flex'onChange = {(e) => seted (e.target.value)}>
              <input type='date'/>
            </div>
          </div> 

          <div className='destinationInput'>
            <label htmlFor="city">Class</label>
            <div className='input flex'>
            <select onChange={(e) => setclas(e.target.value)}>
                  <option value=" "> Class</option>
                  <option value="Business">Business</option>
                  <option value="Economy">Economy</option>
                 
                </select>
            <MdOutlineHotelClass className="icon"/>
            </div>
          </div>
          <div className="next">
          <button className='btn'onClick={gotohotel}>
            
              NEXT
          </button>
          </div>
          
        </div>
        
      </div>
      
    </section>
  )
}

}

export default Home;