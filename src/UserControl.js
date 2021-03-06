import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {ChangePasswordButton,ChangePasswordDialog} from "./UserControlComponents/ChangePassword";

var limit = 10;
var skip = 0;
export class UserControl extends React.Component {

    render() {
        return (
            <div className="UserControl container">
                <UserListControl />
            </div>
        )
    }
}




function UserListControl() {

    var [users, setUsers] = useState(null);
    var [usersCount, setUsersCount] = useState(null);

    async function handleCreateUser(event) {
        document.querySelector("#adduserbtn").innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
        event.preventDefault();
        let body = {
            "fullname": document.forms[0][0].value,
            "email": document.forms[0][1].value,
            "password": document.forms[0][2].value,
            "leave_balance": document.forms[0][3].value,
            "is_admin": document.forms[0][4].checked ? 1 : 0,
            "token": localStorage.getItem("token"),
        }

        console.log(body);
        let response = await fetch("https://831790nvce.execute-api.ap-south-1.amazonaws.com/dev/api/createuser", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors"
        });
        response = await response.json();
        if (response.status === "OK") {
            alert(response.message);
            document.forms[0].reset();
            document.querySelector("#createuserdialog").close();
            getdata();
        }
        else alert(response.message);
        document.querySelector("#adduserbtn").innerHTML = "Add User";
    }

    function getdata() {

        let body = {
            limit: limit,
            skip: skip,
            token: localStorage.getItem("token")
        }
        fetch("https://831790nvce.execute-api.ap-south-1.amazonaws.com/dev/api/getuserlist", {
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
                setUsers(result.data);
                setUsersCount(result.data.length);
            })
    }

    useEffect(() => {
        getdata();
    }, [])

    async function handleUserDelete(id, event) {
        event.target.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
        let body = {
            user_id: id,
            token: localStorage.getItem("token")
        }
        let response = await fetch("https://831790nvce.execute-api.ap-south-1.amazonaws.com/dev/api/deleteuser", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors"
        });
        response = await response.json();
        if (response.status === "OK") {
            alert(response.message);
            getdata();
        }
        else alert(response.message);
        event.target.innerHTML = `Delete`
    }

    function RenderActions() {
        if (localStorage.getItem("is_admin") === "true") {
            return (
                <div className="btn-group" role="group">
                    <ChangePasswordButton />
                    <button className="btn btn-primary" onClick={() => { document.querySelector("#createuserdialog").showModal() }}>Add User</button>
                    <button className="btn btn-secondary" onClick={() => { if (skip === 0) return; skip = skip - limit; getdata() }}>&lt;</button>
                    <button className="btn btn-secondary" onClick={() => { if(usersCount < limit) return; skip = skip + limit; getdata() }}>&gt;</button>
                </div>
            )
        }
        else {
            return (
                <div className="btn-group" role="group">
                    <ChangePasswordButton />
                    <button className="btn btn-secondary" onClick={() => { if (skip === 0) return; skip = skip - limit; getdata() }}>&lt;</button>
                    <button className="btn btn-secondary" onClick={() => { skip = skip + limit; getdata() }}>&gt;</button>
                </div>
            )
        }

    }

    async function loadEditModal(id,event) {
        event.target.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;
        console.log(id);
        let response = await fetch("https://831790nvce.execute-api.ap-south-1.amazonaws.com/dev/api/getuserdetails", {
            method: "POST",
            body: JSON.stringify({ "token": localStorage.token, "user_id": id }),
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors"
        });
        response = await response.json();
        response = response.data[0];
        var form = document.querySelector("#editUserForm");
        form[0].value = response._id;
        form[1].value = response.fullname;
        form[2].value = response.email;
        form[3].value = response.leave_balance;
        document.querySelector("#edituserdialog").showModal();
        event.target.innerHTML = `Edit`;
    }

    async function handleEditUser() {
        let form = document.querySelector("#editUserForm");
        let body = {
            user_id: form[0].value,
            fullname: form[1].value,
            email: form[2].value,
            leave_balance: form[3].value,
            token: localStorage.token,
        };
        console.log(form[4].checked);
        let response = await fetch("https://831790nvce.execute-api.ap-south-1.amazonaws.com/dev/api/edituserdetails", {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors"
        });
        response = await response.json();
        if (response.status === "OK") {
            alert(`${response.message}`)
            document.querySelector("#edituserdialog").close();
            document.querySelector("#editUserForm").reset();
            getdata();
        }
        else {
            alert(response.message)
        }
    }

    return (
        <div className="my-4 container" id="userList">
            <dialog className="border-0 rounded shadow-lg col-lg-6 col-12" id="createuserdialog">
                <form onSubmit={handleCreateUser}>
                    <h2>Add User</h2>
                    <div className="mb-3">
                        <label htmlFor="fullname" className="form-label">Fullname</label>
                        <input type="text" name="fullname" className="form-control" id="fullname" placeholder="John Doe" required></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input type="email" name="email" className="form-control" id="email" placeholder="someone@example.com" required></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="password" placeholder="secret" minLength="8" required></input>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="leave_balance" className="form-label">Leave Balance</label>
                        <input type="number" name="leave_balance" className="form-control" id="leave_balance" placeholder="15" required></input>
                    </div>

                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" name="is_admin" value="false" id="isAdminSelection"></input>
                        <label className="form-check-label" htmlFor="isAdminSelection">
                            Is Admin
                        </label>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-danger" onClick={() => { document.querySelector("#createuserdialog").close() }}>Cancel</button>
                        <button className="btn btn-primary" type="submit" id="adduserbtn">Add User</button>
                    </div>
                </form>
            </dialog>

            <ChangePasswordDialog />


            <dialog className="border-0 rounded shadow-lg col-lg-6 col-12" id="edituserdialog">
                <form onSubmit={(e) => { e.preventDefault(); handleEditUser() }} id="editUserForm">
                    <h2>Edit User</h2>
                    <input type="hidden" name="user_id" value="user_id"></input>
                    <div className="mb-3">
                        <label htmlFor="fullname" className="form-label">Fullname</label>
                        <input type="text" name="fullname" className="form-control" id="fullname" placeholder="John Doe" required></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input type="email" name="email" className="form-control" id="email" placeholder="someone@example.com" required></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="leave_balance" className="form-label">Leave Balance</label>
                        <input type="number" name="leave_balance" className="form-control" id="leave_balance" placeholder="15" required></input>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button className="btn btn-danger" onClick={(e) => { e.preventDefault(); document.querySelector("#edituserdialog").close() }}>Cancel</button>
                        <input type="submit" value="Edit User" className="btn btn-primary"></input>
                    </div>
                </form>
            </dialog>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Users</h1>
                <RenderActions />
            </div>

            <div className="list-group my-3">

                {
                    users && users.map(el => {
                        let button = "";
                        let button2 = "";
                        let adminBadge = "";
                        if (el.is_admin === true) adminBadge = <span className="ms-2 badge bg-primary text-white">Administrator</span>
                        if (localStorage.getItem("is_admin") === "true" && localStorage.user_id !== el._id) button = <button className="btn btn-danger btn-sm float-end" onClick={(event) => { handleUserDelete(el._id, event) }}>Delete</button>;
                        if (localStorage.getItem("is_admin") === "true") button2 = <button className="btn btn-warning btn-sm float-end me-1" onClick={(event) => { loadEditModal(el._id,event) }}>Edit</button>;
                        return (<div class="list-group-item list-group-item-action" key={el._id}>
                        <div class="d-flex w-100 justify-content-start align-items-center">
                            <h5 class="mb-1">{el.fullname}</h5>
                            {adminBadge}
                        </div>
    
                        <div className="d-flex w-100 justify-content-between">
                            <small>
                                <p className="mb-0">Email: <i>{el.email}</i></p>
                                <p className="mb-0">Leave Balance: <i>{el.leave_balance}</i></p>
                            </small>
                            <small>
                                {button} {button2}
                            </small>
                        </div>
                    </div>)
                    })
                }


                


            </div>
        </div>
    )
}

