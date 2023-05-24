/* eslint-disable no-undef */
import React, { useState,useEffect } from "react";
import "./DocForm.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const DocForm = () => {

  const navigate=useNavigate()
  // const [username, setUsername] = useState("");
  const [UserEmail, setUserEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setdata] = useState([]);
 const [TheUser, setTheuser]=useState(null);
//  const [TheUserName, setTheuserName]=useState(null);


  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };
  // const handleNameChange = (event) => {
  //   setUsername(event.target.value);
  // };
  useEffect(() => {
    fetch(process.env.REACT_APP_URL+"/User")
      .then((response) => response.json())
      .then((data) => {
        console.log(data,"datas");
        setdata(data);
      })
      .catch((error) => {
        console.log(" failed to fetch"+ error);
      });
  }, []);

  const handleLogin = () => {
    // event.preventDefault();
    setTheuser(data?.filter((event)=> event?.email === UserEmail)[0])
    // setTheuserName(data?.filter((event)=> event?.HospitalName === username)[0])
    if(TheUser != null ){
      navigate("/DocInfo",{state:{TheUser:TheUser}});
      // setIsAuthenticated(true);
    }
    else{
      // setUserEmail("");
      // setIsAuthenticated(false);
    }
    // console.log(TheUser)
  };

  // console.log(handleLogin,"compared")

  // const handleLogout = () => {
  //   setIsAuthenticated(false);
  //   alert("Logged out!");
  // };

  
  return (
    <div className="DocForm-div">
      <h1 className="heading-1">Doctor's Login</h1>
      {/* {isAuthenticated ? (
        <div>
          <h1>Welcome,Doctor!</h1>
          <Link to={"/DocInfo"}>
            <button>Let's Go</button>
          </Link>
        </div> 
       ) : (  */}
        <div className="form" >
          <p className="form-title">Sign in to your account</p>
          <div className="input-container">
            <input placeholder="Enter hospital Name" type="name" />
            {/* {console.log(username)} */}
          </div>
          <div className="input-container">
            <input placeholder="Enter Email" type="email" value={UserEmail}  onChange={handleEmailChange}></input>
            {/* {console.log(TheUser)} */}
            <span>
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg>
            </span>
          </div>
          <div className="input-container">
            <input placeholder="Enter password" type="password" />
            <span>
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </span>
          </div>
          <button className="submit"   onClick={handleLogin}>
            Sign in
          </button>

          <p className="signup-link">
            No account?
            <Link to={"/DocRegi"}>Register</Link>
          </p>
        </div>
       {/* )} */}
    </div>
  );
};

export default DocForm;
