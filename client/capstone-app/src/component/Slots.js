import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axois from "axios";
import "./slot.css";

function Slots() {
  const { id } = useParams();
  const [data, setdata] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [timing, setTiming] = useState('');
  const [docSlots, setDocSlots] = useState([]);




  useEffect(() => {
    const datas = async () => {
      const res = await axois.get(`${process.env.REACT_APP_URL}/docSlot/${id}`);
      setdata(res.data);
    };
    datas();
  }, [id]);

  console.log("DocData: ", data);


  useEffect(() => {
    const BookedSlots = async () => {
      const result = await axois.get(`${process.env.REACT_APP_URL}/bookedSlots/${id}`);
      setBookedSlots(result.data);
    };
    BookedSlots();
  }, [id]);

  console.log("Bookedslots: ", bookedSlots);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/create-slot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          doctorId: id,
          slots: [{
            TimeValue: timing
          }]
        })
      });
  
      if (response.ok) {
        const newSlot = { TimeValue: timing };
        setdata([...data, newSlot]);
        setTiming('');
      } else {
        console.error('Failed to create slot');
      }
    } catch (error) {
      console.error('Error creating slot:', error);
    }
  };


  useEffect(() => {
    const DocSlots = async () => {
      const result = await axois.get(`${process.env.REACT_APP_URL}/doccreatedSlots/${id}`);
      setDocSlots(result.data);
    };
    DocSlots();
  }, [id]);

  console.log("DoccreatedSlots: ", docSlots);

  return (
    <div className="main_container">
      <div className="sub_container">
        <div className="slot-sub1">
        <img className="img_1" src={data.Docimg} alt="" />
        <div className="Doc_name">
          <div className="Doc_1">
            <label className="Slot-label">
              DoctorName:
              <h2 className="Doc_name1">{data.DoctorName}</h2>
            </label>
          </div>
          <div className="Doc_2">
            <label className="Slot-label">
              Specialty:
              <h3>{data.Specialty}</h3>
            </label>
          </div>
        </div>
        </div>
        <div>
        <form onSubmit={handleSubmit}>
            <label>
              Timing:
              <input type="text" value={timing} onChange={(e) => setTiming(e.target.value)} />
            </label>
            <button type="submit">Create Slot</button>
          </form>
          <div>
            <h1>Booked Slots: </h1>
            
          </div>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
        <th>Name</th>
        <th>Timings</th>
        <th>Reference</th>
        </tr>
        </thead>
        <tbody>
        {
          bookedSlots.filter((booking) => booking.Doc_id === id)
          .map((slot)=>(
            <tr>
              <td>{slot.Name}</td>
              <td>{slot.timings}</td>
              <td>{slot.ReferenceCode}</td>
            </tr>
          ))
        }
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default Slots;
