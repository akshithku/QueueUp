import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./body.css";
import { useAuth0 } from "@auth0/auth0-react";
// import  Search  from "../Assets/search.png";
// import { BsSearch } from 'react-icons/BsSearch';
// import { VscSearch } from "react-icons/vsc";
// import Background from '../Assets/background.webp'
import { motion } from "framer-motion";
// import { Transition } from "react-transition-group";

export default function Datas() {
  // const [Info,setInfo]=useState([])
  const [HospitalName, setHospitalName] = useState([]);
  const { isAuthenticated, user } = useAuth0();
  console.log(user);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // const [isActive, setIsActive] = React.useState(false);

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

  useEffect(() => {
    console.log(HospitalName);
  }, [HospitalName]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/HosList`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setHospitalName(data);
      })
      .catch((error) => {
        console.log(" failed to listout:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  const arrayUniqueHospitals = [
    ...new Map(
      HospitalName.map((item) => [item["HospitalName"], item])
    ).values(),
  ];
  console.log("unique:", arrayUniqueHospitals);
  function handlechange(e) {
    setHospitalName(e);
  }

  const filteredHospitals = arrayUniqueHospitals.filter((hospital) =>
    hospital.HospitalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="fullContainer">
      {/* <img src={Background} alt='#'className='background'/> */}
      {isLoading ? (
        <div className="loading">
          <div className="header">Loading</div>
          <div class="loader">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </div>
      ) : (
        <>
          <div class="wrap">
            <input
              type="text"
              name="text"
              class="input"
              placeholder="Type here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            ></input>
          </div>

          {isAuthenticated && (
            <div>
              <h1 className="name_head">Hello {user?.name} !&#128591;</h1>
            </div>
          )}
          {filteredHospitals.length === 0 ? (
            <h1 className="header-2">Sorry!! No such Hospital</h1>
          ) : (
            <div className="app">
              {filteredHospitals.map((abd) => {
                return (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="mainContainer">
                      <img className="image" src={abd.HospitalsImg} alt="" />
                      <h1 className="name" key={abd.HospitalName}>
                        {abd.HospitalName}
                      </h1>
                      <div className="Doc-link">
                        <Link
                          to={`/Doc/${abd._id}`}
                          className="button"
                          onChange={handlechange}
                        >
                          view Doctor's
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </>
      )}
    </main>
  );
}
