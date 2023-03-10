/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useState } from "react";
import "./Doc.css";
// import { Link } from "react-router-dom";
function Docdata() {
  let data = [
    {
      Dcoimg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6oT9DZBnkbcGnMMQyARlpIPHFbuxeGihowVuI-8V_RA&usqp=CAU&ec=48600112",
      name: "qwertyu",
      specialist: "Cardiologist",
      timings: "9:00 am to 12:30 pm",
      count:0
    },
    {
      Dcoimg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6oT9DZBnkbcGnMMQyARlpIPHFbuxeGihowVuI-8V_RA&usqp=CAU&ec=48600112",
      name: "asdfghj",
      specialist: "Cardiologist",
      timings: "9:00 am to 12:30 pm",
      count:0
    },
    {
      Dcoimg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6oT9DZBnkbcGnMMQyARlpIPHFbuxeGihowVuI-8V_RA&usqp=CAU&ec=48600112",
      name: "asdfghjk",
      specialist: "Cardiologist",
      timings: "9:00 am to 12:30 pm",
      count:0
    },
    {
      Dcoimg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6oT9DZBnkbcGnMMQyARlpIPHFbuxeGihowVuI-8V_RA&usqp=CAU&ec=48600112",
      name: "qazxsde",
      specialist: "Cardiologist",
      timings: "9:00 am to 12:30 pm",
      count:0
    },
    {
      Dcoimg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6oT9DZBnkbcGnMMQyARlpIPHFbuxeGihowVuI-8V_RA&usqp=CAU&ec=48600112",
      name: "plkmnjhy",
      specialist: "Cardiologist",
      timings: "9:00 am to 12:30 pm",
      count:0
    },
    {
      Dcoimg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6oT9DZBnkbcGnMMQyARlpIPHFbuxeGihowVuI-8V_RA&usqp=CAU&ec=48600112",
      name: "vcdfrgthnbvf",
      specialist: "Cardiologist",
      timings: "9:00 am to 12:30 pm",
      count:0
    },
  ];
  return data;
}
export default function Doclist() {
  const [timing, setTiming] = useState("");
  const [name, setName] = useState("");
  const [docData,setDocData]=useState(Docdata())
  const [num, setNum] = useState(0);
  
  useEffect(()=>{
    localStorage.setItem("Num", num);
  },)
    
  
  return (
    <main className="DocContainer">
      {/* <div>
      {props.imagedata.map((abd)=>{
          return <img src={abd.img} alt=""/>
        })}
      </div> */}
      {docData.map((abc) => {
        console.log(abc);
        return (
          <div className="Docapp">
            <div className="Doc-token">
              <h6 className="token">#Current Num:</h6>
              <p className="Token-Num" value={num} onChange={(event)=>setNum(event.target.value)}>{abc.count}</p>
              <div className="doc-btns">
                <button className="doc-btn1"
                 onClick={() => {
                  abc.count=abc.count+1;
                  setDocData([...docData,docData.count=abc.count+1])
                }}>+</button>
                <button className="doc-btn2"  onClick={() => {abc.count=abc.count-1;
                  setDocData([...docData,docData.count=abc.count-1])}}>-</button>
              </div>
            </div>
            <div className="SubContainer">
              <div className="img-div">
                <img className="Doc-img" src={abc.Dcoimg} alt="" />
              </div>
              <div className="div-list">
                <h1
                  className="lit"
                  value={name}
                  onChange={(abd) => setName(abd.target.value)}
                >
                  {abc.name}
                </h1>
                <h2 className="lit-1">{abc.specialist}</h2>
                <h3 className="lit-2">{abc.timings}</h3>
              </div>
            </div>
            <div className="SubContainer-1">
              <div className="doc-lit">
                <div className="slot-1">
                  <select
                    className="select-1"
                    value={timing}
                    onChange={(event) => setTiming(event.target.value)}
                  >
                    <option className="mrng" value="Morning">
                      Morning
                    </option>
                    <option>1| 9.30 Am to 10.30Am </option>
                    <option>2| 10.30 Am to 11.00Am</option>
                    <option>3| 11.00 Am to 11.30Am</option>
                    <option>4| 11.30 Am to 12.00pm </option>
                    <option>5| 12.00 pm to 12.30pm </option>
                  </select>
                </div>
                <div className="slot-2">
                  <select
                    className="select-1"
                    value={timing}
                    onChange={(Event) => setTiming(Event.target.value)}
                  >
                    <option value="Afternoon">Afternoon</option>
                    <option>1| 1.30Pm to 2.00Pm </option>
                    <option>2| 2.00Pm to 2.30Pm </option>
                    <option>3| 2.30Pm to 3.00Pm </option>
                    <option>4| 3.00Pm to 3.30Pm </option>
                    <option>5| 3.30Pm to 4.00Pm </option>
                  </select>
                </div>
              </div>
              {/* <Link to="/Pay">
                <button id="btn1" onClick={handleClick}>
                  Book Now
                </button>
              </Link> */}
            </div>
          </div>
        );
      })}
    </main>
  );
}
