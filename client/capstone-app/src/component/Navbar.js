import { Link } from "react-router-dom";
import"./Header.css";
export default function Header() {
  const afterClick = () => {
    document.getElementById("nav-check").checked = false;
  };
  return (
      <div className="nav">
        <h1>QueueUp</h1>
        <div className="head">
          <Link to="/">
          <button className="home">Home</button>
          </Link>
        
          <div className="nav-title" id="nav-check">
            <Link to="/Forms">
              <button className="regi" onClick={() => afterClick()}>
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
  );
}