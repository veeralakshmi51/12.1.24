import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import {
  getAllBedAssign,
  deleteBedAssignDetails,
} from "../../slices/bedAssign/thunk";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  CardFooter,
  Badge,
  Input,
  Button
} from "reactstrap";
import ReactPaginate from "react-paginate";
import "./bedassign.css";
interface FormData {
  id: string;
  bedId: string;
  pid: string;
  orgId: string;
}
interface Bed {
  id: string;
  roomNo: string;
  bedNo: string;
   orgId: string,
   available:boolean,
}
const BedAssign: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [bedId, setBedId] = useState<string | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [showModal,setShowModal]=useState(false);
  const [search, setSearch] = useState("");
  const { bedAssignData = [], loading } = useSelector(
    (state: any) => state.BedAssign
  );
  const { organization } = useSelector((state: any) => state.Login);
  const { patientData } = useSelector((state: any) => state.Patient);
  const navigate = useNavigate();
  const selectedPatientId = patientData?.id;

  const [bedAssignedData, setBedAssignedData] = useState<FormData>({
    id: "",
    bedId: bedAssignData.bedId,
    pid: selectedPatientId || "",
    orgId: organization,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / perPage);
  const [patients, setPatients] = useState<any[]>([]);
  const handlePatientChange = (selectedPatientId: string) => {
    setBedAssignedData((prevData) => ({ ...prevData, pid: selectedPatientId }));
  };
  const [formData, setFormData] = useState<Bed>({
    id: "",
    roomNo: "",
    bedNo: "",
    orgId:organization,
    available:true,
  });
  const handleSave = async () => {
    const requestBody = {
      bedId: bedId,
      pid: bedAssignedData.pid,
      orgId: bedAssignedData.orgId,
    };

    console.log("Request Payload:", requestBody);

    try {
      const response = await axios.post(
        "http://47.32.254.89:7000/api/Q15Bed/Assign",
        requestBody
      );

      console.log("API bedassign Response:", response.data);

      if (
        response.data.message &&
        response.data.message.code === "MHC - 0200"
      ) {
        alert(response.data.message.description);
        setEditModal(false);
        window.location.reload();
      } else {
        console.error("Error:", response.data.message);
        alert(`Error: ${response.data.message.description}`);
      }
    } catch (error) {
      console.error("API Request Error:", error);
      alert("An error occurred. Please check console for details.");
    } finally {
      setEditModal(false);
    }
  };

  const handleClick = (selectedBed: any) => {
    if (selectedBed) {
      // if (selectedBed.pid) {
      // alert("This Bed Is already assigned");
      // return;
      //}
      const bedAssignId = selectedBed.id || " ";
      setBedId(bedAssignId);
      console.log("Bed Id:", bedAssignId);
      console.log("Clicked details", selectedBed);
      setBedAssignedData({
        id: selectedBed.id,
        bedId: selectedBed.bedId,
        pid: selectedBed.pid,
        orgId: selectedBed.orgId,
      });
      console.log("Responses:", selectedBed);
      setEditModal(true);
    } else {
      console.error("Invalid Data:", selectedBed);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        `http://47.32.254.89:7000/api/patient/get/activePatient/${organization}`
      );
      console.log("Patient API Response:", response.data);
      if (response.data.data && Array.isArray(response.data.data)) {
        setPatients(response.data.data);
      } else {
        console.error("Invalid data format for patients:", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBedAssign(dispatch, organization);
    fetchPatients();
  }, [dispatch, organization, bedAssignedData]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are You Sure Do You Want To Delete?");
    if (confirmDelete) {
      try {
        await dispatch(deleteBedAssignDetails(id, organization));
        alert("Bed Assigned Deleted Successfully");
      } catch {
        alert("Failed to Delete the Details");
      }
    }
  };
  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

const handlePatientClick=(e:React.FormEvent)=>{
  e.preventDefault();
  setShowModal(!showModal)
}
  
  const handleSaveBed = async () => {
    if (!formData.roomNo || !formData.bedNo) {
    alert("Please fill All The Fields");
    return;
  } 
   
  console.log("Organization:", organization);
    const requestBody = {
      id: "",
      roomNo: formData.roomNo,
      bedNo: formData.bedNo,
      orgId:formData.orgId,
      available:formData.available
    };
    try {
      const response = await axios.post(
        "http://47.32.254.89:7000/api/Q15Bed/create",
        requestBody
      );
      console.log("Registered Data:", response.data);
      console.log("Request details:", requestBody);
      console.log('ID:',response.data.data.id)
      if (
        response.data.message &&
        response.data.message.code === "MHC - 0200"
      ) 
      { 
        alert(response.data.message.description);
        setEditModal(false);
        window.location.reload();
      } else {
        console.log("error:", response.data.message);
        alert(`Error:${response.data.message.description}`);
      }
    } catch (error) {
      alert("Room No and Bed No Already Exists");
    }
  };
 
  return (
    <div className="container m15 p3" style={{ width: "90%" }}>
      <div className="row mb-2">
        <div className="col-md-8">
          <div className="heading1">
            <h4>All Bed Details</h4>
            <br />
          </div>
        </div>
        <div className="col-md-4">
          <div className="mx-2">
            <FaPlus
              data-bs-target="#exampleModal"
              style={{ cursor: "pointer" }}
              // onClick={() => navigate("/management/bed-assign")}
              onClick={handlePatientClick}
            />
          </div>
        </div>
      </div>
      <hr></hr>

      {loading ? (
        <Loader />
      ) : (
        <div>
          <Row style={{ display: "flex", flexWrap: "wrap" }}>
            {Array.isArray(bedAssignData) && bedAssignData.length > 0 ? (
              bedAssignData.map((bedassign: any, index: number) => (
                <Col key={index}>
                  <div className="bed-assignment-box">
                    <Card
                      className="mb-3"
                      color="primary"
                      outline
                      style={{
                        width: "180px",
                        height: "180px",
                        padding: "5px",
                        margin: "5px",
                        justifyContent: "flex-start",
                      }}
                    >
                      <CardBody
                        key={index}
                        className="mb-2"
                        onClick={() => handleClick(bedassign)}
                        style={{ cursor: "pointer" }}
                      >
                        <CardTitle tag="h6">
                          RoomNo: {bedassign.roomNo}
                        </CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                          BedNo: {bedassign.bedNo}
                        </CardSubtitle>
                      </CardBody>

                      <CardFooter>
                        <Badge
                          color={bedassign.pid ? "danger" : "success"}
                          tag="h4"
                        >
                          {bedassign.pid ? "Not Available" : "Available"}
                        </Badge>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-danger outline"
                          onClick={() => handleDelete(bedassign.id)}
                          style={{ cursor: "pointer", marginLeft: "40%" }}
                        />
                      </CardFooter>
                    </Card>
                  </div>
                </Col>
              ))
            ) : (
              <p>No bed assignments available.</p>
            )}
          </Row>
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      )}
      <Modal isOpen={editModal} toggle={() => setEditModal(false)}>
        <ModalHeader toggle={() => setEditModal(false)}>Assign Bed For Patient</ModalHeader>
        <ModalBody>
          <div>
            {/* <div className="mx-2 search-container">
              <input
                type="text"
                placeholder="Search..."
                className="search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <FaSearch className="search-icon" />
            </div> */}
            <div className="form-control">
              <label
                htmlFor="patientName"
                className="floating-label"
                style={{ fontWeight: "bold" }}
              >
                Patient Name
              </label>
              <Input
                type="select"
                id="patientName"
                name="pid"
                value={bedAssignedData.pid}
                onChange={(e) => handlePatientChange(e.target.value)}
              >
                <option value="">Select Patient</option>
                {patients
                  .filter((patient: any) =>
                    patient.basicDetails[0].name[0].given
                      .toLowerCase()
                      .includes(search.toLowerCase())
                   || patientData.basicDetails[0].name[0].family.toLowerCase().includes(search.toLowerCase()))
                  .map((patient:any) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.basicDetails[0].name[0].given}{" "}
                      {patient.basicDetails[0].name[0].family}
                    </option>
                  ))}
              </Input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setEditModal(false)}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={showModal} toggle={() => setShowModal(false)} centered>
        <ModalHeader toggle={() => setShowModal(false)}>
          <h3>Bed Assign Details</h3>
        </ModalHeader>
        <ModalBody>
          <div>
            <div className="form-control">
              <label
                htmlFor="roomNo"
                className="floating-label"
                style={{ fontWeight: "bold" }}
              >
                Room No:
              </label>
              <input
                type="text"
                id="roomNo"
                name="roomNo"
                placeholder="Enter Room No"
                value={formData.roomNo}
                onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
              ></input>
              <label
                htmlFor="bedNo"
                className="floating-label"
                style={{ fontWeight: "bold" }}
              >
                Bed No:
              </label>
              <input
                type="text"
                id="bedNo"
                name="bedNo"
                placeholder="Enter Bed No"
                value={formData.bedNo}
                onChange={(e) => setFormData({ ...formData, bedNo: e.target.value })}
              ></input>
              <ModalFooter>
            <Button color="info" onClick={handleSaveBed}>
              Save Changes
            </Button>{" "}
            <Button color="danger" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default BedAssign;
