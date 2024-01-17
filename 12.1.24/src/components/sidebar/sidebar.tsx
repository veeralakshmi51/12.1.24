import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaUserAlt,
  FaSpellCheck,
  FaBuilding,
  FaSignOutAlt,
  FaUserInjured,
  FaUserNurse,
  FaHospitalUser,
  FaHouseUser,
  FaUserFriends,
  FaBroadcastTower,
  FaReceipt,
  FaBed,
  FaUserCog,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";
import Header from "../header";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../../slices/thunk";
interface SidebarProps {
  children: any;
}

const Sidebar = (props: SidebarProps) => {
  const { jwt, userType } = useSelector((state: any) => state.Login);
  // const userType = useSelector((state: any) => state.Login.userType);
  const username = useSelector((state: any) => state.Login.userDetails);
  // cont username = userDetails ? userDetails.username : null;
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const { children } = props;
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: "/organization-details",
      name: "Organization Details",
      icon: <FaBuilding />,
      show: userType === "Super Admin",
    },
    // {
    //   path: "/access-Control",
    //   name: "Access Control",
    //   icon: <FaUserAlt />,
    //   show: userType === "Super Admin",
    // },
    {
      path: "/q15-staff-configuration",
      name: "Q15 Staff Configuration",
      icon: <FaSpellCheck />,
      show: userType === "Admin",
    },
    {
      path: "/staff-table",
      name: "Staff Creation",
      icon: <FaHospitalUser />,
      show: userType === "Admin",
    },
    {
      path: "/patient-table",
      name: "Patient Creation",
      icon: <FaUserFriends />,
      show: userType === "Admin",
    },
    {
      path: "/Beacon-register",
      name: "Beacon Devices",
      icon: <FaBroadcastTower />,
      show: userType === "Admin",
    },
    {
      path: "/q15-report",
      name: "Q15 Report",
      icon: <FaReceipt />,
      show: userType === "Admin",
    },
    {
      path: "/management",
      name: "Management",
      icon: <FaUserCog />,
      show: userType === "Admin",
      onClick: () => setIsSubmenuOpen(!isSubmenuOpen),
      isOpen: isSubmenuOpen,
      submenu: [
        {
          path: "/management/bed-table",
          name: "Bed Assign",
          icon: <FaBed />,
          show: userType === "Admin",
        },
        {
          path: "/management/patient-assign",
          name: "Patient Assign",
          icon: <FaUserInjured />,
          show: userType === "Admin",
        },
      ],
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 1068);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogoutClick = () => {
    console.log(jwt, username);
    const body = {
      jwt,
      username,
    };
    handleLogout(body, navigate);
  };

  return (
    <div className="container1">
      <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            M H C
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} style={{ cursor: "pointer" }} />
          </div>
        </div>
        {menuItem.map(
          (item, index) =>
            item.show && (
              <React.Fragment key={index}>
                <NavLink
                  to={item.path}
                  key={index}
                  className="link"
                  onClick={item.onClick}
                >
                  <div className="icon">{item.icon}</div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    {item.name}
                  </div>
                </NavLink>
                {isOpen &&
                  isSubmenuOpen &&
                  item.submenu &&
                  item.submenu.length > 0 && (
                    <div className="submenu">
                      {item.submenu.map((subItem, subIndex) => (
                        <NavLink
                          to={subItem.path}
                          key={subIndex}
                          className="link"
                        >
                          <div className="icon">{subItem.icon}</div>
                          <div className="link_text">{subItem.name}</div>
                        </NavLink>
                      ))}
                    </div>
                  )}
              </React.Fragment>
            )
        )}

        <div
          className="button d-flex align-item-center justify-content-center"
          style={{ marginTop: "340px" }}
        >
          {isOpen ? (
            <Button
              label="Logout"
              className="w-50 h-20"
              onClick={() => {
                handleLogoutClick();
              }}
            ></Button>
          ) : (
            <div onClick={() => handleLogoutClick()}>
              <FaSignOutAlt style={{ cursor: "pointer" }} />
            </div>
          )}
        </div>
      </div>
      <div
        className="w-100"
        style={{
          marginLeft: isOpen ? "300px" : "50px",
          marginTop: 0,
          overflowY: "auto",
        }}
      >
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
