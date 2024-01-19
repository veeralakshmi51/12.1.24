import React, { useEffect, useState } from "react";
import {
  getAllOrganizationDetails,
  deleteOrganizationDetails,
} from "../../slices/organizationDetails/thunk";
import { useDispatch, useSelector } from "react-redux";
//import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import Loader from "../../components/loader/Loader";
import { FaPlus, FaSearch } from "react-icons/fa";
interface FormData {
  organizationName: string;
  email: string;
  mobileNumber: string;
  websiteUrl: string;
  organizationType: string;
  hippaPrivacyOfficerName: string;
  id: string;
  proximityVerification: string;
  geofencing: string;
  q15Access: string;
  starttime: string;
  duration: string;
}

const Organization: React.FC = () => {
  // const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch<any>();
  const { organizationDetails, loading } = useSelector(
    (state: any) => state.Organization
  );
  const navigate = useNavigate();
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(organizationDetails.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const records =
    organizationDetails && organizationDetails?.slice(firstIndex, lastIndex);
  const numbers = [...Array(totalPages).keys()].map((num) => num + 1);
  const [editModal, setEditModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    organizationName: "",
    email: "",
    mobileNumber: "",
    websiteUrl: "",
    hippaPrivacyOfficerName: "",
    organizationType: "",
    proximityVerification: "",
    geofencing: "",
    q15Access: "",
    starttime: "",
    duration: "",
  });

  useEffect(() => {
    dispatch(getAllOrganizationDetails());
  }, [dispatch]);

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changecurrentpage(page: number) {
    setCurrentPage(page);
  }

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  //   const handleSaveChanges = () => {
  //     console.log("Selected organization ID:", selectedOrganizationId);
  //     console.log("Form data:", formData);

  //     if (!selectedOrganizationId) {
  //         console.error("Selected organization ID not found");
  //         return;
  //     }

  // const updatedFields = {
  //   id:"",
  //   organizationdetails: [
  //     {
  //       name: formData.organizationName,
  //       type: formData.organizationType
  //     }
  //   ],
  //   email: formData.email,
  //   websiteUrl: formData.websiteUrl,
  //   hippaprivacyofficer: [
  //     {
  //      name: formData.hippaPrivacyOfficerName
  //     }
  //     ],
  //   mobileNumber:formData.mobileNumber,
  // };
  // console.log("BeforeUpdate:",organizationDetails)
  // dispatch(updateOrganizationDetails(selectedOrganizationId, updatedFields));
  // console.log("After Upadate",updatedFields)
  // setEditModal(false);
  // };
  // const handleClick = (organization: any) => {
  //   console.log("Clicked Organization:", organization);
  //   const organizationDetails = organization.organizationdetails && organization.organizationdetails[0];
  //   console.log("Organization Details:", organizationDetails);

  //   if (organizationDetails) {
  //     const organizationId = organization.id || "";
  //     console.log("Organization ID from organizationDetails:", organizationId);
  //     setSelectedOrganizationId(organizationId);
  //     setFormData({
  //       organizationName: organizationDetails.name || "",
  //       email: organization.email || "",
  //       mobileNumber: organization.mobileNumber || "",
  //       websiteUrl: organization.websiteUrl || "",
  //       organizationType:organizationDetails.type || '',
  //     hippaPrivacyOfficerName: organization.hippaprivacyofficer[0]?.name || "",
  //       id: organization.id || "",
  //       proximityVerification:organization.proximityVerification || "",
  //       geofencing: organization.geofencing || "",
  //       q15Access : organization.q15Access || "",
  //     });
  //     console.log("Selected Organization ID after setting:", organizationId);
  //     setEditModal(true);
  //   } else {
  //     console.error("Organization details or ID not found:", organization);
  //   }
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleDelete = async (organizationId: string) => {
    const confirmDelete = window.confirm("Are You sure Do You want To Delete?");
    if (confirmDelete) {
      try {
        await dispatch(deleteOrganizationDetails(organizationId));
        alert("Organization Details deleted successfully");
      } catch (error) {
        alert("Failed to delete organization");
      }
    }
  };
  const columnStyle = {
    maxWidth: "150px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
  return (
    <div className="container mt-5" style={{ width: "90%" }}>
      {loading && <Loader />}
      <div className="row">
        <div className="col-md-9">
          <h2>Organization Details</h2>
          <FaPlus
            data-bs-target="#exampleModal"
            style={{
              cursor: "pointer",
              position: "absolute",
              fontSize: "20px",
            }}
            onClick={() => navigate("/organization-form")}
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
      <br />
      <hr />
      <br />
      <nav className="d-flex justify-content-end">
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prevPage}>
              Prev
            </a>
          </li>
          {numbers.map((num, index) => (
            <li key={index} className="page-item">
              <a
                href="#"
                className={`page-link ${currentPage === num ? "active" : ""}`}
                onClick={() => changecurrentpage(num)}
              >
                {num}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
      <br />
      <Table>
        <thead>
          <tr>
            <th scope="col" className="text-center">
              S.No #
            </th>
            <th scope="col" className="text-center">
              Organization Name
            </th>
            <th scope="col" className="text-center">
              Organization Type
            </th>
            {/* <th scope="col" className="text-center">Organization ID</th> */}
            {/* <th scope="col" className="text-center">Email</th> */}
            {/* <th scope="col" className="text-center">Mobile Number</th> */}
            {/* <th scope="col" className="text-center">Website URL</th> */}
            <th scope="col" className="text-center">
              Hippa Officer Name
            </th>
            <th scope="col" className="text-center">
              Proximity
            </th>
            <th scope="col" className="text-center">
              Q15 Access
            </th>
            <th scope="col" className="text-center">
              GeoFencing
            </th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
        {records
            .filter((organization: any) =>
              Object.values(organization.organizationdetails?.[0] || {})
                .some((value) =>
                  String(value).toLowerCase().includes(search.toLowerCase())
                ) ||
              organization.hippaprivacyofficer
                .some((officer: any) =>
                  String(officer.name).toLowerCase().includes(search.toLowerCase())
                )
            )
            .map((organization: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/organization-update/${organization.id}`,{state:organization})
                  }
                >
                  {organization.organizationdetails?.[0]?.name || ""}
                </td>
                <td style={columnStyle}>
                  {organization.organizationdetails?.[0]?.type || ""}
                </td>
                {/* <td >{organization.id || ""}</td> */}
                {/* <td >{organization.email || ""}</td> */}
                {/* <td >{organization.mobileNumber || ""}</td> */}
                {/* <td >{organization.websiteUrl || ""}</td> */}
                <td>
                  {organization.hippaprivacyofficer?.length > 0
                    ? organization.hippaprivacyofficer[0]?.name || ""
                    : ""}
                </td>
                <td className="text-center">
                  {organization.proximityVerification === "Yes" ? (
                    <FontAwesomeIcon icon={faCheck} color="green" />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} color="red" />
                  )}
                </td>
                <td className="text-center">
                  {organization.q15Access === "Yes" ? (
                    <FontAwesomeIcon icon={faCheck} color="green" />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} color="red" />
                  )}
                </td>
                <td className="text-center">
                  {organization.geofencing === "Yes" ? (
                    <FontAwesomeIcon icon={faCheck} color="green" />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} color="red" />
                  )}
                </td>
                <td className="text-center">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-danger"
                    onClick={() => handleDelete(organization.id)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* <Modal isOpen={editModal} toggle={() => setEditModal(false)} centered>
            <ModalHeader toggle={() => setEditModal(false)}>
              Organization Details
            </ModalHeader>
            <ModalBody>
              <div>
                <div className="form-control">
                  <label htmlFor="organizationName" className="floating-label">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    name="organizationName"
                    placeholder="Enter Organization Name"
                    value={formData.organizationName}
                    onChange={handleChange}
                  />
                  <label htmlFor="email" className="floating-label">
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
                  <label htmlFor="mobileNumber" className="floating-label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    placeholder="Enter Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                  <label htmlFor="websiteUrl" className="floating-label">
                    Website URL
                  </label>
                  <input
                    type="text"
                    id="websiteUrl"
                    name="websiteUrl"
                    placeholder="Enter Website URL"
                    value={formData.websiteUrl}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="hippaPrivacyOfficer"
                    className="floating-label"
                  >
                    Hippa Privacy Officer Name
                  </label>
                  <input
                    type="text"
                    id="hippaPrivacyOfficerName"
                    name="hippaPrivacyOfficerName"
                    placeholder="Enter Privacy Officer Name"
                    value={formData.hippaPrivacyOfficerName}
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

export default Organization;
