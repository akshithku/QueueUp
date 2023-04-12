import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./body.css";
import { useAuth0 } from "@auth0/auth0-react";
// import  Search  from "../Assets/search.png";
// import { BsSearch } from 'react-icons/BsSearch';
// import { VscSearch } from "react-icons/vsc";
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
  fetch(`${process.env.REACT_APP_URL}/HosList`)
  

  
  
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
<input type="text" name="text" class="input" placeholder="Type here..."></input>
</div>

    {
     isAuthenticated && (
      <div>
     <h1 className="name_head">Hello {user?.name} !&#128591;
     </h1>
     </div>
     )
    }
    {/* <div>
    <button className="notifi-btn">
    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path d="M20 17h2v2H2v-2h2v-7a8 8 0 1 1 16 0v7zm-2 0v-7a6 6 0 1 0-12 0v7h12zm-9 4h6v2H9v-2z" fill="currentColor"></path>
    </svg>
</button>
    </div> */}
      <div className="app">
        {arrayUniqueHospitals.map((abd) => {
          return (
            <div className="mainContainer">
              <img className="image" src={abd.HospitalsImg} alt="" />
              <h1  className="name" key={abd.HospitalName}>
                {abd.HospitalName}
              </h1>
              <div className="Doc-link">
                <Link to={`/Doc/${abd._id}`} className="button" onChange={handlechange}>
                    view Doctor's
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

