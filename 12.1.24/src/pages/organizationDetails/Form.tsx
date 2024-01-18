import React, { useEffect, useState } from "react";
import { FormGroup} from "reactstrap";
import "./form.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

interface FormData {
  id:string;
  organizationName: string;
  organizationType: string;
  //organizationId: string;
  duration: string,
  startTime: string,
  mobileNumber: string;
  email: string;
  websiteUrl: string;
  hippaPrivacyOfficerName: string;
  proximityVerification: string;
  geofencing: string;
  q15Access:string ;
}
interface OrganizationType {
  id: string;
  value: string;
  type: string;
}
const OrganizationForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const [organizationType, setOrganizationType] = useState<OrganizationType[]>(
    []
  );
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    id:"",
    organizationName: "",
    organizationType: "",
   // organizationId:'',
    duration:"",
    startTime:"",
    mobileNumber: "",
    email: "",
    websiteUrl: "",
    hippaPrivacyOfficerName: "",
    proximityVerification: "",
    geofencing: "",
    q15Access: "",
  });
  useEffect(() => {
    const fetchOrganizationTypes = async () => {
      try {
        const response = await axios.get(
          "http://47.32.254.89:7000/api/dropdowns/getByDropdown?dropdown=Organization%20Type"
        );
        setOrganizationType(response.data.data[0]?.list || []);
        console.log("fetched data:", response.data);
      } catch (error) {
        console.error("Error fetching organization types:", error);
        setError("Error fetching organization types. Please try again.");
      }
    };
    fetchOrganizationTypes();
  }, []);
  const handleSelectChange = (fieldName: string, value: any) => {
    setFormData({ ...formData, [fieldName]: value });
  };
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
// if(!formData.organizationName || 
//   !formData.organizationType ||
//   !formData.duration ||
//   !formData.startTime ||
//   !formData.mobileNumber|| 
//   !formData.websiteUrl ||
//   !formData.hippaPrivacyOfficerName ||
//   !formData.q15Access || 
//   !formData.proximityVerification ||
//   !formData.geofencing)
//   alert("Please Fill All The Fields")

  const requestBody={
    id: "",
    organizationdetails: [
      {
        name: formData.organizationName,
        type: formData.organizationType,
        
      }
    ],
    email: formData.email,
    mobileNumber: formData.mobileNumber,
    websiteUrl: formData.websiteUrl,
    shift: {
      duration: formData.duration,
      startTime: formData.startTime,
    },
    proximityVerification: formData.proximityVerification,
    geofencing: formData.geofencing,
    q15Access: formData.q15Access,
  
    hippaprivacyofficer: [
      {
        name: formData.hippaPrivacyOfficerName,
        
      }
    ],
  }
  
    try {
      const response = await axios.post(
        "http://47.32.254.89:7000/api/org/register", requestBody);
        console.log(' Organization API response:', response.data);
        console.log('Request : ', requestBody)
      if (response.data.message && response.data.message.code==='MHC-0200') {
        console.log("Registration Data", response.data);
        alert(response.data.message.description);
        navigate('/organization-details')
      } else {
        console.log('Request : ', requestBody)
        console.log('Error Registering:',response.data.message)
        //alert(`Error: ${response.data.message.description}`);
      }
    } catch (error) {
     // console.error("Error registering:", error);
      console.log(requestBody)
    }
  };

//   return (
//     <div className="d-flex align-items-center justify-content-center vh-100">
//       <div className="row">
//         <div className="container col-md-12">
//           <h1 className="mt-1">Details</h1>
//           <hr></hr>
//           <FormGroup>
//             <form onSubmit={handleSubmit}>
//               <div className="mt-2">
//                 <label htmlFor="organizationName" className="label">
//                   Organization Name
//                 </label>
//                 <input
//                   type="text"
//                   id="organizationName"
//                   name="organizationName"
//                   value={formData.organizationName}
//                   onChange={(e) =>
//                     handleInputChange("organizationName", e.target.value)
//                   }
//                   placeholder="OrganizationName"
//                 />
//               </div>

//               <div className="mt-2">
//                 <label htmlFor="organizationType" className="label">
//                   Organization Type
//                 </label>
//                 <select
//                   id="organizationType"
//                   name="organizationType"
//                   value={formData.organizationType}
//                   onChange={(e) =>
//                     handleInputChange("organizationType", e.target.value)
//                   }
//                   className="form-control"
//                 >
//                   <option value="" disabled>
//                     Select Organization Type
//                   </option>
//                   {organizationType.length > 0 &&
//                     organizationType.map((type) => (
//                       <option key={type.id} value={type.value}>
//                         {type.value}
//                       </option>
//                     ))}
//                 </select>
//               </div>

