import React from "react";
import {handlelogout} from "./SharedComponents/Navbar";

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = JSON.parse(localStorage.getItem("user_details"));
    }
    

    async handleCloseCompany(){
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
    
    render(){
        return (
            <div className="Dashboard container">
                <h1 className="my-4">Dashboard</h1>
        
                <div className="container d-flex gap-2">
                    <div className="card col-6">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Full Name: {this.state.fullname}</li>
                            <li className="list-group-item">Company: {this.state.company[0].name}</li>
                            <li className="list-group-item">Company Address: {this.state.company[0].address}</li>
                            <li className="list-group-item">Is Admin: {this.state.is_admin.toString()}</li>
                            <li className="list-group-item">User ID: {this.state._id}</li>
                            <li className="list-group-item">Company ID: {this.state.company_id}</li>
                            {
                                ()=>{
                                    if(localStorage.getItem('is_admin') === "true"){
                                        return (<li className="list-group-item"><button className="btn btn-danger btn-sm" onClick={()=>{this.handleCloseCompany()}}>Close Company</button></li>)
                                    }
                                }
                            }
                            
                            
                        </ul>
                    </div>
                    
                </div>

            </div>
        )
    }


    
}

export default Dashboard;
