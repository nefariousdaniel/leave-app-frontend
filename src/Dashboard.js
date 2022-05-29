import React from "react";
import { handlelogout } from "./SharedComponents/Navbar";
import { useEffect } from "react";
import { useState } from "react";




async function handleCloseCompany() {
    if (!window.confirm("Do you want to Close your company - This will lead to all data being deleted.")) return;

    let response = await fetch("https://831790nvce.execute-api.ap-south-1.amazonaws.com/dev/api/closecompany", {
        method: "DELETE",
        body: JSON.stringify({ token: localStorage.getItem("token") }),
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

export function Dashboard(){
    var [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user_details")));
    useEffect(() => {
        getUserDetails();
    }, [])

    async function getUserDetails(){
        fetch("https://831790nvce.execute-api.ap-south-1.amazonaws.com/dev/api/getuserdetails",{
                method:"POST",
                body:JSON.stringify({"token":localStorage.token}),
                headers:{
                    "Content-Type": "application/json"
                },
                mode: "cors"
            }).then(response=>{return response.json()}).then(data=>{

                if(data.status === "OK"){
                    localStorage.setItem("user_details",JSON.stringify(data.data[0]));
                    localStorage.setItem("user_id",data.data[0]._id);
                    localStorage.setItem("is_admin",data.data[0].is_admin);
                    setUserInfo(data.data[0]);
                }
                
            })
            
    }
    



    
    



    function CloseCompanyComponent() {
        if (localStorage.getItem('is_admin') === "true") {
            return <li className="list-group-item d-flex justify-content-between align-items-start"><button className="btn btn-danger col-12" onClick={() => { handleCloseCompany() }}>Close Company</button></li>
        }
        else {
            return null
        }
    }

    return (
        <div className="Dashboard container mb-3">
            <h1 className="my-4">Dashboard</h1>

            <div className="card col-lg-6 col-12">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Full Name</div>
                                {userInfo.fullname}
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Company</div>
                                {userInfo.company[0].name}
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Company Address</div>
                                {userInfo.company[0].address}
                            </div>
                        </li>
                        {/* <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Is Admin</div>
                                {userInfo.is_admin.toString()}
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">User ID</div>
                                {userInfo._id}
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Company ID</div>
                                {userInfo.company_id}
                            </div>
                        </li> */}

                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <b>Leaves Balance</b>
                            <span class="badge bg-primary rounded-pill">{userInfo.leave_balance}</span>
                        </li>
                        <CloseCompanyComponent />


                    </ul>
                </div>

        </div>
    )



}

