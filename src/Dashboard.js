import React from "react";


class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = JSON.parse(localStorage.getItem("user_details"));
    }
    
    async handleRequest(event){
        event.preventDefault();
        let body = {
            "description": document.forms[0][0].value,
            "start_date": document.forms[0][1].value,
            "end_date": document.forms[0][2].value,
            "token": localStorage.getItem("token")
        }

        let response = await fetch("https://831790nvce.execute-api.ap-south-1.amazonaws.com/dev/api/createleaverequest",{
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors"
        });
        response = await response.json();
        if(response.status === "OK") alert(response.message);
        else alert(response.message);

        document.forms[0].reset();
    }
    render(){
        return (
            <div className="Dashboard container">
                <h1 className="my-4">Dashboard</h1>
        
                <div className="container d-flex gap-2">
                    <div class="card col-6">
                        <div class="card-body">
                            <h5 class="card-title">{this.state.fullname}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{this.state.description}</h6>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Company: {this.state.company[0].name}</li>
                            <li class="list-group-item">Company Address: {this.state.company[0].address}</li>
                            <li class="list-group-item">Is Admin: {this.state.is_admin.toString()}</li>
                            <li class="list-group-item">ID: {this.state._id}</li>
                        </ul>
                    </div>
                    <div class="card col-6">
                        <div class="card-body">
                            <h5 class="card-title">Request Leave</h5>
                            
                            <form onSubmit={this.handleRequest}>
                                <div className="mb-3">
                                    <label for="description" className="form-label">Description</label>
                                    <input type="text" name="description" className="form-control" id="description" placeholder="A reason for leave."></input>
                                </div>

                                <div className="mb-3">
                                    <label for="start_date" className="form-label">Start Date</label>
                                    <input type="date" name="start_date" className="form-control" id="start_date" placeholder="A reason for leave."></input>
                                </div>

                                <div className="mb-3">
                                    <label for="end_date" className="form-label">End Date</label>
                                    <input type="date" name="end_date" className="form-control" id="end_date" placeholder="A reason for leave."></input>
                                </div>

                                <input type="submit" value="Request" className="btn btn-primary"></input>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }


    
}

export default Dashboard;
