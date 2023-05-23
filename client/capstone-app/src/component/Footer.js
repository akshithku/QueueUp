import React from "react";
import "./footer.css";
import logo from "../Assets/logo-3.png";
import FaceBook from "../Assets/facebook.icon.svg";
import InstaIcon1 from "../Assets/insta.icon2.svg";
import linkedinIcon from "../Assets/linkedin.icon.svg";
import githubIcon from "../Assets/github.icon.svg";
import { Link } from "react-router-dom";
// import {
//   MDBFooter,
//   MDBContainer,
//   MDBCol,
//   MDBRow,
// } from 'mdb-react-ui-kit';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img className="logo-1" src={logo} alt="log" />
          <div className="footer-para">
            <p>
              QueueUp is a comprehensive queue management and appointment
              booking solution designed specifically for hospitals. Our platform
              aims to streamline the queue management process and enhance the
              overall patient experience.
            </p>
          </div>
          <div className="social-icons">
            <div className="icon-1">
              <a href="https://github.com/akshithku">
                <img className="github.icon" src={githubIcon} alt="instagram" />
              </a>
            </div>
            <div>
              <a href="https://www.linkedin.com/in/akshith-kumar-94aa5b24b/">
                <img
                  className="linkedin.icon"
                  src={linkedinIcon}
                  alt="instagram"
                />
              </a>
            </div>
            <div>
              <a href="https://www.instagram.com/">
                <img className="insta.icon" src={InstaIcon1} alt="instagram" />
              </a>
            </div>
            <div>
              <a href="https://www.facebook.com/kanni.kumar.104">
                <img className="facebook.icon" src={FaceBook} alt="Twitter" />
              </a>
            </div>
          </div>
        </div>
        <div className="links">
          <div className="Main-page">
            <ul>
              mian
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/termspage">
                 Doctor
                </Link>
              </li>
              <li>
                <Link to="/policy">
                  About US
                </Link>
              </li>
            </ul>
          </div>
          <div className="other-page">
            <ul>
              Other
            <li>
                <Link to="/termspage">
                  T&C
                </Link>
              </li>
              <li>
                <Link to="/policy">
                  PrivacyPolicy
                </Link>
              </li>
              <li>
                <Link>
                    Service policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="MS">
        {/* <small className="ms-1">&copy; QueueUp, 2023. All rights reserved.</small> */}
      </div>
    </footer>
  );
}

export default Footer;
