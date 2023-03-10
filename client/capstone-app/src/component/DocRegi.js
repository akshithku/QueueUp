import React, { useState } from 'react';

export default function DocRegi() {
  const [name, setName] = useState('');
  const [HospitalName,setHospitalName]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialty, setSpecialty] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleHospitalNameChange = (event) => {
    setHospitalName(event.target.value);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:2917/register',{
      method:"POST",

      body:JSON.stringify({
        "DoctorName":name,
        "HospitalName":HospitalName,
        "email":email,
        "password":password,
        "Specialty":specialty
      }),
      headers:{
        "Content-typr":'application/json; charset=UTF-8'
      }
    })
    .then(res=>res.json).then(json=>console.log(json));

    window.location.href="/";
   
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Doctor's Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Hospital Name:
        <input type="text" value={HospitalName} onChange={handleHospitalNameChange} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <label>
        Specialty:
        <input type="text" value={specialty} onChange={handleSpecialtyChange} />
      </label>
      <button type="submit" onClick={handleSubmit}>Register</button>
    </form>
  );
}
