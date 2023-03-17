import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./body.css";

// const imagedata = () => {
//   let arr = [
//     {
//       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqW5QgW2c6SqRa08mWDBgYegYrNaFGAEdC8JOX8Y80Xw&usqp=CAU&ec=48600112",
//       name: "abc",
//       Area: "1234",
//     },
//     {
//       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqW5QgW2c6SqRa08mWDBgYegYrNaFGAEdC8JOX8Y80Xw&usqp=CAU&ec=48600112",
//       name: "abc",
//       Area: "1234",
//     },
//     {
//       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqW5QgW2c6SqRa08mWDBgYegYrNaFGAEdC8JOX8Y80Xw&usqp=CAU&ec=48600112",
//       name: "abc",
//       Area: "1234",
//     },
//     {
//       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqW5QgW2c6SqRa08mWDBgYegYrNaFGAEdC8JOX8Y80Xw&usqp=CAU&ec=48600112",
//       name: "abc",
//       Area: "1234",
//     },
//     {
//       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqW5QgW2c6SqRa08mWDBgYegYrNaFGAEdC8JOX8Y80Xw&usqp=CAU&ec=48600112",
//       name: "abc",
//       Area: "1234",
//     },
//     {
//       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqW5QgW2c6SqRa08mWDBgYegYrNaFGAEdC8JOX8Y80Xw&usqp=CAU&ec=48600112",
//       name: "abc",
//       Area: "1234",
//     },
//   ];
//   return arr;
// };

export default function Datas() {
  // const DocClicked = () => {
  //   document.getElementById("Doc-link").checked = false;
  // };
const [Info,setInfo]=useState([])
const [HospitalName,setHospitalName]=useState("")
// const [GetData,setGetData]=useState([]);

useEffect(()=>{
  fetch("http://localhost:2917/Userdata")
  .then((response) => response.json())
  .then((res) => {
    // console.log(data);
    setInfo(res);
  })
  .catch((error) => {
    console.log(" failed to fetch");
  })
},[])

useEffect(()=>{
  fetch("http://localhost:2917/HosList")
  .then((res)=>{
    console.log(res)
  })

  // {
  //   method:"GET",
  //   body:JSON.stringify({
  //     setHospitalName(data)
  //   }),
  //   headers:{
  //     "Content-type":'application/json; charset=UTF-8'
  //   }
  // }
  
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    // setGetData(data);
  })
  .catch((error) => {
    console.log(" failed to listout");
  })
// eslint-disable-next-line react-hooks/exhaustive-deps
},[HospitalName]
)

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
        {Info.map((abd) => {
          return (
            <div className="mainContainer">
              <img className="image" src={abd.HospitalsImg} alt="" />
              <h1  className="name" key={abd.HospitalName}>
                {abd.HospitalName}
              </h1>
              <div className="Doc-link">
                <Link to="/Doc">
                  <button id="btn"  >
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

