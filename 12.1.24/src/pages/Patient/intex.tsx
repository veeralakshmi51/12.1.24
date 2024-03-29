import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllPatient,
  updatePatientDetails,
  patientDischarge,
  getAllBed,
} from "../../slices/thunk";
import { FaPlus } from "react-icons/fa";
import { Pagination } from "react-bootstrap";
import { Table } from "reactstrap";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import Button from '@mui/material/Button';
interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  ssn: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  mrNumber: string;
  email: string;
  beaconDevice: string;
  gender: string;
  country: string;
  id: string;
  active: string;
  bedNo:string;
  roomNo:string;
}


const Patient: React.FC = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch<any>();
  const [selectPatientId, setSelectPatientId] = useState<string | null>(null);
  const [editModal, setEditModal] = useState(false);
  const { patientData, loading } = useSelector((state: any) => state.Patient);
  console.log('patient data:',patientData);
  const { bedAssignData=[]} = useSelector((state: any) => state.BedAssign);
  console.log('bed assign data:',bedAssignData);
  const { organization } = useSelector((state: any) => state.Login);
  const navigate = useNavigate();
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    active: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    ssn: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    mrNumber: "",
    email: "",
    beaconDevice: "",
    gender: "",
    country: "",
    bedNo:"",
    roomNo:"",
  });

