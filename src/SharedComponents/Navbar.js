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
        <IsAdminNav />
        <a onClick={()=>{handlelogout()}} href="/noRoute" className="nav-link text-danger">Logout</a>
      </div>
    )
  }
}

function IsAdminNav(){
  if(localStorage.getItem("is_admin")==="true"){
    return(
      <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Leave Control
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to="/MyLeaves">My Leaves</Link></li>
            <li><Link className="dropdown-item" to="/UserLeaves">User Leaves</Link></li>
          </ul>
        </li>
    )
  }
  else if(localStorage.getItem("is_admin")==="false"){
    return(
      <Link className="nav-link" to="/MyLeaves">My Leaves</Link>
    )
  }
}

export function handlelogout(){
  localStorage.removeItem("token");
  localStorage.removeItem("user_details");
  localStorage.removeItem("user_id");
  localStorage.removeItem("is_admin");
  window.location.href = "/";
}

export default Navbar;
