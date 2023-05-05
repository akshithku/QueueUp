import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./body.css";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "react-modal";
// import  Search  from "../Assets/search.png";
// import { BsSearch } from 'react-icons/BsSearch';
// import { VscSearch } from "react-icons/vsc";
// import Background from '../Assets/background.webp'
import { motion } from "framer-motion";
// import { Transition } from "react-transition-group";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export default function Datas() {
  // const [Info,setInfo]=useState([])
  const { id } = useParams();
  const [HospitalName, setHospitalName] = useState([]);
  const { isAuthenticated, user } = useAuth0();
  console.log(user);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [docBooked, setdocBooked] = useState([]);


  // const [isActive, setIsActive] = React.useState(false);

  // const [GetData,setGetData]=useState([]);

  useEffect(() => {
    console.log(docBooked,"BookedSlots");
  }, [docBooked]);

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_URL}/docBookSlots`)
    .then((response) => response.json())
    .then((res) => {
      console.log(id)
      setdocBooked(res)
    })
    .catch((error) => {
      console.log(error," failed to fetch");
    })
  },[id])

  useEffect(() => {
    console.log(HospitalName);
  }, [HospitalName]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/HosList`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data,"datas");
        setHospitalName(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(" failed to listout:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 5000);
  // }, []);


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
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            ></input>
          </div>

          {isAuthenticated && (
            <div className="user-data">
              <h1 className="name_head">Hello {user?.name} !</h1>
              <div className="icon-div">
              <NotificationsActiveIcon className="icon"  width='50' active={true} animate={true} onClick={() => setModalIsOpen(true)} />
              </div>
              <Modal
              className="popup-1"
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              >
                {
                  <table>
                  <thead>
                    <tr>
                <th className="headers-1">Name</th>
                <br></br>
                <th className="headers-1">DoctorName</th>
                <br></br>
                <th className="headers-1">Timings</th>
                <br></br>
                <th className="headers-1" >Amount</th>
                </tr>
                </thead>
                <tbody>
                {
                  docBooked.filter((booking) => booking.UserEmail === user.email)
                  .map((slot)=>(
                    <tr>
                      <td className="comtent-1">{slot.Name}</td>
                      <br></br>
                      <td className="comtent-1">{slot.DoctorName}</td>
                      <br></br>
                      <td className="comtent-1">{slot.timings}</td>
                      <br></br>
                      <td className="comtent-1">{slot.Amount}</td>
                    </tr>
                  ))
                }
                </tbody>
                </table>
                }
              </Modal>
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
