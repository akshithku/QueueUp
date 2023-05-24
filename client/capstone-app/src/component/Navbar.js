import { useState } from "react";
// import Modal from "react-modal";
import { Link } from "react-router-dom";
import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../Assets/logo-3.png";
// import Hamburger from "../Assets/menu.png";

// import { Motion, spring, presets } from "react-motion";

export default function Header() {
  // const afterClick = () => {
  //   document.getElementById("nav-check").checked = false;
  // };
  // const [modalIsOpen, setModalIsOpen] = useState(false);

  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const [close, setclose] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const openModel = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const handleClick = () => {
    setclose(!close);
  };

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (authDataRef.current && !authDataRef.current.contains(event.target)) {
  //       setAlert(false);
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [alert]);

  return (
    <div className="nav">
      <Link to="/">
        <img className="Logo" src={logo} alt=""></img>
      </Link>

      <div className="menu-icon" onClick={ toggleMenu}>
          <button>menu</button>
        </div>
          {/* { */}
            {/* // showMenu && ( */}
              <div className={`Sub-btn ${showMenu && 'active'}`}>
              <div>
              <Link to="/" className="home">
                Home
              </Link>
              </div>
              <div>
              <Link to={"/DocForm"}  className="Doc-btn">
                Doctor
              </Link>
              </div>
              <div>
              <Link to="/" className="About-btn">
                About US
              </Link>
              </div>
              </div>
            {/* )} */}
      <div className="head">
    
        {isAuthenticated ? (
          <img
            className="user_img"
            onClick={() => {
              setclose(true);
            }}
            src={user.picture}
            alt=""
          />
        ) : (
          <div className="nav-title" id="nav-check">
            <Link className="regi"onClick={() => loginWithRedirect()}>
              Login
            </Link>
          </div>
        )}

        {close && (
           
          <div className="log_div">
            <h3>Do you want to loggout ?</h3>
            <div className="log_btn">
              <button className="log_btn1" onClick={openModel}>
                yes
              </button>
              <button className="log_btn1" onClick={handleClick}>
                No
              </button>
            </div>
          </div>

        )}
      </div>
    </div>
  );
}