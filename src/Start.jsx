import React from "react";
export default function Start() {

    return (
        <div className="container my-3" >
            <div className="d-flex flex-column justify-content-between align-items-center mb-3">
                <h1 className="text-center">Leave Management Application</h1>
                <i>Powered By</i>
            </div>

            <div class="card-group">
                <div class="card">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" class="card-img-top p-5" alt="aws"></img>
                        <div class="card-body">
                            <h5 class="card-title">Amazon Web Services</h5>
                            <p class="card-text">AWS is architected to be the most flexible and secure cloud computing environment available today. Our core infrastructure is built to satisfy the security requirements for the military, global banks, and other high-sensitivity organizations.</p>
                        </div>
                        <div class="card-footer">
                            <a className="btn btn-primary btn-sm" href="https://aws.amazon.com">Go to AWS</a>
                        </div>
                </div>
                <div class="card">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" class="card-img-top p-5" alt="nodejs"></img>
                        <div class="card-body">
                            <h5 class="card-title">Node.js</h5>
                            <p class="card-text">As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.</p>
                        </div>
                        <div class="card-footer">
                        <a className="btn btn-primary btn-sm" href="https://nodejs.org/">Go to Node.js</a>
                        </div>
                </div>
                <div class="card">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" class="card-img-top p-5" alt="mongodb"></img>
                        <div class="card-body">
                            <h5 class="card-title">MongoDB</h5>
                            <p class="card-text">Get your ideas to market faster with an application data platform built on the leading modern database. Support transactional, search, analytics, and mobile use cases while using a common query interface and the data model developers love.</p>
                        </div>
                        <div class="card-footer">
                        <a className="btn btn-primary btn-sm" href="https://www.mongodb.com/">Go to MongoDB</a>
                        </div>
                </div>
            </div>
        </div>
    )
}
