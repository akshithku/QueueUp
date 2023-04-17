/* eslint-disable no-undef */
import React, { useState } from "react";
import "./DocForm.css"
import { Link } from "react-router-dom";
const DocForm = () => {
  const [username,setUsername]=useState("")
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
   
    if (username === "" && userId === "Akshith@gmail.com" && password === "1234567a") {
      setIsAuthenticated(false);
      alert("Login successful!");
    } 
    else {
      setIsAuthenticated(false);
      alert("Invalid credentials!");
    }

    setUsername("");
    setUserId("");
    setPassword("");
  };

  // const handleLogout = () => {
  //   setIsAuthenticated(true);
  //   alert("Logged out!");
  // };

  return (
    <div className="DocForm-div ">
        <h1>Doctor's Login</h1>
      {isAuthenticated ? (
        <div>
          <h1>Welcome,Doctor!</h1>
          <Link to={'/DocInfo'}>
          <button >Let's Go</button>
          </Link>
        </div>
      ) : (
    <form className="form" onSubmit={handleLogin}>
       <p className="form-title">Sign in to your account</p>
       <div className="input-container">
        <input placeholder="Enter hospital Name" type="email"/>
        
        </div>
        <div className="input-container">
        <input placeholder="Enter Email" type="email"/>
        <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
            </svg>
          </span>
        </div>
        <div className="input-container">
        <input placeholder="Enter password" type="password"/>
        <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            </svg>
          </span>
        </div>
         <button className="submit" type="submit">
        Sign in
      </button>

      <p className="signup-link">
        No account?
        <Link to={"/DocRegi"}>Register</Link>
      </p>
   </form>
      )}
    </div>
  );
};

export default DocForm;
