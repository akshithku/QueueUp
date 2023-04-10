import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axois from "axios";
import "./slot.css";

function Slots() {
  const { id } = useParams();
  const [data, setdata] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [photoVisibel, setpahotoVisible] = useState(false);


  useEffect(() => {
    console.log("dataaa", data);
  }, [data]);

  useEffect(() => {
    const datas = async () => {
      const res = await axois.get(`${process.env.REACT_APP_URL}/DocSlot/${id}`);
      // console.log("res", res.data);
      setdata(res.data);
    };
    datas();
  }, [id]);

  // useEffect(()=>{
  //       fetch(`http://localhost:2917/DocSlot/${id}`)
  //       .then((response) => response.json())
  //       .then(res => {
  //         console.log('res',res)
  //         setdata(res.data);
  //       })
  //       .catch((error) => {
  //         console.log(error," failed to fetch");
  //       })
  //   },[id])

  useEffect(() => {
    console.log("slots", bookedSlots);
  }, [bookedSlots]);


  useEffect(() => {
    const BookedSlots = async () => {
      const result = await axois.get(`${process.env.REACT_APP_URL}/bookedSlots/${id}`);
      setBookedSlots(result.data);
    };
    BookedSlots();
  }, [id]);

  //   useEffect(()=>{
  //     fetch(`http://localhost:2917/bookedSlots/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setBookedSlots(data);
  //     })
  //     .catch((error) => {
  //       console.log(error," failed to fetch");
  //     })
  // },[id])

const handleClick=()=>{
  setpahotoVisible(!photoVisibel)
}


  return (
    <div className="main_container">
      <div className="sub_container">
        <img className="img_1" src={data.Docimg} alt="" />
        <div className="Doc_name">
          <div className="Doc_1">
            <label>
              DoctorName:
              <h2 className="Doc_name1">{data.DoctorName}</h2>
            </label>
          </div>
          <div className="Doc_2">
            <label>
              Specialty:
              <h3>{data.Specialty}</h3>
            </label>
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
              <td>
                {/* <img className="img-2" onClick={handleClick} src={slot.image} alt=""/> */}
                <button onClick={handleClick}>view proof</button>
                {photoVisibel? <img className="img-2" src={slot.image} alt=""/>: ""}
              </td>
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
