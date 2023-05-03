import React from 'react';
import './food.css';
import { useState } from "react";
import bg from '../../assets/2.mp4'
import {MdOutlineHotelClass} from 'react-icons/md'
import {IoFastFoodOutline} from 'react-icons/io5'
import Navbar  from 'D:\\reactmat\\ui-try\\src\\components\\navbar\\navbar.jsx';
import Estimate  from 'D:\\reactmat\\ui-try\\src\\components\\estimate\\estimate.jsx';

const Food = (props) =>{
  const [cuisines, setcus] = useState(" ");
  const [rating, setrat] = useState(" ");
  const[gotopredictor,setgotopred]=useState(false);
  const [data , setData] = useState([{}]);
  const predictorpage=()=>{
    if(cuisines==="Cuisines" || rating==="Rating"){
      alert("Invalid Data");
    }
    else{
      fetch('/set_food',{
        method : 'POST' ,
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body : new URLSearchParams({
          'cuisine' : cuisines,
          'rating' : rating,
          
          
        })
      })
      .then(response => response.json())
      .then(data=>{setData(data)
      console.log(data)})
      .catch(error => console.error(error));
      if(data.status==='True'){
        setgotopred((current)=>true);
      }
      else{

      }
      
    }
  }
  if(gotopredictor){
    return(<><Navbar data={props.data}/>
    <Estimate data={props.data}/></>);
  }
  else{
  return(
    <section className='food'>
      <div className='overlay'>
      <video src={bg} muted autoPlay loop />
      </div>
      <div className='homeContent container'>
        <div className='textDiv'>
          
      
          <h1 className="homeTitle">
            Food Prediction
          </h1>
          <span className='smallText'>
            Explore the world
          </span>
        </div>
        <div className='cardDiv grid'>
        
        
          <div className='destinationInput'>
            <label htmlFor="city">Cuisines</label>
            <div className='input flex'>
               <select onChange={(e) => setcus(e.target.value)}>
                  <option value=" ">Cuisines</option>
                  <option value="North Indian">North Indian</option>
                  <option value="South Indian">South Indian</option>
                  <option value="Others">Others</option>
                </select>
            <IoFastFoodOutline className="icon"/>
            </div>
          </div>
       
          <div className='destinationInput'>
            <label htmlFor="city">Rating</label>
            <div className='input flex'>
            <select onChange={(e) => setrat(e.target.value)}>
                  <option value=" "> Rating</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Very Good">Very Good</option>
                  <option value="Good">Good</option>
                  

                </select>
                <MdOutlineHotelClass className="icon"/>
            </div>
          </div>

          
          <div className="next">
          <button className='btn' onClick={predictorpage}>
                          NEXT
          </button>
          </div>
        </div>
      </div>
    </section>
    
  )
  }
}

export default Food