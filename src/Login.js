
function Login() {
    return (
        <div className="Login container col-5">
            <h1 className="my-4">Login</h1>

            <form onSubmit={HandleLogin} method="post">
                <div className="mb-3">
                    <label for="email" className="form-label">E-mail</label>
                    <input type="email" name="email" className="form-control" id="email" placeholder="example@domain.com"></input>
                </div>

                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password" placeholder="secret"></input>
                </div>

                <div className="mb-3">
                    <input type="submit" name="submit" className="btn btn-primary" id="submit"></input>
                </div>

            </form>
        </div>
    );
}

async function HandleLogin(event){
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
    console.log(response);
    if(response.status === "OK"){
        localStorage.setItem("token",response.token);
        alert(response.message);
        getUserDetails();
    }
    else if(response.status === "FAIL"){
        alert(response.message);
    }
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