//               <div className="mt-2">
//                 <label htmlFor="email" className="label">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   placeholder="Email"
//                 />
//               </div>
//               <div className="mt-2">
//                 <label htmlFor="email" className="label">
//                   Mobile Number
//                 </label>
//                 <input
//                   type="text"
//                   id="mobileNumber"
//                   name="mobileNumber"
//                   value={formData.mobileNumber}
//                   onChange={(e) =>
//                     handleInputChange("mobileNumber", e.target.value)
//                   }
//                   placeholder="Mobile Number"
//                 />
//               </div>
//               <div className="mt-2">
//                 <label htmlFor="websiteUrl" className="label">
//                   Website URL
//                 </label>
//                 <input
//                   type="text"
//                   id="websiteUrl"
//                   name="websiteUrl"
//                   value={formData.websiteUrl}
//                   onChange={(e) =>
//                     handleInputChange("websiteUrl", e.target.value)
//                   }
//                   placeholder="Website URL"
//                 />
//               </div>

//               <div className="mt-2">
//                 <label htmlFor="websiteURL" className="label">
//                   HIPPA Privacy Officer Name
//                 </label>
//                 <input
//                   type="text"
//                   id="hippaPrivacyOfficerName"
//                   name="hippaPrivacyOfficerName"
//                   value={formData.hippaPrivacyOfficerName}
//                   onChange={(e) =>
//                     handleInputChange("hippaPrivacyOfficerName", e.target.value)
//                   }
//                   placeholder="HIPPA Privacy Officer Name"
//                 />
//               </div><br></br>
//               <div className="mt-2">
//                 <button className="btn btn-success">Submit</button>
//               </div>
//               <br></br>
             
//               {error && <p style={{ color: "red" }}>{error}</p>}
//             </form>
//           </FormGroup>
//           <ToastContainer/>
//         </div>
//       </div>
//     </div>
//   );
// };
return (
  <div className="d-flex align-items-center justify-content-center vh-90">
    <div className="row">
      <div className="container col-md-12">
        <h3 className="mt-1">Register A Fresh Organization</h3>
        <hr></hr>
        <FormGroup>
          <form onSubmit={handleSubmit}>
            <div className="row w-100 ">
              <div className='col-md-6 mb-2'>
                <TextField id="outlined-basic-1" label="OrganizationName" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })} />
              </div>
              <div className='col-md-6 mb-1'>
                <TextField id="outlined-basic-2" label="Organization Email" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
            </div>
            <div className="row w-100 ">
              <div className="col-md-4 mt-3 mb-2">
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="OrganizationType">Organization Type</InputLabel>
                  <Select
                    labelId="OrganizationType"
                    id="OrganizationType"
                    label="OrganizationType"
                    value={formData.organizationType}
                    onChange={(e) => handleInputChange("organizationType", e.target.value)}
                    MenuProps={{ style: { maxHeight: '300px' } }} // Set your preferred maxHeight
                  >
                    {organizationType.length > 0 &&
                      organizationType.map((type) => (
                        <MenuItem key={type.id} value={type.value}>
                          {type.value}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>

              <div className='col-md-4 mt-3'>
                <TextField id="outlined-basic-1" label="Mobile Number" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })} />
              </div>
              <div className='col-md-4 mt-3'>
                <TextField id="outlined-basic-2" label="Website URL" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })} />
              </div>
            </div>

            <div className="row w-100 ">
              <div className='col-md-4 mt-3'>
                <TextField id="outlined-basic-1" label="HIPPA Officer Name" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, hippaPrivacyOfficerName: e.target.value })} />
              </div>
              <div className='col-md-4 mt-3'>
                <TextField id="outlined-basic-1" label="Duration" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
              </div>
              <div className='col-md-4 mt-3'>
                <TextField id="outlined-basic-2" label="Start Time" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} />
              </div>
            </div>

            <div className="row w-100">
              <div className="mt-3">
                <label htmlFor="organizationType" className="label">
                  Access Control
                </label>
              </div>
              <div className="col-md-4 mt-2">
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="proximity-label">Proximity</InputLabel>
                  <Select
                    labelId="proximity-label"
                    id="proximity"
                    label="Proximity"
                    value={formData.proximityVerification}
                    onChange={(e) => handleInputChange('proximityVerification', e.target.value)}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-4 mt-2">
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="q15-access-label">Q15</InputLabel>
                  <Select
                    labelId="q15-access-label"
                    id="q15Access"
                    label="Q15"
                    value={formData.q15Access}
                    onChange={(e) => handleSelectChange('q15Access', e.target.value)}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-4 mt-2">
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="geofencing-label">Geo Fencing</InputLabel>
                  <Select
                    labelId="geofencing-label"
                    id="geofencing"
                    label="Geo Fencing"
                    value={formData.geofencing}
                    onChange={(e) => handleSelectChange('geofencing', e.target.value)}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="d-flex gap-3 justify-content-end mt-4">
              <Button label="Cancel" onClick={() => { navigate('/organization-details') }} severity="secondary" style={{ color: '#000', backgroundColor: '#fff', border: '2px solid #0f3995' }} />
              <Button label="Save" style={{ backgroundColor: '#0f3995' }} onClick={handleSubmit} />
            </div>
            <br></br>

            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </FormGroup>
       
      </div>
    </div>
  </div>
);
};

export default OrganizationForm;