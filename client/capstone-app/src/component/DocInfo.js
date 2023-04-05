/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
// import { count } from "../../../../server/UserSchema";
import "./Doc.css";
import { Link } from "react-router-dom";

export default function DocInfo() {
  const { id } = useParams();
  // console.log(id)
  const [timing, setTiming] = useState("");
  const [name, setName] = useState("");
  const [data, setdata] = useState([]);
  // const[counts,setCounts]=useState('');
  const [counts, setCounts] = useState(0);
  const [docData, setDocData] = useState(data);

  const [Docbooked,setDocbooked]=useState([]);


  useEffect(()=>{
    console.log('hospital', Docbooked);
  },[Docbooked])

  useEffect(() => {
    fetch("http://localhost:2917/User")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setdata(data);
        setDocbooked(data);
        // setCounts(data.Count);
      })
      .catch((error) => {
        console.log(" failed to fetch");
      });
  }, [id]);

  

  // useEffect(() => {
  //   fetch("http://localhost:2917/slots")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setDocbooked(data);
  //     })
  //     .catch((error) => {
  //       console.log("failed to fetch");
  //     });
  // }, []);

  const arrayUniqueDoctor = [...new Map(Docbooked.map(item =>
    [item['HospitalName'], item])).values()];
  // const unique = [...new Set(HospitalName.map(item => item.HospitalName))]; // [ 'A', 'B']
  console.log("unique:", arrayUniqueDoctor)
  function handlechange(e){
    setDocbooked(e);
  }

  const UpdatCount = (e, count) => {
    console.log(e.target.id);
    fetch(`http://localhost:2917/update/${e.target.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        Count: count,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        // setdata((prevData)=>
        //   prevData.map((doc) =>
        //       doc._id === id ? { ...doc, Count: counts } : doc
        //     )
        //   );
      })
      .catch((error) => {
        console.log("Failed to update count");
      });

    // console.log(res)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  // filter(e=>e.id===bookedSlots.id)
  return (
    <main className="DocContainer">
      {data.map((abc, i) => {
        console.log(abc);
        return (
          <div className="Docapp" key={abc._id}>
            <div method="PUT" className="Doc-token">
              <h6 className="token">#Current Num:</h6>
              <p className="Token-Num">{abc.Count}</p>
              <div className="doc-btns">
                <button
                  className="doc-btn1"
                  id={abc._id}
                  onClick={(e) => {
                    setdata((prev) => {
                      let newData = [...prev];
                      console.log(newData);
                      newData[i].Count++;
                      UpdatCount(e, newData[i].Count);
                      return newData;
                    });
                  }}
                >
                  +
                </button>
                <button
                  id={abc._id}
                  onClick={(e) => {
                    setdata((prev) => {
                      let newData = [...prev];
                      newData[i].Count--;
                      UpdatCount(e, newData[i].Count);
                      return newData;
                    });
                  }}
                  className="doc-btn2"
                >
                  -
                </button>
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
              </div>
            </div>
            <div className="SubContainer-1">
              <div className="slot-1">
                <Link to={`/slots/${abc._id}`}>
                  <button id="btn1" onChange={handlechange}
                  >View Slots</button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
}
