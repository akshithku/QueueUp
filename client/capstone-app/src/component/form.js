import React,{useState,useEffect} from 'react'
import './Form.css'
import { Link } from 'react-router-dom';

export default function Forms() {


    const [first, setfirst] = useState({
        Name:'',
        Email:'',
        Phone:'',
        password:'',
        confirmpassword:'',
    });

    const [passwordShown, setPasswordShown] = useState(false);
    const [repeatPasswordShown, setRepeatPasswordShown] = useState(false);

    const save=()=>{
        sessionStorage.setItem("name",first.Name);
        sessionStorage.setItem("email",first.Email);
        sessionStorage.setItem("phone",first.Phone);
        sessionStorage.setItem("password",first.password);
        sessionStorage.setItem("confirmpassword",first.confirmpassword);

        // localStorage.setItem("name",first.Name);
        // localStorage.setItem("email",first.Email);
        // localStorage.setItem("phone",first.Phone);
        // localStorage.setItem("password",first.password);
        // localStorage.setItem("confirmpassword",first.confirmpassword);
    }
    const change =(e)=>{
        if(e.target.name==='name'){
            setfirst({
                ...first,Name:e.target.value,
                
            })
        }
        else if(e.target.name==='Email'){
            setfirst({
                ...first,Email:e.target.value,
              
            })
        }
        else if(e.target.name==='phone'){
            setfirst({
                ...first,Phone:e.target.value,
                
            
            })
        }
        else if(e.target.name==='password'){
            setfirst({
                ...first,password:e.target.value,
                

            })
        }

        else if(e.target.name==='confirmpassword'){
            setfirst({
                ...first,confirmpassword:e.target.value,
                

            })
        }
        
    }

    const [Error, setError] = useState({});



    useEffect(()=>{
        console.log(Error)
        if(Object.keys(Error).length===0 && sub){
            console.log(first);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[Error])

    const [sub,onsub] = useState(false);

    const submit=(e)=>{
        e.preventDefault();
        setError(validat(first))
        onsub(true);
    }
      const validat=(value)=>{
        const error={};
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/i;
        const regexNum = /(\d{3})[ -]?(\d{3})[ -]?(\d{4})/i;


        if(!value.Name){
            error.name="User Name is Required";
        }else if(value.Name.length<3){
            error.name="name must be greater than 3 characters"
        }else if(value.Name.length>30){
            error.name="name must be smaller than 30 characters"

        }
        if(!value.Email){
            error.Email="Email address is required";
        }else if (!regexEmail.test(value.Email)) {
            error.Email = "This is not a valid email format!";
          }

        if(!value.Phone){
            error.Phone="Mobile number is Required";
        }else if((!regexNum.test(value.Phone)) || value.Phone.length!==10 ){
            error.Phone="This is not a valid number"
        }

        if(!value.password){
            error.password="Password is required";
        }else if(!regexPass.test(value.password)){
            error.password="password must be greater than 10 characters and atleast contain one special character"
        }

        if(!value.confirmpassword){
            error.confirmpassword="Password is required";
        }else if(value.password!==value.confirmpassword){
            error.confirmpassword="password does't match"
        }

        return error;


    }
    const getname=sessionStorage.getItem("name");
    const getemail=sessionStorage.getItem("email");
    const getphone=sessionStorage.getItem("phone");
    const getpassword=sessionStorage.getItem("password");
    const getconfirmpassword=sessionStorage.getItem("confirmpassword");

  return (
    <div className='formContainer'>
        {
          getname && getemail && getphone && getphone.length===10 && getpassword && getconfirmpassword && getpassword=== getconfirmpassword?(
            <div>
                <h1 style={{color:'green'}} >Signed in succesfully</h1>
                <Link to={'/'} >
                <button>
                    Back to Home
                </button>
                 </Link>
                </div>
          ):(
            <form onSubmit={submit}>
        
            <div className='main'>
            {Object.keys(Error).length===0 && sub?(<h1>Thankyou</h1>):(
                <>
                
            <div className='main2'>

            <div className='text' >
            <h1 style={{color:'black'}} id='register'>Register Here!</h1>
            </div>
            
            <div className='inputDivs'>
                
                <div>
                <input className='input' placeholder='Name:' value={first.Name} onChange={(e)=>change(e)} name='name' />
                </div>
            </div>
            <p  style={{color:'black',margin:"0%"}} >{Error.name}</p>


            <div className='inputDivs'>
                <div>
                <input className='input' placeholder='Email:' value={first.Email}  onChange={(e)=>change(e)} name='Email' />
                </div>
            </div>
            <p style={{color:'black',margin:"0%"}} >{Error.Email}</p>


            <div className='inputDivs'>
                <input className='input'  placeholder='Phone No:' value={first.Phone} onChange={(e)=>change(e)} name='phone' />
            </div>
            <p style={{color:'black',margin:"0%"}} >{Error.Phone}</p>


            <div className='inputpass'>
                
                <div className='inputpass2' >
                <input className='input' placeholder='Password:' type={passwordShown ? "text" : "password"} value={first.password} onChange={(e)=>change(e)} name='password' />   
                <span id="pass" onClick={()=>setPasswordShown(!passwordShown)}>👁</span>   
                </div>
            </div>
            <p style={{color:'black',margin:"0%"}} >{Error.password}</p>


            <div className='inputpass'>
                
                <div className='inputpass2' >
                <input className='input' placeholder='Confirm Password:' type={repeatPasswordShown ? "text" : "password"} value={first.confirmpassword} onChange={(e)=>change(e)} name='confirmpassword' />  
               
                </div>
                <span id="pass" onClick={()=>setRepeatPasswordShown(!repeatPasswordShown)}>👁</span>
            </div>
            <p style={{color:'black',margin:"0%"}} >{Error.confirmpassword}</p>

            <div className='button'>
                <button onClick={()=>save()}>
                    Submit
                </button>
            </div>

            </div>
            </>
            )}
            </div>
        </form>
            
            
       
          )
        
        

        
            }

    </div>
  )
}
