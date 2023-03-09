import React, { useState } from "react";
import "./pay.css";
import { Link } from "react-router-dom";
const PaymentPage = () => {
  const [name, setName] = useState("");
  // const [timing, setTiming] = useState("");
  
  const [amount, setAmount] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Code to process payment and redirect to confirmation page
  };

  const time = localStorage.getItem('time')

  return (
    <div className="pay-div">
      <h1 className="heading">Payment Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
          className="input1"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Timings:
          <input className="input1" type="timings" value={time}></input>
        </label>
        <br />
        <label>
          Charges:
          <input className="input1" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
        </label>
        <br/>
        <label>
          UPI ID:
          <input className="input1" type=""></input>
        </label>
        <br/>
        <Link to="/">
        <button className="pay-btn" type="submit">Make Payment</button>
        </Link>
      </form>
    </div>
  );
};

export default PaymentPage;
