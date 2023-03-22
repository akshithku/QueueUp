/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
// import { count } from "../../../../server/UserSchema";
import "./Doc.css";
// import { Link } from "react-router-dom";s

export default function DocInfo() {
  const {id} = useParams()
  // console.log(id)
  const [timing, setTiming] = useState("");
  const [name, setName] = useState("");
  const[data,setdata] = useState([]);
  // const[counts,setCounts]=useState('');
  const[counts,setCounts]=useState(0);
  const [docData,setDocData]=useState(data)
  // const [num, setNum] = useState(0);
  // value={num} onChange={(event)=>setNum(event.target.value)}
  
  // useEffect(()=>{
  //   localStorage.setItem("Num", num);
  // },)
    
  useEffect(()=>{
    fetch("http://localhost:2917/User")
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setdata(data);
          // setCounts(data.Count);
        })
        .catch((error) => {
          console.log(" failed to fetch");
        })
  },[id])
  // /update/:id
const UpdatCount= (e,count)=>{
  console.log(e.target.id)
   fetch(`http://localhost:2917/update/${e.target.id}`,{
      method:"PUT",
      headers:{
        "Content-type":'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        "Count":count,
      }),
      
    })
    .then(res=>res.json())
    .then((json)=>{
      // console.log(json);
      // setdata((prevData)=>
      //   prevData.map((doc) =>
      //       doc._id === id ? { ...doc, Count: counts } : doc
      //     )
      //   );
    })
    .catch((error)=>{
      console.log("Failed to update count")
    });
     
      // console.log(res)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  return (
    <main className="DocContainer">
      {/* <div>
      {props.imagedata.map((abd)=>{
          return <img src={abd.img} alt=""/>
        })}
      </div> */}
      {data.map((abc,i) => {
        // console.log(abc);
        return (
          <div className="Docapp" key={abc._id}>
            <div method="PUT" className="Doc-token">
              <h6 className="token">#Current Num:</h6>
              <p className="Token-Num">{abc.Count}</p>
              <div className="doc-btns">
                <button className="doc-btn1"
                id={abc._id} 
                 onClick={(e) => {setdata(prev=>{
                  let newData=[...prev]
                  console.log(newData)
                  newData[i].Count++;
                  UpdatCount(e,newData[i].Count);
                  return newData;
                 }); }}>+</button>
                <button
               id={abc._id} 
               onClick={(e) => {setdata(prev=>{
                let newData=[...prev]
                newData[i].Count--;
                UpdatCount(e,newData[i].Count);
                return newData
               }); }}
                 className="doc-btn2" >-</button>
              </div>
              {console.log(counts)}
            </div>
            <div className="SubContainer">
              <div className="img-div">
                <img className="Doc-img" src={abc.Docimg} alt="" />
              </div>
              <div className="div-list">
                <h1
                  className="lit"
                  value={name}
                  onChange={(abd) => setName(abd.target.value)}
                >
                  {abc.DoctorName}
                </h1>
                <h2 className="lit-1">{abc.Specialty}</h2>
                <h3 className="lit-2">{abc.timings}</h3>
                {/* <button onClick={UpdatCount}>Save</button> */}
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
