/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import "./pay.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const { id } = useParams();
  const [Name, setName] = useState("");
  const [DoctorName, setDoctorName] = useState(localStorage.getItem("name"));
  const [Amount, setAmount] = useState(500);
  const [ReferenceCode, setReferenceCode] = useState();
  const [Docqr, setDocqr] = useState("");
  const [docSlots, setDocSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  const DocId = localStorage.getItem("doctorId");
  // console.log(DocId);
  const [ISAuthenticated, setIsAuthenticated] = useState(false);
  const { user, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const navigate = useNavigate();

 

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDoctorNameChange = (event) => {
    setDoctorName(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleReferenceCodeChange = (event) => {
    setReferenceCode(event.target.value);
  };

  // useEffect(() => {
  //   fetch(process.env.REACT_APP_URL + `/docQr/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log(data);
  //       setDocqr(data);
  //       // setDoccount(data.Count)
  //     })
  //     .catch((error) => {
  //       console.log(error, " failed to fetch");
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [Docqr]);

  useEffect(() => {
    const DocSlots = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/doccreatedSlots/${id}`
      );
      setDocSlots(result.data);
    };
    DocSlots();
  }, [id]);

  // console.log("DoccreatedSlots: ", docSlots);

  
//First Code:
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const submit = await fetch(`${process.env.REACT_APP_URL}/slot`, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //     body: JSON.stringify({
  //       Name: Name,
  //       DoctorName: DoctorName,
  //       timings: selectedSlot,
  //       Amount: Amount,
  //       ReferenceCode: ReferenceCode,
  //       Doc_id: DocId,
  //       UserEmail: user.email,
  //     }),
  //   });
  //   const jsondata = await submit.json();
  //   if (jsondata) {
  //     setIsAuthenticated(true);
  //     alert("Payment Done");
  //      // Find the slot ID corresponding to the selected time value
  //      const selectedSlotId = docSlots.reduce((foundId, slotGroup) => {
  //       const slot = slotGroup.slots.find((slot) => slot.TimeValue === selectedSlot);
  //       return slot ? slot._id : foundId;
  //     }, null);

  //     // Make PUT request to update the slot status
  //     if (selectedSlotId) {
  //       const updateResponse = await axios.put(`${process.env.REACT_APP_URL}/book-slot/${selectedSlotId}`, {
  //         booked: true,
  //       });
  //       console.log(updateResponse.data.message);
  //     }

  //     // Update the docSlots state to remove the booked slot
  //     const updatedSlots = docSlots.map((slotGroup) => ({
  //       ...slotGroup,
  //       slots: slotGroup.slots.filter((slot) => slot.TimeValue !== selectedSlot),
  //     }));
  //     setDocSlots(updatedSlots);
  //   } else {
  //     setIsAuthenticated(false);
  //     alert("Payment pending");
  //   }

  //   const accessToken = await getAccessTokenSilently();
  //   // console.log("Access Token:", accessToken);

  //   const idTokenClaims = await getIdTokenClaims();
  //   const refreshToken = idTokenClaims.__raw;
  //   // console.log("Refresh Token:", refreshToken);
    
  // };


//Second Code:
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  
  //   try {
  //     // Step 1: Request order ID from the backend
  //     const response = await axios.post(`${process.env.REACT_APP_URL}/slot`, {
  //       DoctorName,
  //       Name,
  //       timings: selectedSlot,
  //       Doc_id: DocId,
  //       UserEmail: user.email,
  //     });
  
  //     const { orderId, key } = response.data;
  
  //     // Step 2: Open Razorpay Checkout
  //     const options = {
  //       key,
  //       amount: 500 * 100, // Amount in paisa
  //       currency: "INR",
  //       name: "QueueUp",
  //       description: "Doctor Appointment Payment",
  //       order_id: orderId,
  //       handler: async function (paymentResponse) {
  //         // Step 3: Send payment confirmation to backend
  //         await axios.post(`${process.env.REACT_APP_URL}/verify-payment`, {
  //           orderId: paymentResponse.razorpay_order_id,
  //           paymentId: paymentResponse.razorpay_payment_id,
  //         });
  
  //         alert("Payment Successful & Slot Confirmed!");
  //       },
  //       prefill: {
  //         name: Name,
  //         email: user.email,
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //     };
  
  //     const razorpay = new window.Razorpay(options);
  //     razorpay.open();
  //   } catch (error) {
  //     console.error("Error processing payment:", error);
  //     alert("Payment failed, please try again.");
  //   }
  // };

//Third Code:
const handleSubmit = async (event) => {
  event.preventDefault();
  try { 
    // ✅ Step 1: Load Razorpay script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = async () => {
      // ✅ Step 2: Request order ID from the backend
      const response = await axios.post(`${process.env.REACT_APP_URL}/slot`, {
        DoctorName,
        Name,
        timings: selectedSlot,
        Doc_id: DocId,
        UserEmail: user.email,
      });

      const { orderId, key } = response.data;

      // ✅ Step 3: Open Razorpay Checkout
      const options = {
        key,
        amount: 500 * 100, // Amount in paisa
        currency: "INR",
        name: "QueueUp",
        description: "Doctor Appointment Payment",
        order_id: orderId,
        handler: async function (paymentResponse) {
          // ✅ Step 4: Verify payment after success
          await axios.post(`${process.env.REACT_APP_URL}/verify-payment`, {
            orderId: paymentResponse.razorpay_order_id,
            paymentId: paymentResponse.razorpay_payment_id,
          });

          alert("Payment Successful & Slot Confirmed!");
          navigate("/");
        },
        prefill: {
          name: Name,
          email: user.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      // ✅ Step 5: Initialize Razorpay properly
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };
  } catch (error) {
    console.error("Error processing payment:", error);
    alert("Payment failed, please try again.");
  }
};

  

  return (
    <div className="background">
      <div className="pay-div">
        <h1 className="heading-3">Payment Page</h1>
        {ISAuthenticated ? (
          <div className="end-div">
            <h1 className="heading-1">Thanks for Booking !! !&#128591;</h1>
            <Link to={"/"}>
              <button className="pay-btn-1">Home</button>
            </Link>
          </div>
        ) : (
          <form className="form1" onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                className="input1"
                type="text"
                required="required"
                value={Name}
                onChange={handleNameChange}
              />
            </label>

            <br />
            <label>
              DoctorName:
              <input
                className="input1"
                type="text"
                required="required"
                value={DoctorName}
                onChange={handleDoctorNameChange}
              />
            </label>
            <br />
            <label>
              Timings:
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                {docSlots.length === 0 ? (
                  <option>No slots available</option>
                ) : (
                  <>
                    <option>Select a slot</option>
                    {docSlots.map((slotGroup) => (
                      <optgroup key={slotGroup._id}>
                        {slotGroup.slots.map((slot) => (
                          <option value={slot.TimeValue}>
                            {slot.TimeValue}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </>
                )}
              </select>
            </label>

            {/* <br />
            <label>
              Charges:
              <input
                className="input1"
                type="number"
                required="required"
                placeholder="Amount"
                value={Amount}
                onChange={handleAmountChange}
              ></input>
            </label>
            <br /> */}

            {/* <div className="QR-div">
              <label>
                Scan QR:
                <img className="Qr-img" src={Docqr.QRimg} alt="image" />
              </label>
            </div> */}
            <br />
            {/* <label>
              Reference Code:
              <input
                className="input1"
                type="text"
                required="required"
                value={ReferenceCode}
                onChange={handleReferenceCodeChange}
              ></input>
            </label> */}
            <br />
            <button className="pay-btn" onSubmit={handleSubmit}>
              Make Payment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
