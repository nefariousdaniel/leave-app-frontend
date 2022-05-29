
function Login() {
    return (
        <div className="Login container col-lg-5 col-12">
            <h1 className="my-4">Login</h1>

            <form onSubmit={HandleLogin} method="post">
                <div className="mb-3">
                    <label for="email" className="form-label">E-mail</label>
                    <input type="email" name="email" className="form-control" id="email" placeholder="example@domain.com" required></input>
                </div>

                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password" placeholder="secret" required title="Can contain letters, numbers and symbols like (@,-,$), and should be more than 8 characters." pattern="^[A-Z,a-z,0-9,@,$,-]{8,}$"></input>
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-primary" id="loginbtn">Log In</button>
                </div>

            </form>
        </div>
    );
}

async function HandleLogin(event){
    document.querySelector("#loginbtn").innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;
    document.querySelector("#loginbtn").setAttribute("disabled","disabled");
    event.preventDefault();
    var data = {};
    data.email = document.forms[0][0].value;
    data.password = document.forms[0][1].value;

    var response = await fetch("https://831790nvce.execute-api.ap-south-1.amazonaws.com/dev/api/login",{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors"
        });
    response = await response.json();
    if(response.status === "OK"){
        localStorage.setItem("token",response.token);
        alert(response.message);
        getUserDetails();
    }
    else if(response.status === "FAIL"){
        alert(response.message);
    }
    document.querySelector("#loginbtn").innerHTML = "Log in";
    document.querySelector("#loginbtn").removeAttribute("disabled");
}

async function getUserDetails(){
    if(!localStorage.getItem("user_details")){
        var response = await fetch("https://831790nvce.execute-api.ap-south-1.amazonaws.com/dev/api/getuserdetails",{
            method:"POST",
            body:JSON.stringify({"token":localStorage.token}),
            headers:{
                "Content-Type": "application/json"
            },
            mode: "cors"
        });
        response = await response.json();
        if(response.status === "OK"){
            localStorage.setItem("user_details",JSON.stringify(response.data[0]));
            localStorage.setItem("user_id",response.data[0]._id);
            localStorage.setItem("is_admin",response.data[0].is_admin);
            window.location.href = "/Dashboard";
        }
    }
}

export default Login;
