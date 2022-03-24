import { Link } from "react-router-dom";
import React from "react";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Leave App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <NavLinks></NavLinks>
          </div>
        </div>
      </nav>
    );
  }
}


function NavLinks() {
  if (!localStorage.getItem("token")) {
    return (
      <div className="navbar-nav">
        <Link className="nav-link" to="/Register">Register</Link>
        <Link className="nav-link" to="/Login">Login</Link>
      </div>
    )
  }
  else {
    return (
      <div className="navbar-nav">
        <Link className="nav-link" to="/Dashboard">Dashboard</Link>
        <Link className="nav-link" to="/UserControl">User Control</Link>
        <Link className="nav-link" to="/LeaveControl">Leave Control</Link>
        <a onClick={handlelogout} href="/noRoute" className="nav-link text-danger">Logout</a>
      </div>
    )
  }
}

function handlelogout(event){
  event.preventDefault();
  localStorage.removeItem("token");
  localStorage.removeItem("user_details");
  localStorage.removeItem("user_id");
  localStorage.removeItem("is_admin");
  window.location.href = "/";
}

export default Navbar;
