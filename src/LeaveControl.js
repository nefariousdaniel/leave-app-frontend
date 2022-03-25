import React from "react";
import { useState } from "react";
import { useEffect } from "react";
export function LeaveControl() {

    function IsAdminSelectPane(){
        if(localStorage.getItem("is_admin") === "true"){
            return <a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#userLeaves" >Users Leaves</a>
        }
        return null;
    }

    function IsAdminRightPane(){
        if(localStorage.getItem("is_admin") === "true"){
            return <UserLeaveControl />
        }
        return null;
    }

    return (
        <div className="LeaveControl container">
            <h1 className="my-4">User Control</h1>
            <div class="row">
                <div class="col-2">
                    <div class="list-group" id="list-tab" role="tablist">
                        <a class="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#myleaves" >My Leaves</a>
                        <IsAdminSelectPane />
                    </div>
                </div>
                <div class="col-10">
                    <div class="tab-content" id="nav-tabContent">
                        <MyLeaveControl />
                        <IsAdminRightPane />
                    </div>
                </div>
            </div>
        </div>
    )

}


function MyLeaveControl() {
    var [myleaves, setMyleaves] = useState(null);
    useEffect(() => {
        let body = {
            limit: 20,
            skip: 0,
            token: localStorage.getItem("token")
        }
        fetch("https://831790nvce.execute-api.ap-south-1.amazonaws.com/dev/api/getcurrentuserleavelist", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors"
        })
            .then(response => {
                return response.json();
            })
            .then(result => {
                setMyleaves(result.data);
            })

    }, [])

    return (
        <div class="tab-pane fade show active" id="myleaves" role="tabpanel" >
            <h2>My Leaves</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        myleaves && myleaves.map(el => {
                            let start_date = new Date(el.start_date);
                            let end_date = new Date(el.end_date);
                            let statusField = null;
                            if (!el.is_approved && !el.is_rejected) {
                                statusField = <td className="bg-info text-white">Pending</td>
                            }
                            if (el.is_approved) {
                                statusField = <td className="bg-success text-white">Approved</td>
                            }
                            if (el.is_rejected) {
                                statusField = <td className="bg-danger text-white">Rejected</td>
                            }
                            return (
                                <tr key={el._id}>
                                    <td>{start_date.getFullYear()}-{start_date.getMonth()}-{start_date.getDate()}</td>
                                    <td>{end_date.getFullYear()}-{end_date.getMonth()}-{end_date.getDate()}</td>
                                    <td>{el.description}</td>
                                    {statusField}
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}






function UserLeaveControl() {

    var [leaves, setLeaves] = useState(null);

    useEffect(() => {
        let body = {
            limit: 20,
            skip: 0,
            token: localStorage.getItem("token")
        }
        fetch("https://831790nvce.execute-api.ap-south-1.amazonaws.com/dev/api/getleavelist", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors"
        })
            .then(response => {
                return response.json();
            })
            .then(result => {
                setLeaves(result.data);
            })

    }, [])

    async function handleLeave(id, status, event) {
        console.log(id, status);
        let body = {
            "leave_id": id,
            "is_approved": status,
            "token": localStorage.getItem("token")
        }

        console.log(body);
        let response = await fetch("https://831790nvce.execute-api.ap-south-1.amazonaws.com/dev/api/leaverequestaction", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors"
        });
        response = await response.json();
        if (response.status === "OK") {
            let element = document.createElement("td");
            element.classList.add("text-white");
            if (status) {
                element.classList.add("bg-success");
                element.innerText = "Approved";

            }
            else {
                element.classList.add("bg-danger");
                element.innerText = "Rejected";
            }
            event.target.parentNode.replaceWith(element);
        }

    }

    if(localStorage.getItem("is_admin") === "false") return null

    return (
        <div className="tab-pane fade" id="userLeaves" role="tabpanel" >
            <h2>User Leaves</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">User</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        leaves && leaves.map(el => {
                            let start_date = new Date(el.start_date);
                            let end_date = new Date(el.end_date);
                            let actionField = null;
                            if (!el.is_approved && !el.is_rejected) {
                                actionField = <td>
                                    <button onClick={(e) => handleLeave(el._id, 1, e)} className="btn btn-sm btn-outline-success me-1">Approve</button>
                                    <button onClick={(e) => handleLeave(el._id, 0, e)} className="btn btn-sm btn-outline-danger">Reject</button>
                                </td>
                            }
                            if (el.is_approved) {
                                actionField = <td className="bg-success text-white">Approved</td>
                            }
                            if (el.is_rejected) {
                                actionField = <td className="bg-danger text-white">Rejected</td>
                            }
                            return (
                                <tr key={el._id}>
                                    <td scope="row">{el.user[0].fullname}</td>
                                    <td>{start_date.getFullYear()}-{start_date.getMonth()}-{start_date.getDate()}</td>
                                    <td>{end_date.getFullYear()}-{end_date.getMonth()}-{end_date.getDate()}</td>
                                    <td>{el.description}</td>
                                    {actionField}
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}