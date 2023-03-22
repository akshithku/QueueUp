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
    const newLocal = "123456";
    if (username === "" && userId === "Akshith" && password === newLocal) {
      setIsAuthenticated(true);
      alert("Login successful!");
    } else {
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
    <div className="DocForm-div">
        <h1>Doctor's Login</h1>
      {isAuthenticated ? (
        <div>
          <h1>Welcome,Doctor!</h1>
          <Link to={'/DocInfo'}>
          <button >Let's Go</button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div className="label-1">
          <label>
            Hospital's Name:
            <input  type={"text"}
            value={username}
            onChange={(e)=> setUsername(e.target.value)}></input>
          </label>
          </div>
          <br/>
          <label>
            User ID:
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default DocForm;
