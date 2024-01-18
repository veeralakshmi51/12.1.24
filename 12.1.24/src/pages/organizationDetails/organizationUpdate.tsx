import React, { useEffect } from "react";
import  TextField  from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateOrganizationDetails } from "../../slices/thunk";
import { Button } from 'primereact/button'


interface FormData{
  id:string;
  organizationName: string;
  email: string;
  mobileNumber: string;
  websiteUrl: string;
  //organizationType:string;
  hippaPrivacyOfficerName: string;
  //proximityVerification: string;
  //geofencing: string;
  //q15Access: string;
  duration:string;
  starttime:string;
}

const OrganizationUpdate=()=>{
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const params = useParams();
  const location=useLocation();
  //const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | null>(null)
  const { organizationDetails } = useSelector((state: any) => state.Organization);
  const {state:organization}=location;
  const [formData, setFormData] = useState<FormData>({
    id:"",
    organizationName: "",
    email: "",
    mobileNumber: "",
    websiteUrl: "",
    //organizationType:"",
    hippaPrivacyOfficerName: "",
    //proximityVerification: "",
    //geofencing: "",
    //q15Access: "",
    duration:"",
    starttime:"",
  });
  useEffect(()=>{
    if(location.state){
      setFormData({
        id:location.state?.id|| "",
        organizationName: location.state?.organizationDetails[0]?.name||"",
        email:location.state?.email|| "",
        mobileNumber: location.state?.mobileNumber||"",
        websiteUrl: location.state?.websiteUrl||"",
        //organizationType:location.state?.organizationDetails[0].type||"",
        hippaPrivacyOfficerName: location.state?.hippaprivacyofficername||"",
        //proximityVerification: location.state?.proximityVerification||"",
        //geofencing: location.state?.geofencing||"",
        //q15Access: location.state?.q15Access||"",
        starttime:location.state?.starTtime||"",
        duration:location.state?.duration||"",
      })
    }
  },[location.state])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSaveChanges = () => {
    console.log("Selected organization ID:", !params?.id);
    console.log("Form data:", formData);

    if (!params.id) {
        console.error("Selected organization ID not found");
        return;
    }

const updatedFields = {
  id:params?.id,
  organizationdetails: [
    {
      name: formData.organizationName,
      //type: formData.organizationType
    }
  ],
  email: formData.email,
  websiteUrl: formData.websiteUrl,
  shift: {
    duration: formData.duration,
    startTime: formData.starttime,
  },
  hippaprivacyofficer: [
    {
     name: formData.hippaPrivacyOfficerName
    }
    ],
  mobileNumber:formData.mobileNumber,
};
console.log("BeforeUpdate:",organizationDetails)
dispatch(updateOrganizationDetails(params?.id, updatedFields));
console.log("After Upadate",updatedFields)
alert('Organization Details Updated Successfully');
navigate('/organization-details')
};
return(
  <div className='row w-100' style={{marginTop:'60px'}}>
    <div className='col-md-2'></div>
    <div className='col-md-8'>
    <h2 className='mb-2 text-center' >Organization Details Update Here!</h2>
    <hr></hr>
    <div className="row w-100 " style={{marginTop:'30px'}}>
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-1" label="Organization Name" variant="outlined" fullWidth onChange={handleChange} value={formData.organizationName} name="organizationName"/>
          </div>
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-2" label="Hippa Privacy Officer Name" variant="outlined" fullWidth onChange={handleChange} value={formData.hippaPrivacyOfficerName} name="hippaPrivacyOfficerName"/>
          </div>
           </div>
        <div className="row w-100 ">
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-1" label="Mobile Number" variant="outlined" fullWidth onChange={handleChange} value={formData.mobileNumber} name="mobileNumber"/>
          </div>
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-2" label="Website URL" variant="outlined" fullWidth onChange={handleChange} value={formData.websiteUrl} name="websiteUrl"/>
          </div>
        </div>
        <div className="row w-100 ">
          
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-1" label="Start Time" variant="outlined" fullWidth onChange={handleChange} value={formData.starttime} name="starttime"/>
          </div>
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-2" label="Duration" variant="outlined" fullWidth onChange={handleChange} value={formData.duration} name="duration"/>
          </div>
        </div>
        {/* <div className="row w-100 ">
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-2" label="Q15 Access" variant="outlined" fullWidth onChange={handleChange} value={formData.q15Access} name="q15Access"/>
          </div>
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-3" label="GeoFencing" variant="outlined" fullWidth onChange={handleChange} value={formData.geofencing} name="geofencing"/>
          </div>
        </div> */}
        <div className="row w-100">
        <div className='col-md-12 mb-2'>
            <TextField id="outlined-basic-1" label="Organization Email" variant="outlined" fullWidth onChange={handleChange} value={formData.email} name="email" />
          </div>
          </div>
        <div className="d-flex gap-3 justify-content-end mt-4">
        <Button label="Cancel"  onClick={() => { navigate(-1) }} severity="secondary" style={{color:'#000',backgroundColor:'#fff', border:'2px solid #0f3995'}}/>
            <Button label="Save" style={{ backgroundColor: '#0f3995' }} onClick={handleSaveChanges} />

        </div>
        </div>
</div>
)
}
export default OrganizationUpdate