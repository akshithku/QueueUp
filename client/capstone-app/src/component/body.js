// import { useState } from "react";
import { Link } from "react-router-dom";
import "./body.css";

const imagedata = () => {
  let arr = [
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqW5QgW2c6SqRa08mWDBgYegYrNaFGAEdC8JOX8Y80Xw&usqp=CAU&ec=48600112",
      name: "abc",
      Area: "1234",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqW5QgW2c6SqRa08mWDBgYegYrNaFGAEdC8JOX8Y80Xw&usqp=CAU&ec=48600112",
      name: "abc",
      Area: "1234",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqW5QgW2c6SqRa08mWDBgYegYrNaFGAEdC8JOX8Y80Xw&usqp=CAU&ec=48600112",
      name: "abc",
      Area: "1234",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqW5QgW2c6SqRa08mWDBgYegYrNaFGAEdC8JOX8Y80Xw&usqp=CAU&ec=48600112",
      name: "abc",
      Area: "1234",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqW5QgW2c6SqRa08mWDBgYegYrNaFGAEdC8JOX8Y80Xw&usqp=CAU&ec=48600112",
      name: "abc",
      Area: "1234",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqW5QgW2c6SqRa08mWDBgYegYrNaFGAEdC8JOX8Y80Xw&usqp=CAU&ec=48600112",
      name: "abc",
      Area: "1234",
    },
  ];
  return arr;
};

function Datas() {
  // const DocClicked = () => {
  //   document.getElementById("Doc-link").checked = false;
  // };
  return (
    <main className="fullContainer">
      <div className="search-input">
        <input
          type="text"
          className="input-search"
          placeholder="Search...."
          id="search-input"
        />
      </div>
      <div className="app">
        {imagedata().map((abd) => {
          return (
            <div className="mainContainer">
              <img className="image" src={abd.img} alt="" />
              <h1 className="name" key={abd.name}>
                {abd.name}
              </h1>
              <h2 className="area">{abd.Area}</h2>
              <div className="Doc-link">
                <Link to="/Doc">
                  <button id="btn" >
                    view Doctor's
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Datas;
