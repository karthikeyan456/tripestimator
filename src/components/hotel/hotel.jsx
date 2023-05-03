import React from 'react';
import './hotel.css';
import { useState } from "react";
import bg from '../../assets/2.mp4'
import {MdOutlineHotelClass} from 'react-icons/md'
import {IoFastFoodOutline} from 'react-icons/io5'
import {AiOutlineWifi} from 'react-icons/ai'
import Navbar  from 'D:\\reactmat\\ui-try\\src\\components\\navbar\\navbar.jsx';
import Food  from 'D:\\reactmat\\ui-try\\src\\components\\food\\food.jsx';
const Hotel = (props) =>{
   
  const [breakfast, setbf] = useState(" ");
  const [wifi, setwifi] = useState(" ");
  const [rat, setrating] = useState(" ");
  const[foodFlag,setfoodflag]=useState(false);
  const [data , setData] = useState([{}]);
  const gotoFood=()=>{
    if(breakfast==="Breakfast" || wifi==="Wi-fi" || rat==="Rating"){
      alert("Invalid Data");
    }
    else{
      fetch('/set_hotel',{
        method : 'POST' ,
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body : new URLSearchParams({
          'breakfast' : breakfast,
          'rating' : rat,
          'wifi' : wifi,
          
        })
      })
      .then(response => response.json())
      .then(data=>{setData(data)
      console.log(data)})
      .catch(error => console.error(error));
      
    }
    if(data.status==='True'){
      setfoodflag((current)=>true);
    }
    else{
      
    }
  }
  if(foodFlag){
    return(
      <>
      <Navbar data={props.data}/>
      <Food data={props.data}/>
      </>
    )
  }
 
  return(
    <section className='hotel'>
      <div className='overlay'>
      <video src={bg} muted autoPlay loop />
      </div>
      <div className='homeContent container'>
        <div className='textDiv'>
          
      
          <h1 className="homeTitle">
            Hotel Prediction
          </h1>
          <span className='smallText'>
            Explore the world
          </span>
        </div>
        <div className='cardDiv grid'>
        
        
          <div className='destinationInput'>
            <label htmlFor="city">Breakfast</label>
            <div className='input flex'>
               <select onChange={(e) => setbf(e.target.value)}>
                  <option value=" ">Breakfast</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
            <IoFastFoodOutline className="icon"/>
            </div>
          </div>
       
          <div className='destinationInput'>
            <label htmlFor="city">Wi-fi</label>
            <div className='input flex'>
             <select onChange={(b) => setwifi(b.target.value)}>
                  <option value="Wi-fi">Wi-fi</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
             </select>
            <AiOutlineWifi className="icon"/>
            </div>
          </div>

        

          <div className='destinationInput'>
            <label htmlFor="city">Rating</label>
            <div className='input flex'>
            <select onChange={(e) => setrating(e.target.value)}>
                  <option value=" "> Rating</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                  <option value="3">3</option>
                  <option value="3.5">3.5</option>
                  <option value="4">4</option>
                  <option value="4.5">4.5</option>

                </select>
                <MdOutlineHotelClass className="icon"/>
            </div>
          </div>

          
          
          


          
          <div className="next">
          <button className='btn' onClick={gotoFood}>
        
              NEXT
          </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hotel