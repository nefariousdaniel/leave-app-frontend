export function ChangePasswordButton(){
    return (
        <button className="btn btn-warning" onClick={() => { document.querySelector("#changepassworddialog").showModal() }}>Change Password</button>
    )
}

async function handleChangePassword(){
    document.querySelector("#changepasswordbtn").innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;
    let form = document.querySelector("#changepasswordform");
    let body = {
        currentpassword: form[0].value,
        newpassword: form[1].value,
        user_id: localStorage.getItem("user_id"),
        token: localStorage.token,
    };
    console.log(body);
    let response = await fetch("https://831790nvce.execute-api.ap-south-1.amazonaws.com/dev/api/changepassword", {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    });
    response = await response.json();
    if (response.status === "OK") {
        alert(`${response.message}`)
        document.querySelector("#changepassworddialog").close();
        document.querySelector("#changepasswordform").reset();
    }
    else {
        alert(response.message)
    }
    document.querySelector("#changepasswordbtn").innerHTML = `Change Password`;
}




export function ChangePasswordDialog(){
    return(
        <dialog className="border-0 rounded shadow-lg col-lg-6 col-12" id="changepassworddialog">
                <form onSubmit={(e)=>{e.preventDefault(); handleChangePassword()}} id="changepasswordform">
                    <h2>Change Password</h2>
                    <div className="mb-3">
                        <label htmlFor="currentpassword" className="form-label">Current Password</label>
                        <input type="password" name="currentpassword" className="form-control" id="currentpassword" placeholder="Current Password" required></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="newpassword" className="form-label">New Pssword</label>
                        <input type="password" name="newpassword" className="form-control" id="newpassword" placeholder="New Password" required></input>
                    </div>

                    
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-danger" onClick={() => { document.querySelector("#changepassworddialog").close() }}>Cancel</button>
                        <button type="submit" id="changepasswordbtn" className="btn btn-primary">Change Password</button>
                    </div>
                </form>
            </dialog>
    )
}