import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Pagination } from "react-bootstrap";
import "./staff.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStaff,
  deleteStaffDetails,
  updateStaffDetails,
} from "../../slices/thunk";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Table,
  FormGroup,
  Form,
} from "reactstrap";
import { FaSearch } from "react-icons/fa";
//import Loader from "../../components/loader/Loader";
// interface FormData {
//   firstName: string;
//   middleName: string;
//   lastName: string;
//   dateofBirth: string;
//   ssn: string;
//   npi: string;
//   addressLine1: string;
//   addressLine2: string;
//   city: string;
//   state: string;
//   zip: string;
//   mobilePhone: string;
//   email: string;
//   gender: string;
//   country: string;
//   role: string;
//   speciality: string;
//   startDate: string;
//   active:string;
//   userType:string;
// }

const Staff: React.FC = () => {
  const [search, setSearch] = useState("");
  //const [selectStaffId, setSelectStaffId] = useState<string | null>(null);
  const dispatch = useDispatch<any>();
  const { staffData, loading } = useSelector((state: any) => state.Staff);
  const { organization } = useSelector((state: any) => state.Login);
  //const [editModal, setEditModal] = useState(false);
  const navigate = useNavigate();
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // const [formData, setFormData] = useState<FormData>({
  //   firstName: " ",
  //   middleName: " ",
  //   lastName: " ",
  //   dateofBirth: " ",
  //   ssn: " ",
  //   npi: " ",
  //   addressLine1: " ",
  //   addressLine2: " ",
  //   city: " ",
  //   state: " ",
  //   zip: " ",
  //   mobilePhone: " ",
  //   email: " ",
  //   gender: " ",
  //   country: " ",
  //   role: " ",
  //   speciality: " ",
  //   startDate: " ",
  //   active:" ",
  //   userType:"",
  // });

  useEffect(() => {
    getAllStaff(dispatch, organization);
  }, [dispatch, organization]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStaffData =
    staffData && staffData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const renderPageNumbers = () => {
    const totalPages = Math.ceil(staffData.length / itemsPerPage);

    // Define the number of page numbers to show
    const pageNumbersToShow = Math.min(5, totalPages);

    let startPage: any;
    let endPage: any;

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

  const handleDelete = async (username: string) => {
    const confirmDelete = window.confirm("Are You Sure Do You Want To Delete?");
    if (confirmDelete) {
      try {
        await dispatch(deleteStaffDetails(username, organization));
        toast.success("Staff Details deleted successfully");
      } catch (error) {
        toast.error("Failed to delete organization");
      }
    }
  };

  // const handleSaveChanges = () => {
  //   console.log("Form Data:", formData);
  //   if (!selectStaffId) {
  //     console.log("Selected staff ID is not found");
  //     return;
  //   }

  //   const updatedStaffFields = {
  //     id: selectStaffId,
  //     name: [
  //       {
  //         use: formData.middleName,
  //         given: formData.firstName,
  //         family: formData.lastName,
  //       },
  //     ],
  //     gender: formData.gender,
  //     email: formData.email,
  //     role: formData.role,
  //     organization,
  //     startDate: formData.startDate,
  //     speciality: [formData.speciality],
  //     dateofBirth: formData.dateofBirth,
  //     ssn: formData.ssn,
  //     npi: formData.npi,
  //     userType:formData.userType,
  //     contact: [
  //       {
  //         address: [
  //           {
  //             addressLine1: formData.addressLine1,
  //             addressLine2: formData.addressLine2,
  //             city: formData.city,
  //             state: formData.state,
  //             country: formData.country,
  //             zip: formData.zip,
  //           },
  //         ],
  //         mobilePhone:formData.mobilePhone,
  //       },
  //     ],
  //     active:formData.active,
  //   };
  //   console.log("Before Update:",staffData)
  //   dispatch(updateStaffDetails(selectStaffId, updatedStaffFields, setEditModal, organization));
  //   console.log('After Update:',updatedStaffFields);
  //   setEditModal(false);
  // };

  // const handleClick = (selectStaff: any) => {
  //   console.log("Clicked Staff Details:", selectStaff);
  //   if (selectStaff) {
  //     const staffId = selectStaff.id || "";
  //     setSelectStaffId(staffId);
  //     console.log("Staff ID:", staffId);
  //     setFormData({
  //       firstName: selectStaff.name[0]?.given || "",
  //       middleName: selectStaff.name[0]?.use || "",
  //       lastName: selectStaff.name[0]?.family || "",
  //       dateofBirth: selectStaff.dateofBirth || "",
  //       ssn: selectStaff.ssn || "",
  //       npi: selectStaff.npi || "",
  //       addressLine1: selectStaff.contact[0]?.address[0]?.addressLine1 || "",
  //       addressLine2: selectStaff.contact[0]?.address[0]?.addressLine2 || "",
  //       city: selectStaff.contact[0]?.address[0]?.city || "",
  //       state: selectStaff.contact[0]?.address[0]?.state || "",
  //       zip: selectStaff.contact[0]?.address[0]?.zip || "",
  //       mobilePhone: selectStaff.contact[0]?.mobilePhone || "",
  //       email: selectStaff.email || "",
  //       gender: selectStaff.gender || "",
  //       country: selectStaff.contact[0]?.address[0]?.country || "",
  //       role: selectStaff.role || "",
  //       speciality: selectStaff.speciality[0] || "",
  //       startDate: selectStaff.startDate || "",
  //       active:selectStaff.active || " ",
  //       userType:selectStaff.userType|| " ",
  //     });
  //     setEditModal(true)
  //   }
  //   else {
  //     console.error('Invalid staff data:', selectStaff);
  //   }
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  console.log("search", search);
  return (
    <div className="container m5 p3" style={{ width: "90%" }}>
      <div className="row">
        <div className="col-md-9">
            <h2>All Staff List</h2>
            <FaPlus
              data-bs-target="#exampleModal"
              style={{ cursor: "pointer",position:'absolute',fontSize:'20px' }}
              onClick={() => navigate("/staff-register")}
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
          disabled={currentPage === Math.ceil(staffData.length / itemsPerPage)}
        />
      </Pagination>
      <Table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Staff Name</th>
            <th scope="col">Staff ID</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">SSN</th>
            <th scope="col">Job Title</th>
            <th scope="col">Role</th>
            {/* <th scope="col">Email</th> */}
            <th scope="col" className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentStaffData
            .filter(
              (staff: any) =>
                staff.name[0].given
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                staff.dateofBirth.toString().includes(search) || 
                staff.ssn.toLowerCase().includes(search.toLowerCase()) ||
                staff.email.toLowerCase().includes(search.toLowerCase()) ||
                staff.role.toLowerCase().includes(search.toLowerCase()) ||
                staff.userType.toLowerCase().includes(search.toLowerCase())
            )
            .map((staff: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/staff-update/${staff.id}`, { state: staff })
                  }
                >
                  {staff.name[0].given} {staff.name[0].family}
                </td>
                <td>{staff.id}</td>
                <td>{staff.dateofBirth}</td>
                <td>{staff.ssn}</td>
                <td>{staff.userType}</td>
                <td>{staff.role}</td>
                {/* <td>{staff.email}</td> */}
                <td className="text-center">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-danger"
                    onClick={() => handleDelete(staff.username)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* <Modal isOpen={editModal} toggle={() => setEditModal(false)} centered>
          <ModalHeader toggle={() => setEditModal(false)}>
            <h3>Staff Details</h3>
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
                <label
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
                />
                <label
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
                />
                <label
                  htmlFor="npi"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  NPI#
                </label>
                <input
                  type="text"
                  id="npi"
                  name="npi"
                  placeholder="Enter NPI"
                  value={formData.npi}
                  onChange={handleChange}
                />
                <label
                  htmlFor="phoneNumber"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  PhoneNumber
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter PhoneNumber"
                  value={formData.mobilePhone}
                  onChange={handleChange}
                />

                <label
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
                />
                <label
                  htmlFor="dateofBirth"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  Date Of Birth
                </label>
                <input
                  type="text"
                  id="dateofBirth"
                  name="dateofBirth"
                  placeholder="Enter BirthDate"
                  value={formData.dateofBirth}
                  onChange={handleChange}
                />
                <label
                  htmlFor="startDate"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  Start Date
                </label>
                <input
                  type="text"
                  id="startDate"
                  name="startDate"
                  placeholder="Enter Start Date"
                  value={formData.startDate}
                  onChange={handleChange}
                />
                <label
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
                  value={formData.zip}
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
                  htmlFor="role"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  placeholder="Enter Role"
                  value={formData.role}
                  onChange={handleChange}
                />
                <label
                  htmlFor="speciality"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  Speciality
                </label>
                <input
                  type="text"
                  id="speciality"
                  name="speciality"
                  placeholder="Enter Speciality"
                  value={formData.speciality}
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
  );
};

export default Staff;