useEffect(() => {
  const fetchData = async () => {
    await getAllPatient(dispatch, organization);
  };

  fetchData();
}, [dispatch, organization,bedAssignData]);




  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatientData =
    Array.isArray(patientData) &&
    patientData?.slice(indexOfFirstItem, indexOfLastItem);
  const currentPatientDataArray = Array.isArray(currentPatientData)
    ? currentPatientData
    : [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const renderPageNumbers = () => {
    const totalPages = Math.ceil(patientData.length / itemsPerPage);

    const pageNumbersToShow = Math.min(5, totalPages);

    let startPage: number;
    let endPage: number;

    if (totalPages <= pageNumbersToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const middlePage = Math.ceil(pageNumbersToShow / 2);

      if (currentPage <= middlePage) {
        startPage = 1;
        endPage = pageNumbersToShow;
      } else if (currentPage + middlePage >= totalPages) {
        startPage = totalPages - pageNumbersToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - middlePage + 1;
        endPage = currentPage + middlePage - 1;
      }
    }

    return Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
      <Pagination.Item
        key={startPage + index}
        active={startPage + index === currentPage}
        onClick={() => paginate(startPage + index)}
      >
        {startPage + index}
      </Pagination.Item>
    ));
  };
  // const handleSaveChanges = () => {
  //   console.log("Form Data:", formData);
  //   if (!selectPatientId) {
  //     console.error("Selected Patient ID is not found");
  //     return;
  //   }
  //   const updatedPatientFields = {
  //     id: selectPatientId,
  //     basicDetails: [
  //       {
  //         name: [
  //           {
  //             use: formData.middleName,
  //             given: formData.firstName,
  //             family: formData.lastName,
  //           },
  //         ],
  //         ssn: formData.ssn,
  //         mrNumber: formData.mrNumber,
  //         gender: formData.gender,
  //         birthDate: formData.birthDate,
  //       },
  //     ],
  //     email: formData.email,
  //     organization,
  //     contact: [
  //       {
  //         address: [
  //           {
  //             addressLine1: formData.addressLine1,
  //             addressLine2: formData.addressLine2,
  //             city: formData.city,
  //             state: formData.state,
  //             postalCode: formData.postalCode,
  //             country: formData.country,
  //           },
  //         ],
  //       },
  //     ],
  //     beaconDevice: formData.beaconDevice,
  //   };
  //   console.log("Before Update:", patientData);
  //   dispatch(
  //     updatePatientDetails(
  //       selectPatientId,
  //       updatedPatientFields,
  //       //setEditModal,
  //       organization
  //     )
  //   );

  //   console.log("After Update:", updatedPatientFields);
  //   setEditModal(false);
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleClick = (selectedPatient: any) => {
  //   console.log("Clicked patient Details:", selectedPatient);

  //   if (selectedPatient) {
  //     const patientId = selectedPatient.id || "";
  //     setSelectPatientId(patientId);
  //     console.log("Patiend ID:", patientId);
  //     const basicDetails = selectedPatient.basicDetails[0];
  //     const address = selectedPatient.contact[0]?.address[0];

  //     setFormData({
  //       firstName: basicDetails.name[0]?.given || "",
  //       middleName: basicDetails.name[0]?.use || "",
  //       lastName: basicDetails.name[0]?.family || "",
  //       birthDate: basicDetails.birthDate || "",
  //       ssn: basicDetails.ssn || "",
  //       addressLine1: address?.addressLine1 || "",
  //       addressLine2: address?.addressLine2 || "",
  //       city: address?.city || "",
  //       state: address?.state || "",
  //       postalCode: address?.postalCode || "",
  //       mrNumber: basicDetails.mrNumber || "",
  //       email: selectedPatient.email || "",
  //       beaconDevice: selectedPatient.beaconDevice || "",
  //       gender: basicDetails.gender || "",
  //       country: address?.country || "",
  //     });

  //     setEditModal(true);
  //   } else {
  //     console.error("Invalid patient data:", selectedPatient);
  //   }
  // };
  // const handleDischarge = async (id: string) => {
  //   const confirmDelete = window.confirm("Are You Sure Do You Want to Discharge?");
  //   if (confirmDelete) {
  //     try {
  //       await dispatch(patientDischarge(id, organization));
  //       toast.success("Patient Discharged Successfully");
  //     } catch {
  //       toast.error("Failed to Delete Patient Details");
  //     }
  //   }
  // };
  const handleDischarge = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are You Sure Do You Want to Discharge?"
    );
    if (confirmDelete) {
      try {
        await patientDischarge(dispatch, id, organization);
        alert("Patient Discharged Successfully"); 
        window.location.reload();
        navigate("/patient-table");
      } catch {
        toast.error("Failed to Delete Patient Details");
      }
    }
  };



  return (
    <div className="container m5 p3" style={{ width: "90%" }}>
      {loading && <Loader />}

      <div className="row ">
        <div className="col-md-9">
          <h2>All Patient List</h2>
          <FaPlus
            data-bs-target="#exampleModal"
            style={{
              cursor: "pointer",
              position: "absolute",
              fontSize: "20px",
            }}
            onClick={() => navigate("/patient-register")}
          />
        </div>
        <div className="col-md-3">
          <div className="mx-2 search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
        </div>
      </div>
      <br></br>
      <hr></hr>
      <Pagination className="d-flex justify-content-end ">
        <Pagination.Prev
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {renderPageNumbers()}

        <Pagination.Next
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(patientData.length / itemsPerPage)
          }
        />
      </Pagination>
      <Table responsive bordered>
        <thead>
          <tr>
            <th scope="col" className="text-center">
              S.No
            </th>
            <th scope="col" className="text-center">
              patient Name
            </th>
            {/* <th scope="col" className="text-center">patient ID</th> */}
            <th scope="col" className="text-center">
              Date of Birth
            </th>
            <th scope="col" className="text-center">
              Email
            </th>
            {/* <th scope="col" className="text-center">
              SSN
            </th> */}
            {/* <th scope="col" className="text-center">
              Room No
            </th> */}
            <th scope="col" className="text-center">
              Bed No
            </th>
            <th scope="col" className="text-center">
              Beacon Device
            </th>
            {/* <th scope="col">Gender</th> */}
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentPatientDataArray  //patientData
            .filter(
              (patient: any) =>
                patient.basicDetails[0].name[0].given
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                patient.basicDetails[0].birthDate.toString().includes(search) ||
                patient.basicDetails[0].ssn.toString().includes(search) ||
                patient.email.toLowerCase().includes(search.toLowerCase)
            )
            .map((patient: any, index: number) => (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td
                  className="text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/patient-update/${patient.id}`, {
                      state: patient,
                    })
                  }
                >
                  {patient.basicDetails[0].name[0].given}{" "}
                  {patient.basicDetails[0].name[0].family}
                </td>
                {/* <td className="text-center">{patient.id}</td> */}
                <td className="text-center">
                  {patient.basicDetails[0].birthDate}
                </td>
                <td className="text-center">{patient.email}</td>
                {/* <td className="text-center">{patient.basicDetails[0].ssn}</td>
                <td className="text-center">{patient.bedAssignData?.roomNo}</td> */}
                <td className="text-center">{patient.assignedBed}</td>
                <td className="text-center">{patient.beaconDevice}</td>
                {/* <td>{patient.basicDetails[0].gender}</td> */}
                <td className="text-center">
                  <Button
                    onClick={() => handleDischarge(patient.id)}
                   variant="contained" color="success">
                    In Active
                    </Button>

                    {/* <FontAwesomeIcon
                    icon={faUserSlash}
                    className="text-dark"
                    onClick={() => handleDischarge(patient.id)}
                    style={{ cursor: "pointer" }}
                  /> */}
                  
                </td>

              </tr>
            ))}
            
        </tbody>
      </Table>
      
      {/* <Modal isOpen={editModal} toggle={() => setEditModal(false)} centered>
          <ModalHeader toggle={() => setEditModal(false)}>
            <h3>Patient Details</h3>
          </ModalHeader>
          <ModalBody>
            <div>
              <div className="form-control">
                <label
                  htmlFor="firstName"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  FirstName
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <label
                  htmlFor="middleName"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  Middle Name
                </label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  placeholder="Enter Middle Name"
                  value={formData.middleName}
                  onChange={handleChange}
                />
                <label
                  htmlFor="lastName"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {/* <label
                  htmlFor="email"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                /> */}
      {/* <label
                  htmlFor="ssn"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  SSN
                </label>
                <input
                  type="text"
                  id="ssn"
                  name="ssn"
                  placeholder="Enter SSN"
                  value={formData.ssn}
                  onChange={handleChange}
                /> */}
      {/* <label
                  htmlFor="mrNumber"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  MrNumber
                </label>
                <input
                  type="text"
                  id="mrNumber"
                  name="mrNumber"
                  placeholder="Enter MrNumber"
                  value={formData.mrNumber}
                  onChange={handleChange}
                /> */}

      {/* <label
                  htmlFor="gender"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  Gender
                </label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  placeholder="Enter Gender"
                  value={formData.gender}
                  onChange={handleChange}
                /> */}
      {/* <label
                  htmlFor="birthDate"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  Date Of Birth
                </label>
                <input
                  type="text"
                  id="birthDate"
                  name="birthDate"
                  placeholder="Enter BirthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                /> */}
      {/* <label
                  htmlFor="addressLine1"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  AddressLine 1
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  placeholder="Enter Address"
                  value={formData.addressLine1}
                  onChange={handleChange}
                />
                <label
                  htmlFor="addressLine2"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  AddressLine 2
                </label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  placeholder="Enter Address"
                  value={formData.addressLine2}
                  onChange={handleChange}
                />
                <label
                  htmlFor="city"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Enter City"
                  value={formData.city}
                  onChange={handleChange}
                />
                <label
                  htmlFor="state"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  State/Provide
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="Enter State"
                  value={formData.state}
                  onChange={handleChange}
                />
                <label
                  htmlFor="postalCode"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  Zip/Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  placeholder="Enter ZipCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                />

                <label
                  htmlFor="country"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Enter Country"
                  value={formData.country}
                  onChange={handleChange}
                />
                <label
                  htmlFor="deviceId"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  Device ID
                </label>
                <input
                  type="text"
                  id="beaconDevice"
                  name="beaconDevice"
                  placeholder="Enter Device ID"
                  value={formData.beaconDevice}
                  onChange={handleChange}
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="info" onClick={handleSaveChanges}>
              Save Changes
            </Button>{" "}
            <Button color="danger" onClick={() => setEditModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal> */}
    </div>
    // </div>
  );
};

export default Patient;
