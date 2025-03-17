import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import "./body.css";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "react-modal";
// import  Search  from "../Assets/search.png";
// import { BsSearch } from 'react-icons/BsSearch';
// import { VscSearch } from "react-icons/vsc";
import { motion } from "framer-motion";
// import { Transition } from "react-transition-group";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export default function Datas() {
  // const [Info,setInfo]=useState([])
  let user1
  const { user,isAuthenticated } =  useAuth0();
  // const { id } = useParams();
  const [HospitalName, setHospitalName] = useState([]);
  if(user){
user1=user
  }
  console.log("user",user1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [docBooked, setdocBooked] = useState([]);
  


    const handleClickNotify = () => {
      fetch(`${process.env.REACT_APP_URL}/docBookSlots`)
        .then((response) => response.json())
        .then((data) => {
          const userBookedSlots = data.filter((slot) => slot.UserEmail === user.email);
          userBookedSlots.sort((a, b) => {
            const doctorNameComparison = a.DoctorName.localeCompare(b.DoctorName);
            if (doctorNameComparison !== 0) {
              return doctorNameComparison;
            }
            const timingsComparison = a.timings.localeCompare(b.timings);
            if (timingsComparison !== 0) {
              return timingsComparison;
            }
            return a.Name.localeCompare(b.Name);
          });
          setdocBooked(userBookedSlots);
          console.log("Updated docBooked:", userBookedSlots);
        })
        .catch((error) => {
          console.log(error, " failed to fetch");
        });
    };

  useEffect(() => {
    console.log(HospitalName);
  }, [HospitalName]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/hosList`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data,"datas");
        setHospitalName(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(" failed to listout:", error);
      });
  }, []);


  const handleNotificationsClick = async() => {
    await handleClickNotify();
    setModalIsOpen(true);
  };
  

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
    (hospital.HospitalName.toLowerCase().includes(searchQuery.toLowerCase())  && hospital.HospitalName.toLowerCase().startsWith(searchQuery.toLowerCase()) )
    ||  (hospital.City.toLowerCase().includes(searchQuery.toLowerCase()) && hospital.City.toLowerCase().startsWith(searchQuery.toLowerCase()) )
  );

  // const filteredHospitals = arrayUniqueHospitals.filter((hospital) => {
  //   const searchLower = searchQuery.toLowerCase();
  //   return (
  //     (hospital.HospitalName && hospital.HospitalName.toUpperCase().includes(searchLower) && hospital.HospitalName.toUpperCase().startsWith(searchLower)) ||
  //     (hospital.City && hospital.City.toUpperCase().includes(searchLower) && hospital.City.toUpperCase().startsWith(searchLower))
  //   );
  // });
  

   
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
            {/* {Array.isArray(suggestions) && suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion}>{suggestion.City}</li>
          ))}
        </ul>
      )} */}
          </div>
          {isAuthenticated && (
            <div className="user-data">
              <h1 className="name_head">Hello {user?.name} !</h1>
              <div className="icon-div">
              <NotificationsActiveIcon className="icon"  width='50' active={true} animate={true} onClick={()=>handleNotificationsClick()} />
              </div>
              <Modal
              className="popup-1"
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              >
                {docBooked.length === 0 ? (
  <h1 className="header-2">No booked slots found</h1>
) : (
                  <table className="table">
                  <thead>
                    <tr>
                <th className="headers-1">Name</th>
                <br></br>
                <th className="headers-1">DoctorName</th>
                <br></br>
                <th className="headers-1">Timings</th>
                {/* <br></br>
                <th className="headers-1" >Amount</th> */}
                </tr>
                </thead>
                <tbody>
                {
                  docBooked
                  .filter((booking) => booking.UserEmail === user.email)
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
                )}
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
