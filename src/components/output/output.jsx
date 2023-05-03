import React, { useEffect } from 'react';
import './output.css';
import bg from '../../assets/2.mp4'

import { useState } from "react";

import {BsCurrencyRupee} from'react-icons/bs'
const Output = (props) =>{
  
  return(
    <section className='last'>
      <div className='overlay'>
      <video src={bg} muted autoPlay loop />
      </div>
    <div className='homeContent container'>
        <div className='textDiv'>
          
      
            <h1 className="homeTitle">
                Predictions
            </h1>
            <span className='smallText'>
                Explore the World
            </span>
        </div>

        <div className='cardDiv grid'>
            <div className='destinationInput'>
               <label htmlFor="city">Category</label>
            </div>
            <div className='destinationInput'>
               <label htmlFor="city">Predictions</label>
            </div>
            <div className='destinationInput'>
               <label htmlFor="city">Your Estimation</label>
            </div>
            <div className='destinationInput'>
               <label htmlFor="city">Airfare Up</label>
            </div>
            <div className='input flex'>
               <BsCurrencyRupee className="icon"/>
               <label htmlFor="city">{props.data.airupp} </label>
            </div>
            <div className='input flex'>
               <BsCurrencyRupee className="icon"/>
               <label htmlFor="city">{props.data.airup} </label>
            </div>
            <div className='destinationInput'>
               <label htmlFor="city">Airfare Down</label>
            </div>
            <div className='input flex'>
               <BsCurrencyRupee className="icon"/>
               <label htmlFor="city">{props.data.airdownp}</label>
            </div>
            <div className='input flex'>
               <BsCurrencyRupee className="icon"/>
               <label htmlFor="city">{props.data.airdown}</label>
            </div>
            <div className='destinationInput'>
               <label htmlFor="city">Hotel</label>
            </div>
            <div className='input flex'>
               <BsCurrencyRupee className="icon"/>
               <label htmlFor="city">{props.data.hotelp}</label>
            </div>
            <div className='input flex'>
               <BsCurrencyRupee className="icon"/>
               <label htmlFor="city">{props.data.hotel} </label>
            </div>
            <div className='destinationInput'>
               <label htmlFor="city">Food</label>
            </div>
            <div className='input flex'>
               <BsCurrencyRupee className="icon"/>
               <label htmlFor="city">{props.data.foodp}</label>
            </div>
            <div className='input flex'>
               <BsCurrencyRupee className="icon"/>
               <label htmlFor="city">{props.data.food}</label>
            </div>
            <div className='destinationInput'>
               <label htmlFor="city">Misellaneous</label>
            </div>
            <div className='input flex'>
               <BsCurrencyRupee className="icon"/>
               <label htmlFor="city">{props.data.miscp}</label>
            </div>
            <div className='input flex'>
               <BsCurrencyRupee className="icon"/>
               <label htmlFor="city">{props.data.misc}</label>
            </div>

         

         
            <div className="next">
            <p className='btn1'>
            
                Request submitted successfully!
            </p>
            </div>
        </div>
    </div>
        
    </section>
  )
}

export default Output;