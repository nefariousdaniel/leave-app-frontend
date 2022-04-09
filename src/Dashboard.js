import React from "react";
import {handlelogout} from "./SharedComponents/Navbar";

async function handleCloseCompany(){
    if(!window.confirm("Do you want to Close your company - This will lead to all data being deleted.")) return;

    let response = await fetch("https://831790nvce.execute-api.ap-south-1.amazonaws.com/dev/api/closecompany", {
        method: "DELETE",
        body: JSON.stringify({token: localStorage.getItem("token")}),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: "cors"
    });
    response = await response.json();
    if (response.status === "OK") {
        alert(response.message);
        handlelogout();
    }
    else alert(response.message);
    
}

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = JSON.parse(localStorage.getItem("user_details"));
    }
    

    

    CloseCompanyComponent() {
        if(localStorage.getItem('is_admin') === "true"){
            return <li className="list-group-item d-flex justify-content-between align-items-start"><button className="btn btn-danger btn-sm" onClick={()=>{handleCloseCompany()}}>Close Company</button></li>
        }
        else{
            return null
        }
    }
    
    render(){
        return (
            <div className="Dashboard container">
                <h1 className="my-4">Dashboard</h1>
        
                <div className="container d-flex gap-2">
                    <div className="card col-lg-6 col-12">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Full Name</div>
                                    {this.state.fullname}
                                </div>    
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Company</div>
                                    {this.state.company[0].name}
                                </div>    
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Company Address</div>
                                    {this.state.company[0].address}
                                </div>    
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Is Admin</div>
                                    {this.state.is_admin.toString()}
                                </div>    
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">User ID</div>
                                    {this.state._id}
                                </div>    
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Company ID</div>
                                    {this.state.company_id}
                                </div>    
                            </li>
                            <this.CloseCompanyComponent />
                            
                            
                        </ul>
                    </div>
                    
                </div>

            </div>
        )
    }


    
}

export default Dashboard;
