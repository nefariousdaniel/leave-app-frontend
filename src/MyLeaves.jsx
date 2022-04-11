import React from "react";
import { useState } from "react";
import { useEffect } from "react";

var limit = 20;
var skip = 0;
export function MyLeaves() {



    var [myleaves, setMyleaves] = useState(null);

    function getdata() {
        let body = {
            limit: limit,
            skip: skip,
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
    }
    useEffect(() => {
        getdata();

    }, [])


    async function handleRequest(event) {
        event.preventDefault();
        let body = {
            "description": document.forms[0][0].value,
            "start_date": document.forms[0][1].value,
            "end_date": document.forms[0][2].value,
            "token": localStorage.getItem("token")
        }

        let response = await fetch("https://831790nvce.execute-api.ap-south-1.amazonaws.com/dev/api/createleaverequest", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors"
        });
        response = await response.json();
        if (response.status === "OK") getdata();
        alert(response.message);

        document.forms[0].reset();
        document.querySelector("#clrd").close();
    }



    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="my-4">My Leaves</h1>
                <div className="btn-group">
                    <button className="btn btn-primary" onClick={() => { document.querySelector("#clrd").showModal() }}>Request Leave</button>
                    <button className="btn btn-secondary" onClick={() => { if (skip === 0) return; skip = skip - limit; getdata() }}>&lt;</button>
                    <button className="btn btn-secondary" onClick={() => { skip = skip + limit; getdata() }}>&gt;</button>
                </div>
            </div>


            <dialog id="clrd" className="border border-0 col-12 col-lg-6 shadow-lg rounded">
                <h5 className="card-title">Request Leave</h5>

                <form onSubmit={(e) => { handleRequest(e) }} id="leaveRequestForm" method="dialog">
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" name="description" className="form-control" id="description" placeholder="A reason for leave." required></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="start_date" className="form-label">Start Date</label>
                        <input type="date" name="start_date" className="form-control" id="start_date" placeholder="A reason for leave." onChange={(e) => {
                            document.querySelector("#end_date").setAttribute("min", e.target.value);
                            document.querySelector("#end_date").setAttribute("value", e.target.value);
                        }} min={new Date().toISOString().split("T")[0]} required></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="end_date" className="form-label">End Date</label>
                        <input type="date" name="end_date" className="form-control" id="end_date" placeholder="A reason for leave." min={new Date().toISOString().split("T")[0]} required></input>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <input type="submit" value="Request Leave" className="btn btn-primary float-end"></input>
                        <button className="btn btn-danger float-end" onClick={(e) => { e.preventDefault(); document.querySelector("#clrd").close() }}>Cancel</button>
                    </div>
                </form>
            </dialog>

            <div className="list-group">
                {
                    myleaves && myleaves.map(el => {
                        let start_date = new Date(el.start_date);
                        let end_date = new Date(el.end_date);
                        let statusField = null;

                        if (!el.is_approved && !el.is_rejected) {
                            statusField = <small className="badge bg-warning">Pending</small>
                        }
                        if (el.is_approved) {
                            statusField = <small className="badge bg-success">Approved</small>
                        }
                        if (el.is_rejected) {
                            statusField = <small className="badge bg-danger">Rejected</small>
                        }


                        return (
                            <div class="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between align-items-center">
                                    <h5 class="mb-1">{el.description}</h5>
                                    {statusField}
                                </div>
                                <p class="mb-0">Start Date: {start_date.getFullYear()}-{start_date.getMonth()}-{start_date.getDate()}</p>
                                <p class="mb-0">End Date: {end_date.getFullYear()}-{end_date.getMonth()}-{end_date.getDate()}</p>
                            </div>


                        )

                    })
                }
            </div>

        </div>

    )
}