import React, { useState, useEffect } from "react";
import Image4 from '../../assets/images/image5.png';
import { InputAdornment, TextField } from "@mui/material";
import { Button } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutline } from "@mui/icons-material";

interface Data{
  email:string;
  otp:string;
}
const VerifyOtp= () => {
const [data,setData]=useState<Data>({
  email:"",
  otp:"",
});
const navigate=useNavigate();
// const baseURL = 'http://47.32.254.89:7000/api'
// const successCode = 'MHC - 0200'
useEffect(()=>{
  const savedEmail=localStorage.getItem('savedEmail');
  if(savedEmail){
    setData((prevData)=>({...prevData,email:savedEmail}));
  } else{
    console.log('No Mail Found in Local Storage')
  }
},[])
 const handleRequest=async()=>{
  try{
    const response=await axios.post('http://47.32.254.89:7000/api/user/verify-otp',data);
    console.log('Response:',response.data);
    alert(response.data.message.description);
    if(response.data.message && response.data.message.code === 'MHC - 0200')
    navigate('/change-password');
  } catch(error){
    console.log('Error:',error)
  }
 }
  return (
    <div className="p-grid passcode-section" style={{ background: '#fff', width:'100vw', height:'100vh' }}>
      <div className="p-col-12 p-md-7" style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', marginLeft: '-6px', height: '101%' }}>
        <img src={Image4} style={{ height: '-webkit-fill-available', marginRight: '-7px' }} alt="Image"></img>
      </div>
      <div className="col-md-5 d-flex flex-column align-items-md-center justify-content-md-center">
      <form className="rounded col-md-8" style={{ border: '1px solid #6994f0', padding: '30px' }} >

      <div className="d-flex flex-column gap-3">
        <label>OTP Verification</label>
      
      <TextField
      id="outlined-basic-2"
      label="OTP"
      variant="outlined"
      fullWidth
      value={data.otp}
      type="password"
      onChange={(e)=>setData({...data,otp:e.target.value})}
      InputProps={{startAdornment:(<InputAdornment position="start"><CheckCircleOutline style={{color:'skyblue'}}/></InputAdornment>)}}/>
      <Button color="info" style={{fontSize:'20px'}} onClick={handleRequest}>
              Verify OTP
            </Button>
      </div>
      </form>
      </div>
    </div>
   
  );
};

export default VerifyOtp;