import React from "react";
import { useState } from "react";
import { useEffect } from "react";
export class UserControl extends React.Component {
    render() {
        return (
            <div className="UserControl container">
                <h1 className="my-4">User Control</h1>
                <div className="row">
                    <div className="col-3">
                        <div className="list-group" id="list-tab" role="tablist">
                            <a className="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#userList" >Users List</a>
                            <a className="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#userCreate" >Create User</a>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="tab-content" id="nav-tabContent">
                            <UserListControl />
                            <UserCreateControl />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}




function UserListControl() {

    var [users, setUsers] = useState(null);

    useEffect(() => {
        let body = {
            limit: 20,
            skip: 0,
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
        .then(response=>{
            return response.json();
        })
        .then(result=>{
            setUsers(result.data);
        })
        
    },[])

    async function handleUserDelete(id,event){
        console.log(id);
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
            event.target.parentElement.remove();
        }
        else alert(response.message);
    }

    return (
        <div className="tab-pane fade show active" id="userList" role="tabpanel" >
            <h2>User List</h2>
            <ul className="list-group list-group-flush">
                {
                    users && users.map(el=>{
                        let button= "";
                        let adminBadge = "";
                        if(el.is_admin === true) adminBadge = <span class="badge bg-warning text-dark">Admin</span>
                        if(localStorage.getItem("is_admin") === "true") button = <button className="btn btn-danger btn-sm float-end" onClick={(event)=>{handleUserDelete(el._id,event)}}>Delete User</button>;
                        return <li key={el._id} className="list-group-item">{el.fullname} - <i>{el.email}</i> {adminBadge} {button}</li>
                    })
                }
            </ul>
        </div>
    )
}

class UserCreateControl extends React.Component {
    async handleCreateUser(event) {
        event.preventDefault();
        let body = {
            "fullname": document.forms[0][0].value,
            "email": document.forms[0][1].value,
            "password": document.forms[0][2].value,
            "leave_balance": document.forms[0][3].value,
            "is_admin": document.forms[0][4].checked,
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
        }
        else alert(response.message);
    }
    render() {
        return (
            <div className="tab-pane fade pb-5" id="userCreate" role="tabpanel" >
                <form onSubmit={this.handleCreateUser}>
                    <div className="mb-3">
                        <label htmlFor="fullname" className="form-label">Fullname</label>
                        <input type="text" name="fullname" className="form-control" id="fullname" placeholder="John Doe"></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input type="email" name="email" className="form-control" id="email" placeholder="someone@example.com"></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="password" placeholder="secret"></input>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="leave_balance" className="form-label">Leave Balance</label>
                        <input type="number" name="leave_balance" className="form-control" id="leave_balance" placeholder="15"></input>
                    </div>

                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" value="false" id="isAdminSelection"></input>
                        <label className="form-check-label" htmlFor="isAdminSelection">
                            Is Admin
                        </label>
                    </div>
                    <input type="submit" value="Create User" className="btn btn-primary"></input>
                </form>
            </div>
        )
    }
}