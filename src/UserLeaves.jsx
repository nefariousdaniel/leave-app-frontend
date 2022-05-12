import React from "react";
import { useState } from "react";
import { useEffect } from "react";

var limit = 10;
var skip = 0;
export function UserLeaves() {


    var [leaves, setLeaves] = useState(null);

    function getdata() {
        let body = {
            limit: limit,
            skip: skip,
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
    }
    useEffect(() => {
        getdata();
    }, [])

    async function handleLeave(leaveID, email,status, event) {
        event.target.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
        let body = {
            "leave_id": leaveID,
            "email": email,
            "is_approved": status,
            "token": localStorage.getItem("token")
        }

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
            let element = document.createElement("span");
            element.classList.add("badge");
            if (status) {
                element.classList.add("bg-success");
                element.innerText = "Approved";

            }
            else {
                element.classList.add("bg-danger");
                element.innerText = "Rejected";
            }
            event.target.parentNode.parentNode.childNodes[0].childNodes[1].replaceWith(element);
            event.target.parentNode.remove();
        }
        
    }


    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="my-4">User Leaves</h1>
                <div className="btn-group">
                    <button className="btn btn-secondary" onClick={() => { if (skip === 0) return; skip = skip - limit; getdata() }}>&lt;</button>
                    <button className="btn btn-secondary" onClick={() => { skip = skip + limit; getdata() }}>&gt;</button>
                </div>
            </div>


            <div className="list-group">

                {
                    leaves && leaves.map(el => {
                        let start_date = new Date(el.start_date);
                        let end_date = new Date(el.end_date);
                        let actionField = null;
                        let buttons = null;
                        if (!el.is_approved && !el.is_rejected) {
                            buttons = <div className="mt-3">
                                <button onClick={(e) => handleLeave(el._id, el.user[0].email,1, e)} className="btn btn-sm btn-outline-success me-1">Approve</button>
                                <button onClick={(e) => handleLeave(el._id, el.user[0].email,0, e)} className="btn btn-sm btn-outline-danger">Reject</button>
                            </div>

                            if (el.user_id === localStorage.user_id) {
                                actionField = <span className="bg-info badge">Cannot Approve Yourself</span>
                                buttons=null;
                            }

                        }
                        if (el.is_approved) {
                            actionField = <span className="bg-success badge">Approved</span>
                        }
                        if (el.is_rejected) {
                            actionField = <span className="bg-danger badge">Rejected</span>
                        }
                        return (
                            <div key={el._id} href="#" className="list-group-item list-group-item-action text-break">
                                <div className="d-flex w-100 justify-content-between align-items-center">
                                    <h5 className="mb-1">{el.description}</h5>
                                    <small className="status">{actionField}</small>
                                </div>
                                <p className="mb-0">User: {el.user[0].fullname}</p>
                                <p className="mb-0">Start Date: {start_date.getFullYear()}-{start_date.getMonth()}-{start_date.getDate()}</p>
                                <p className="mb-0">End Date: {end_date.getFullYear()}-{end_date.getMonth()}-{end_date.getDate()}</p>
                                <p className="mb-0">E-mail ID: {el.user[0].email}</p>
                                {buttons}
                            </div>
                        )
                    })
                }





            </div>

        </div>
    )
}
