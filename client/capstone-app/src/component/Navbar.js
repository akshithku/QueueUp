import { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../Assets/logo-2.png";
// import { Motion, spring, presets } from "react-motion";

export default function Header() {
  // const afterClick = () => {
  //   document.getElementById("nav-check").checked = false;
  // };
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const [close, setclose] = useState(false);

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
        <img className="logo" src={logo} alt=""></img>
      </Link>
      <div className="head">
        <Link to="/" className="home">
          Home
        </Link>

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
            <Link className="regi" onClick={() => setModalIsOpen(true)}>
              login
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
      
      {/* <Motion
  defaultStyle={{
    scale: 0,
    translateX: -300
  }}
  style={{
    scale: spring(1),
    translateX: spring(0, presets.stiff)
  }}
>
   */}

        <Modal
          className="popup"
          isOpen={modalIsOpen}
          // onRequestClose={() => setModalIsOpen(false)}
        >
            <div className="btn-container">
              <button
                className="close-btn"
                onClick={() => setModalIsOpen(false)}
              >
                X
              </button>
              {/* <Link to="/Forms"> */}
              <button onClick={() => loginWithRedirect()} className="btn-1">
                User
              </button>
              {/* </Link> */}
              <Link to={"/DocForm"}>
                <button className="btn-2">Doctor</button>
              </Link>
            </div>
        </Modal>
        {/* </Motion> */}

      </div>
    </div>
  );
}
