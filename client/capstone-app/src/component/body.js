import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./body.css";
import { useAuth0 } from "@auth0/auth0-react";
// import  Search  from "../Assets/search.png.png";

export default function Datas() {
 
// const [Info,setInfo]=useState([])
const [HospitalName,setHospitalName]=useState([])


const {isAuthenticated,user} =useAuth0();
console.log(user)


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

<div class="wrap">
   <div class="search">
      <input type="text" class="searchTerm" placeholder="What are you looking for?"/>
      {/* <button type="submit" class="searchButton">
      <i class="fa fa-search" aria-hidden="true"></i>
      {<Search/> }
     </button> */}
     <button type="submit" className="searchbutton" >
      <i class="fa fa-search" aria-hidden="true"></i>
     </button>
   </div>
</div>

    {
     isAuthenticated && (<h1 className="name_head">Hello {user?.name} !</h1>)
    }
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

