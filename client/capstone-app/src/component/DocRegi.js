/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import "./DocForm.css";
export default function DocRegi() {
  const [name, setName] = useState("");
  const [Img, setImg] = useState("");
  const [HospitalName, setHospitalName] = useState("");
  const [HospitalImg, setHospitalImg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [picurl, setpicUrl] = useState([]);
  const [ImageUrl, setImageUrl] = useState([]);
  const [DocQr,setDocQr]=useState("");
  const [QrDocImg,setQrDocImg]=useState([]);


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleImageChange = (event) => {
    setImg([...event.target.files]);
    console.log(Img, "Doc Image");
  };

  const handleHospitalNameChange = (event) => {
    setHospitalName(event.target.value);
  };
  const handleHospitalImgageChange = (event) => {
    setHospitalImg([...event.target.files]);
    console.log(HospitalImg, "Hos image");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSpecialtyChange = (event) => {
    setSpecialty(event.target.value);
  };

  const handleDoctorQrChange = (event) => {
    setDocQr([...event.target.files]);
    console.log(DocQr, "Doc Image");
  };

  useEffect(() => {
    if (DocQr.length < 1) return;
    const NewImageUrls = [];
    DocQr.forEach((Img) => NewImageUrls.push(URL.createObjectURL(Img)));
    setQrDocImg(NewImageUrls);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[DocQr]);

  useEffect(() => {
    if (Img.length < 1) return;
    const NewImageUrls = [];
    Img.forEach((Img) => NewImageUrls.push(URL.createObjectURL(Img)));
    setImageUrl(NewImageUrls);
  },[Img]);

  useEffect(() => {
    if (HospitalImg.length < 1) return;
    const NewImageUrls = [];
    HospitalImg.forEach((Img) => NewImageUrls.push(URL.createObjectURL(Img)));
    setpicUrl(NewImageUrls);
  },[HospitalImg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", Img[0]);
    data.append("upload_preset", "QueueUp");
    data.append("cloud_name", "dr7cybxpq");

    const respone = await fetch(
      "https://api.cloudinary.com/v1_1/dr7cybxpq/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const json = await respone.json();
    console.log(json);

    const collection = new FormData();
    collection.append("file", HospitalImg[0]);
    collection.append("upload_preset", "QueueUp");
    collection.append("cloud_name", "dr7cybxpq");

    const imagedata = await fetch(
      "https://api.cloudinary.com/v1_1/dr7cybxpq/image/upload",
      {
        method: "POST",
        body: collection,
      }
    );
    const Hosimg = await imagedata.json();
    console.log(Hosimg);

    const QRdata=  new FormData();
    QRdata.append("file",Image[0]);
    QRdata.append("upload_preset", "QueueUp");
    QRdata.append("cloud_name",'dr7cybxpq')
  
    const QRrespone= await fetch("https://api.cloudinary.com/v1_1/dr7cybxpq/image/upload",{
     method:"POST",
     body:data
    })
    const QRjson= await QRrespone.json()
    console.log(json)

    const submit = await fetch(`${process.env.REACT_APP_URL}/register`, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },

      body: JSON.stringify({
        DoctorName: name,
        Docimg: json.url,
        HospitalName: HospitalName,
        HospitalsImg: Hosimg.url,
        email: email,
        password: password,
        Specialty: specialty,
        QRimg:QRjson.url,
      }),

   
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });

      console.log(submit)

    const jsondata = submit.json();
    console.log(jsondata);
  };

  return (
    <div className="DocForm-div-1">
      <div className="main-div">
      <h1>Doctor's Registration</h1>
      <form className="form-1" method="POST" onSubmit={handleSubmit}>
        <label>
          Doctor's Name:
          <input
            type="text"
            required="required"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label>
          Doctor's image:
          <input
            type="file"
            required="required"
            accept="image/*"
            onChange={handleImageChange}
          ></input>
          {ImageUrl.map((imageSrc) => (
            <img width={80} height={80} src={imageSrc} alt="" />
          ))}
        </label>
        <label>
          Hospital Name:
          <input
            type="text"
            required="required"
            value={HospitalName}
            onChange={handleHospitalNameChange}
          />
        </label>
        <label>
          Hospital's image:
          <input
            type="file"
            required="required"
            accept="image/*"
            onChange={handleHospitalImgageChange}
          ></input>
          {picurl.map((imageSrc) => (
            <img width={80} height={80} src={imageSrc} alt="" />
          ))}
        </label>
        <label>
          Email:
          <input
            type="email"
            required="required"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            required="required"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <label>
          Specialty:
          <input
            type="text"
            required="required"
            value={specialty}
            onChange={handleSpecialtyChange}
          />
        </label>
        <label>
          Doctor's QRcode:
          <input
            type="file"
            required="required"
            accept="image/*"
            onChange={handleDoctorQrChange}
          ></input>
          {QrDocImg.map((imageSrc) => (
            <img width={80} height={80} src={imageSrc} alt="" />
          ))}
        </label>
        {/* <Link to='/'> */}
        <button className="regi-btn" type="submit" >Register</button>
        {/* </Link> */}
      </form>
      </div>
    </div>
  );
}
