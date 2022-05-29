import React from "react";

class Register extends React.Component {

    
    async handleRegister(){
        document.querySelector("#registerbtn").innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;
        document.querySelector("#registerbtn").setAttribute("disabled","disabled");
        var data = {};
        data.fullname = document.forms[0][0].value;
        data.company_name = document.forms[0][1].value;
        data.company_address = document.forms[0][2].value;
        data.email = document.forms[0][3].value;
        data.password = document.forms[0][4].value;

        var response = await fetch("https://831790nvce.execute-api.ap-south-1.amazonaws.com/dev/api/register",{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors"
        });
        response = await response.json();
        if(response.status === "OK"){
            alert(response.message);
            window.location.href="/Login";
        } 
        else if(response.status === "FAIL"){
            alert(response.message);
        }
        document.querySelector("#registerbtn").innerHTML = `Register`;
        document.querySelector("#registerbtn").removeAttribute("disabled");
        
    }

    render() {
        return (
            <div className="Register container col-12 col-lg-5 mb-5">
                <h1 className="my-4">Register</h1>

                <form onSubmit={(event)=>{event.preventDefault(); this.handleRegister()}}>
                    <div className="mb-3">
                        <label for="fullname" className="form-label">Full Name</label>
                        <input type="text" name="fullname" className="form-control" id="fullname" placeholder="John Doe" required></input>
                    </div>

                    <div className="mb-3">
                        <label for="company_name" className="form-label">Company Name</label>
                        <input type="text" name="company_name" className="form-control" id="company_name" placeholder="Some Company" required></input>
                    </div>

                    <div className="mb-3">
                        <label for="company_address" className="form-label">Company Address</label>
                        <input type="text" name="company_address" className="form-control" id="company_address" placeholder="Some Company" required></input>
                    </div>

                    <div className="mb-3">
                        <label for="email" className="form-label">E-mail</label>
                        <input type="email" name="email" className="form-control" id="email" placeholder="example@domain.com" required></input>
                    </div>

                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="password" placeholder="secret" required title="Can contain letters, numbers and symbols like (@,-,$), and should be more than 8 characters." pattern="^[A-Z,a-z,0-9,@,$,-]{8,}$"></input>
                    </div>

                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary" id="registerbtn">Register</button>
                    </div>

                </form>
            </div>
        );
    }

    
}

export default Register;
