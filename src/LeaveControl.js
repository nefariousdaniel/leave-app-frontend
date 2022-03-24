import React from "react";
export function LeaveControl() {

    return (
        <div className="LeaveControl container">
            <h1 className="my-4">User Control</h1>
            <div class="row">
                <div class="col-3">
                    <div class="list-group" id="list-tab" role="tablist">
                        <a class="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#myleaves" >My Leaves</a>
                        <a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#userLeaves" >Users Leaves</a>
                    </div>
                </div>
                <div class="col-9">
                    <div class="tab-content" id="nav-tabContent">
                        <MyLeaveControl />
                        <UserLeaveControl />
                    </div>
                </div>
            </div>
        </div>
    )

}


function MyLeaveControl(){

    return (
        <div class="tab-pane fade show active" id="myleaves" role="tabpanel" >
            <h2>My Leaves</h2>
        </div>
    )
}

function UserLeaveControl() {
    return (
        <div class="tab-pane fade" id="userLeaves" role="tabpanel" >
            <h2>User Leaves</h2>
        </div>
    )
}