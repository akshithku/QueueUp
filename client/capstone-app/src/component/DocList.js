/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { useState, useEffect } from "react";
import "./Doc.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// import io from "socket.io-client";


export default function Doclist() {
  const { id } = useParams();
  const [timing, setTiming] = useState("");
  const [name, setName] = useState("");
  const [data, setdata] = useState([]);
  const [forHos, setForHos] = useState([]);
  const { isAuthenticated, user } = useAuth0();
  // const[DocCount,setDoccount]=useState([]);

  const handleClick = (e) => {
    localStorage.setItem("time", timing);
    localStorage.setItem("name", e.target.name);

    // if (!name) setName(abc.DoctorName)
    // console.log("uydfdiytyttr", user);
    //   const selectedDoc = data.filter(doc => doc.DoctorName === e.target.name)[0];
    // const docId = selectedDoc._id;

    // const bookingData = {
    //   doctorId: docId,
    //   timing: timing,
    //   userId: localStorage.getItem("user_id")
    // }

    localStorage.setItem("doctorId", id);
    // console.log('doctorId')
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  useEffect(() => {
    console.log("hospital", forHos);
  }, [forHos]);
  useEffect(() => {
    fetch(process.env.REACT_APP_URL + `/hospital/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setForHos(data);
        // setDoccount(data.Count)
      })
      .catch((error) => {
        console.log(" failed to fetch");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/User`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setdata(data);
      })
      .catch((error) => {
        console.log(error," failed to fetch");
      });
  }, []);

  // useEffect(()=>{
  //   fetch("http://localhost:2917/DocCount")
  //   .then((response)=>response.json())
  //   .then((data)=>{
  //     setDoccount(data.Count)
  //   })
  //   .catch((error)=>{
  //     console.log(error)
  //   })
  // })

  return (
    <div className="backgrounds">
      <main className="DocContainer">
        {data
          .filter((e) => e.HospitalName === forHos.HospitalName)
          .map((abc) => {
            console.log(abc);

            return (
              <div className="Docapp">
                <div className="Doc-token">
                  <h6 className="token">#Current Num:</h6>
                  {/* <p className="Token-Num">{localStorage.getItem("Num")}</p> */}
                  <p  className="Token-Num">{abc.Count}</p>
                </div>
                <div className="SubContainer">
                  <div className="img-div">
                    <img className="Doc-img" src={abc.Docimg} alt="" />
                  </div>
                  <div className="div-list">
                    <h1 className="lit">{abc.DoctorName}</h1>
                    <h2 className="lit-1">{abc.Specialty}</h2>
                    <h3 className="lit-2">{abc.timings}</h3>
                  </div>
                </div>
                <div className="SubContainer-1">
                  <div className="doc-lit">
                    <div className="slot-1">
                      <select
                        className="select-1"
                        // value={timing}
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
                        // value={timing}
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
                  {/* {`/pay/${abc._id}`} */}
                  {user ? (
                    <Link
                      to="/Pay"
                      className="btn1"
                      onClick={handleClick}
                      name={abc.DoctorName}
                    >
                      Book Now
                    </Link>
                  ) : (
                    <div >
                      <button onClick={toggleModal} className="btns-1">
                        Book Now
                      </button>
                    <div className="modal-1">
                      {modal && (
                        <div className="modal">
                          <div onClick={toggleModal} className="overlay"></div>
                          <div className="modal-content">
                            <h2 className="h2">Login is required</h2>
                            <div className="clos-btn">
                            <button className="close-modal" onClick={toggleModal}>
                              CLOSE
                            </button>
                            </div>
                          </div>
                        </div>
                      )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </main>
    </div>
  );
}
