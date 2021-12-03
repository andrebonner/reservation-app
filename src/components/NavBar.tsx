import React from "react";
import { Link } from "react-router-dom";

type NavBarProps = {
  auth: string;
};

const NavBar: React.FC<NavBarProps> = ({ auth }) => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Reservation
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul
              className={
                "navbar-nav me-auto mb-2 mb-lg-0" +
                (auth ? " visible" : " invisible")
              }
            >
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/flights"
                >
                  Flight
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/hotels">
                  Hotel
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
            </ul>
            <span
              className={"navbar-text" + (!auth ? " invisible" : " visible")}
              style={{ display: auth ? "" : "none" }}
            >
              <a
                className="nav-link"
                href="/"
                onClick={(e) => sessionStorage.removeItem("Token")}
              >
                Logout
              </a>
            </span>
            <span
              className={"navbar-text" + (auth ? " invisible" : " visible")}
              style={{ display: auth ? "none" : "" }}
            >
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
