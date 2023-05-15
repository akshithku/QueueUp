import React from 'react';
import "./footer.css";
import logo from "../Assets/logo-2.png";
import FaceBook from "../Assets/facebook.icon.svg";
import InstaIcon1 from "../Assets/insta.icon2.svg";
import linkedinIcon from "../Assets/linkedin.icon.svg";
import githubIcon from "../Assets/github.icon.svg";


function Footer() {
    return (
      <footer className='footer'>
        <div className='footer-container'>
        <div className='footer-logo'>
          <img className='logo-1' src={logo} alt="log"/>
        </div>
        <small className="ms-2">&copy; QueueUp, 2023. All rights reserved.</small>
        <div className="social-icons">
        <div className='icon-1'>
        <a href="https://github.com/akshithku">
          <img className="github.icon" src={githubIcon} alt="instagram" />
        </a>
        </div>
        <div >
        <a href="https://www.linkedin.com/in/akshith-kumar-94aa5b24b/">
          <img className="linkedin.icon" src={linkedinIcon} alt="instagram" />
        </a>
        </div>
          <div >
        <a href="https://www.instagram.com/">
          <img  className="insta.icon"  src={InstaIcon1} alt="instagram" />
        </a>
        </div>
        <div>
        <a href="https://www.facebook.com/kanni.kumar.104">
          <img  className='facebook.icon' src={FaceBook} alt="Twitter" />
        </a>
        </div>
      </div>
      
      </div>
      <small className="ms-1">&copy; QueueUp, 2023. All rights reserved.</small>
      </footer>
  
    );
  }
  
  export default Footer;
  