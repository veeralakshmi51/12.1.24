import axios from "axios";
import React, { useEffect, useState } from "react";
import "./beacon.css";
import Scan from "./Scan";
import { Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const QRCodeScanner = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const getAPI = async () => {
    try {
      const res = await axios.get("http://47.32.254.89:7000/api/getAll");
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  const deleteAPI = async (id: any) => {
    const del = window.confirm(`do you want to miss this data?  ${id}`);
    if (del) {
      try {
        const res = await axios.delete(
          `http://47.32.254.89:7000/api/macDetails/${id}`
        );
        alert("Oops...Data was deleted.");
        getAPI();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Oh god you save this data.");
    }
  };

  useEffect(() => {
    getAPI();
  }, []);
  // Calculate current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber:any) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 d-flex  align-items-center">
          Add a beacon with QR Scan
        </div>
        <div className="col-md-2">
          <Scan getAPI={getAPI} />
        </div>
      </div>
      <br />
      <div className="row mb-2">
        <div className="text-center mb-2"> Beacon Details</div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">DEVICE NAME</th>
              <th scope="col">DEVICE ID</th>
              <th scope="col">DELETE</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {currentData.map((item: any, index: any) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.deviceName}</td>
                  <td>{item.deviceId}</td>
                  <td className="text-center">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-danger"
                    onClick={() => deleteAPI(item.id)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="row">
        <Pagination className='d-flex justify-content-center align-items-center '>
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default QRCodeScanner;
