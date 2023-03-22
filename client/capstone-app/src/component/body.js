import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./body.css";


export default function Datas() {
 
// const [Info,setInfo]=useState([])
const [HospitalName,setHospitalName]=useState([])
// const [GetData,setGetData]=useState([]);

// useEffect(()=>{
//   fetch("http://localhost:2917/Userdata")
//   .then((response) => response.json())
//   .then((res) => {
//     // console.log(data);
//     // setInfo(res);
//   })
//   .catch((error) => {
//     console.log(" failed to fetch");
//   })
// },[])
useEffect(()=>{
  console.log(HospitalName)
},[HospitalName])
useEffect(()=>{
  fetch("http://localhost:2917/HosList")
  

  
  
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    setHospitalName(data);
  })
  .catch((error) => {
    console.log(" failed to listout:", error);
  })
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]
)

const arrayUniqueHospitals = [...new Map(HospitalName.map(item =>
  [item['HospitalName'], item])).values()];
// const unique = [...new Set(HospitalName.map(item => item.HospitalName))]; // [ 'A', 'B']
console.log("unique:", arrayUniqueHospitals)
function handlechange(e){
  setHospitalName(e);
}




  return (
    <main className="fullContainer">
      <div className="search-input">
        <input
          type="text"
          className="input-search"
          placeholder="Search...."
          id="search-input"
        />
      </div>
      <div className="app">
        {arrayUniqueHospitals.map((abd) => {
          return (
            <div className="mainContainer">
              <img className="image" src={abd.HospitalsImg} alt="" />
              <h1  className="name" key={abd.HospitalName}>
                {abd.HospitalName}
              </h1>
              <div className="Doc-link">
                <Link to={`/Doc/${abd._id}`}>
                  <button id="btn" onChange={handlechange} >
                    view Doctor's
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

