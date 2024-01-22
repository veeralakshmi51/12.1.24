// import React,{useState}from "react";
// import Image3 from '../../assets/images/image3.png'
// import { TextField } from "@mui/material";
// import { Button } from "reactstrap";
// interface Data {
//   newPassword: string;
//   confirmNewPass: string;
//   email: string;
// }
// const ChangePassword = () => {
//   const [data, setData] = useState<Data>({
//     newPassword:"",
//     confirmNewPass:"",
//     email:""
//   });
//   const handlePassword=(e:React.FormEvent)=>{
//    e.preventDefault();
//   }
//   return (
//     <div
//       className="p-grid passcode-section"
//       style={{ background: "#fff", width: "100vw", height: "100vh" }}
//     >
//       <div
//         className="p-col-12 p-md-7"
//         style={{
//           backgroundColor: "#fff",
//           display: "flex",
//           flexDirection: "column",
//           marginLeft: "-6px",
//           height: "101%",
//         }}
//       >
//         <img
//           src={Image3}
//           style={{ height: "-webkit-fill-available", marginRight: "-7px" }}
//           alt="Image"
//         ></img>
//       </div>
//       <div className="col-md-5 d-flex flex-column align-items-md-center justify-content-md-center">
//         <form
//           className="rounded col-md-8"
//           style={{ border: "1px solid #6994f0", padding: "30px" }}
//         >
//           <div className="d-flex flex-column gap-3">
//             <label>Email ID</label>
//             <TextField
//               id="outlined-basic-1"
//               label="Email"
//               variant="outlined"
//               fullWidth
//               value={data.email}
//               onChange={(e) => setData({ ...data, email: e.target.value })}
//             />
//             <Button
//               color="info"
//               style={{ fontSize: "20px" }}
//               onClick={handlePassword}
//             >
//               Click to Send OTP
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;
import React, { useState, useEffect } from "react";
import Image3 from '../../assets/images/image3.png';
import { TextField } from "@mui/material";
import { Button } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface Data{
  email:string;
  newPassword:string;
  confirmNewPass:string;
}
const ChangePassword = () => {
const [data,setData]=useState<Data>({
  email:"",
  confirmNewPass:"",
  newPassword:""
});
const navigate=useNavigate();
// const baseURL = 'http://47.32.254.89:7000/api'
// const successCode = 'MHC - 0200'

 const handleRequest=async()=>{
  try{
    const response=await axios.post('http://47.32.254.89:7000/api/user/reset-password',data);
    console.log('Response:',response.data);
   if(response.data.message && response.data.message.code === 'MHC - 0200')
   alert(response.data.message.description);
    navigate('/login');
  } catch(error){
    console.log('Error:',error)
  }
 }
  return (
    <div className="p-grid passcode-section" style={{ background: '#fff', width:'100vw', height:'100vh' }}>
      <div className="p-col-12 p-md-7" style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', marginLeft: '-6px', height: '101%' }}>
        <img src={Image3} style={{ height: '-webkit-fill-available', marginRight: '-7px' }} alt="Image"></img>
      </div>
      <div className="col-md-5 d-flex flex-column align-items-md-center justify-content-md-center">
      <form className="rounded col-md-8" style={{ border: '1px solid #6994f0', padding: '30px' }} >

      <div className="d-flex flex-column gap-3">
        <label>Reset Password</label>
      <TextField
        id="outlined-basic-1"
        label="Email"
        variant="outlined"
        fullWidth
        value={data.email}
        onChange={(e)=>setData({...data,email:e.target.value})}
      />
      <TextField
        id="outlined-basic-2"
        label="New Password"
        variant="outlined"
        fullWidth
        type="password"
        value={data.newPassword}
        onChange={(e)=>setData({...data,newPassword:e.target.value})}
      />
      <TextField
        id="outlined-basic-3"
        label="Confirm Password"
        variant="outlined"
        fullWidth
        type="password"
        value={data.confirmNewPass}
        onChange={(e)=>setData({...data,confirmNewPass:e.target.value})}
      />
      <Button color="info" style={{fontSize:'20px'}} onClick={handleRequest}>
              Change Password
            </Button>
      </div>
      </form>
      </div>
    </div>
   
  );
};

export default ChangePassword;