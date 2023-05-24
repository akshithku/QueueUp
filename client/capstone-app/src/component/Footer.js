import React from "react";
import "./footer.css";
import logo from "../Assets/logo-3.png";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer" style={{borderTop:"5px solid black"}}>
    <footer style={{display:"flex", flexDirection:"column", marginTop:"", justifyContent:"center", alignItems:"center", backgroundColor:"#2d314b"}}>
      <div className="footer" style={{backgroundColor:"#2d314b",display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <div className="logo-footer" style={{width:"100%", backgroundColor:"#2d314b"}}>
        <div className="logo-text" style={{backgroundColor:"#2d314b",display:"flex",flexDirection:"row", justifyContent:"center", alignItems:"center", width:"100%", gap:"5vw"}}>
          <img className="logo" src={logo} alt=""  style={{backgroundColor:"#2d314b", width:"15%", marginTop:"2vmin", marginBottom:"2vh"}}/>
          <p style={{marginRight:"0%",width:"70%" ,textAlign:"center", marginTop:"3vh",fontSize:"large", color:"white", backgroundColor:"transparent"}}>
             QueueUp is a comprehensive queue management and appointment
              booking solution designed specifically for hospitals. Our platform
              aims to streamline the queue management process and enhance the
              overall patient experience.</p>
        </div>
      </div>
      <div className="logo-footer2" style={{width:"80%",backgroundColor:"#2d314b", display:"flex", justifyContent:"space-evenly", flexDirection:"column"}}>
        <div style={{display:"flex", flexDirection:"column", backgroundColor:"transparent", width:"100%"}}>
          <div className="options" style={{display:"flex", flexDirection:"row", marginTop:"2vh", marginLeft:"9%", width:"100"}}>
            <div className="link-div" style={{display:"flex", width:"100%"}}>
              <div style={{backgroundColor:"#2d314b",width:"50%", display:"flex",flexDirection:"column", alignItems:"left"}}>
                <h2 style={{backgroundColor:"transparent", textAlign:"left",marginBottom:"2%"}}><span style={{color:"#9BA4B5"}} className="links">Important Links</span></h2>
                <li style={{color:"white", backgroundColor:"transparent", marginBottom:".6vh"}}><Link className="links" to={"/"} onClick={() => window.scrollTo(0, 0)} style={{fontSize:"20px"}}>Home</Link></li>
                <li style={{color:"white", backgroundColor:"transparent", marginBottom:".6vh"}}><Link className="links" to={"/DocForm"} onClick={() => window.scrollTo(0, 0)} style={{fontSize:"20px"}}>Doctor</Link></li>
                <li style={{color:"white", backgroundColor:"transparent", marginBottom:".6vh"}}><Link className="links" to={"/guides"} onClick={() => window.scrollTo(0, 0)} style={{fontSize:"20px"}}>About</Link></li>
              </div>
              <div style={{backgroundColor:"#2d314b",width:"50%", display:"flex",flexDirection:"column", alignItems:"left"}}>
                <h2 style={{backgroundColor:"transparent", textAlign:"left",marginBottom:"2%"}}><span style={{color:"#9BA4B5"}} className="links">Policies and FAQ's</span></h2>
                <li style={{color:"white", backgroundColor:"transparent", marginBottom:".6vh"}}><Link className="links" to={"/termspage"} onClick={() => window.scrollTo(0, 0)} style={{fontSize:"20px"}}>T&C</Link></li>
                <li style={{color:"white", backgroundColor:"transparent", marginBottom:".6vh"}}><Link className="links" to={"/policy"} onClick={() => window.scrollTo(0, 0)} style={{fontSize:"20px"}}>Privacy Policy</Link></li>
              </div>
            </div>
            <div>
              <h1 className="sub-heading" style={{margin:"auto"}}><span style={{color:"#9BA4B5"}}>Socials,</span></h1>
              <div style={{display:"flex", justifyContent:"center", gap:"5vw", marginTop:"5%", backgroundColor:"#2d314b"}}>
                <Link to={"https://www.linkedin.com"} target="_blank">
                  <FaLinkedin className="login" style={{ backgroundColor: "#2d314b", color:"white" }} />
                </Link>
                <Link to={"https://www.instagram.com"}>
                  <FaInstagram className="login" style={{ backgroundColor: "#2d314b", color:"white" }} />
                </Link>
                <Link to={"https://twitter.com"}>
                  <FaTwitter className="login" style={{ backgroundColor: "#2d314b", color:"white" }} />
                </Link>
                <Link to={"https://twitter.com"}>
                  <FaGithub className="login" style={{ backgroundColor: "#2d314b", color:"white" }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <h2 style={{textAlign:"right", color:"rgb(241, 246, 249)", backgroundColor:"#2d314b",fontSize:"large", marginTop:"3%", marginBottom:"1%"}}>
        © CopyRight 2023 QueueUp
      </h2>
    </footer>
  </div>
  );
}

export default Footer;
