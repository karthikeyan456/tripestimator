import React ,{useState,useEffect}from 'react';
import './history.css';
import Navbar  from 'D:\\reactmat\\ui-try\\src\\components\\navbar\\navbar.jsx';
import Home from "D:\\reactmat\\ui-try\\src\\components\\home\\home.jsx"
const History=(props)=>{
    const [data, setData] = useState([]);
    const [home, setHome] = useState(false);
    const n=props.data
    const gotohome=()=>{
      setHome((current)=>true);
    }
    const fetchData = () => {
      fetch(`/return_hist`,{
        method : 'POST' ,
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body : new URLSearchParams({
          'name' : n,
          
        })
      })
        .then((response) => response.json())
        .then((actualData) => {
          console.log(actualData);
          setData(actualData.res);
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
  
    useEffect(() => {
      fetchData();
    }, []);
    if(home){
      return(<><Navbar data={props.data}/>
                <Home data={props.data}/></>)
    }
    else{
  
    return (
      <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className='head'>
        <h4>Request History</h4>
        
        <br/>
        <br/>
        <br/>
        <a onClick={gotohome}>Go To Home Page</a>
        <br/>
        <br/>
        <br/>
        </div>
        <div className='table'>
        <table>
            <thead>
          <tr>
            <th>ID   </th>
    
            <th> Source  </th>
            <th>  Destination </th>
            <th>   Start Date </th>
            <th>   End Date </th>
            <th>  Airline </th>
            
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.src}</td>
              <td>{item.dest}</td>
              
              <td>{item.sd}</td>
              <td>{item.ed}</td>
              <td>{item.airline}</td>
              <td>{item.status}</td>
              
            </tr>
          ))}
          </tbody>
        </table>
        </div>
        </div>
    
    );
}}
export default History