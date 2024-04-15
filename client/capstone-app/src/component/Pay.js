/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
// import { json } from "react-router-dom";
import "./pay.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { loadGapiInsideDOM } from "gapi-script";
import axois from "axios";

const PaymentPage = () => {
  const { id } = useParams();
  const [Name, setName] = useState("");
  const [DoctorName, setDoctorName] = useState(localStorage.getItem("name"));
  // const [timing, setTiming] = useState("");
  const [Amount, setAmount] = useState(500);
  // const [Image,setImage]=useState("");
  // const [ImageUrl,setImageUrl]=useState([]);
  const [ReferenceCode, setReferenceCode] = useState();
  const [Docqr, setDocqr] = useState("");
  const [docSlots, setDocSlots] = useState([]);

  // const [isModalOpen, setModalOpen] = useState(false);

  const DocId = localStorage.getItem("doctorId");
  console.log(DocId);
  const [ISAuthenticated, setIsAuthenticated] = useState(false);
  // const [UserEmail,setUserEmail]=useState([]);
  const { user, getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  // if (user) console.log(user)

  // const gapi=window.gapi;
  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  console.log({ apiKey, calendarID });
  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

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

  useEffect(() => {
    console.log("DOC-QR", Docqr);
  }, [Docqr]);
  useEffect(() => {
    fetch(process.env.REACT_APP_URL + `/docQr/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDocqr(data);
        // setDoccount(data.Count)
      })
      .catch((error) => {
        console.log(error, " failed to fetch");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const DocSlots = async () => {
      const result = await axois.get(
        `${process.env.REACT_APP_URL}/doccreatedSlots/${id}`
      );
      setDocSlots(result.data);
    };
    DocSlots();
  }, [id]);

  console.log("DoccreatedSlots: ", docSlots);

  const handletimeChange = (event) => {
    setDocSlots(event.target.value);
  };

  // useEffect(() => {
  //   setTiming(localStorage.getItem("time"));
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submit = await fetch(`${process.env.REACT_APP_URL}/slot`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        Name: Name,
        DoctorName: DoctorName,
        timings: docSlots,
        Amount: Amount,
        ReferenceCode: ReferenceCode,
        Doc_id: DocId,
        UserEmail: user.email,
      }),
    });
    const jsondata = await submit.json();
    if (jsondata) {
      setIsAuthenticated(true);
      alert("Payment Done");
    } else {
      setIsAuthenticated(false);
      alert("Payment pending");
    }

    const accessToken = await getAccessTokenSilently();
    console.log("Access Token:", accessToken);

    const idTokenClaims = await getIdTokenClaims();
    const refreshToken = idTokenClaims.__raw;
    console.log("Refresh Token:", refreshToken);

    const gapi = await loadGapiInsideDOM();

    gapi.Load("client:auth2", () => {
      console.log("loaded Client");

      gapi.client
        .init({
          apiKey: apiKey,
          clientId: calendarID,
          discoveryDocs: [DISCOVERY_DOC],
          scope: SCOPES,
        })
        .then(() => {
          console.log("Client initialized");
          return gapi.client.load("calendar", "v3");
        })
        .then(() => {
          console.log("Calendar API loaded");
          return gapi.auth2.getAuthInstance().signIn();
        })
        .then(() => {
          console.log("User signed in");

          var event = {
            summary: "Appointment booked",
            location: "New Location",
            description:
              "A chance to hear more about Google's developer products.",
            start: {
              // 'dateTime': '2015-05-28T09:00:00-07:00',
              timeZone: timing,
            },
            end: {
              // 'dateTime': '2015-05-28T17:00:00-07:00',
              timeZone: timing,
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
            attendees: [
              { email: "website@example.com" },
              { email: "doctor@example.com" },
              { email: user.email },
            ],
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          };

          return gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });
        })
        .then((response) => {
          console.log("Event created successfully");
          window.open(response.result.htmlLink);
        })
        .catch((error) => {
          console.error("Error occurred:", error);
        });
    });
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
            {/* <label>
              Timings:
              <select>
                {docSlots.map((slot) => (
                      <option>Slots</option>
                    {slot.slots.map((s) => (
                      <option  value={docSlots} onChange={handletimeChange}  >
                        Time: {s.TimeValue}{" "}
                      </option>
                    ))}
                ))}
              </select>
            </label> */}
            <label>
              Timings:
              <select
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
              >
                <option>Select a slot</option>
                {docSlots.map((slotGroup, index) => (
                  <optgroup label={`Slot Group ${index + 1}`} key={index}>
                    {slotGroup.slots.map((slot, slotIndex) => (
                      <option value={slot.TimeValue} key={slotIndex}>
                        {slot.TimeValue}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>

            <br />
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
            <br />
            <div className="QR-div">
              <label>
                Scan QR:
                <img className="Qr-img" src={Docqr.QRimg} alt="image" />
              </label>
            </div>
            <br />
            <label>
              Reference Code:
              <input
                className="input1"
                type="text"
                required="required"
                value={ReferenceCode}
                onChange={handleReferenceCodeChange}
              ></input>
            </label>
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
