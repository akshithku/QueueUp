import { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "./Header.css";
export default function Header() {
  // const afterClick = () => {
  //   document.getElementById("nav-check").checked = false;
  // };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className="nav">
      <h1>QueueUp</h1>
      <div className="head">
        <Link to="/">
          <button className="home">Home</button>
        </Link>

        <div className="nav-title" id="nav-check">
          <button className="regi" onClick={() => setModalIsOpen(true)}>
            login
          </button>
        </div>
        <Modal
          className="popup"
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <div className="btn-container">
          <button className="close-btn" onClick={() => setModalIsOpen(false)}>
            X
          </button>
          <Link to="/Forms">
            <button className="btn-1">Paitent</button>
          </Link>
          <Link to={"/DocForm"}>
          <button className="btn-2">Doctor</button>
          </Link>
          </div>
        </Modal>
      </div>
    </div>
  );
}
