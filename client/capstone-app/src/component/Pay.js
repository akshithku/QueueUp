import React, { useState, useEffect } from "react";
// import { json } from "react-router-dom";
import "./pay.css";
import { Link } from "react-router-dom";
const PaymentPage = () => {
  const [Name, setName] = useState("");
  const [DoctorName,setDoctorName]=useState(localStorage.getItem("name"));
  const [timing, setTiming] = useState("");
  const [Amount, setAmount] = useState(0);
  const [Image,setImage]=useState("");
  const [ImageUrl,setImageUrl]=useState([]);
  const DocId=  localStorage.getItem("doctorId")
  console.log(DocId)
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleDoctorNameChange = (event) => {
    setDoctorName(event.target.value);
  }

  const handletimeChange = (event) => {
    setTiming(event.target.value);
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  }

  // const handleImageChange = (event) => {
  //   setImage(event.target.value);
  // }
  // async function UploadImage(){
  // }



  useEffect(()=>{
    setTiming(localStorage.getItem('time'))
    if(Image.length<1) return;
    const NewImageUrls=[];
    Image.forEach(Image=>NewImageUrls.push(URL.createObjectURL(Image)));
    setImageUrl(NewImageUrls)
    },[Image]);

  function onImageChange(e){
    setImage([...e.target.files]);
    console.log(Image)
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data=  new FormData();
    data.append("file",Image[0]);
    data.append("upload_preset", "QueueUp");
    data.append("cloud_name",'dr7cybxpq')
  
    const respone= await fetch("https://api.cloudinary.com/v1_1/dr7cybxpq/image/upload",{
     method:"POST",
     body:data
    })
    const json= await respone.json()
    console.log(json)
    // setLink(json.url)
    // console.log(link)
 
     const submit= await fetch(`${process.env.REACT_APP_URL}/Slot`,{
        method:"POST",
        headers:{
          "Content-type":'application/json; charset=UTF-8'
        },
        body:JSON.stringify({
          Name:Name,
          DoctorName:DoctorName,
          timings:timing,
          Amount:Amount,
          image:json.url,
          Doc_id:DocId,
        }),
       
      })
     // eslint-disable-next-line no-unused-vars
     const jsondata= await submit.json();
     if (jsondata) {
      setIsAuthenticated(true);
      alert("Payment Done");
    } else {
      setIsAuthenticated(false);
      alert("Payment pending");
    }
    
  };



  return (
    <div className="pay-div">
      <h1 className="heading">Payment Page</h1>
      { isAuthenticated ? (
        <div>
          <h1>Thanks for Booking</h1>
          <Link to={'/'}>
          <button >Let's Go</button>
          </Link>
        </div>
      ) :(
      <form onSubmit={handleSubmit} >
        <label>
          Name:
          <input
          className="input1"
            type="text"
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
            value={DoctorName}
            onChange={handleDoctorNameChange}
          />
        </label>
          <br/>
        <label>
          Timings:
          <input className="input1" type="timings" value={timing} onChange={handletimeChange}></input>
        </label>
        <br />
        <label>
          Charges:
          <input className="input1" type="number" placeholder="Amount" value={Amount} onChange={handleAmountChange}></input>
        </label>
        <br/>
        <label>
          Reference
          <input className="input1"  type="file" accept="image/*" onChange={onImageChange}></input>
          {ImageUrl.map(imageSrc=><img width={100} height={100} src={imageSrc} alt=""/>)}
        </label>
        <br/>
        <button className="pay-btn"  onSubmit={handleSubmit}>Make Payment</button>
      </form>)
}
    </div>
    
  );
};

export default PaymentPage;
