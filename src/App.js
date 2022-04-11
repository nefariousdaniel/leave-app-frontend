import Navbar from './SharedComponents/Navbar';
import Register from "./Register.js";
import Login from "./Login.js";
import Dashboard from "./Dashboard.js";
import {LeaveControl} from "./LeaveControl.js";
import {UserControl} from "./UserControl.js";
import {MyLeaves} from "./MyLeaves.js";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          
          <Route path="/Dashboard" element={<IsAUTH><Dashboard /></IsAUTH>} />
          <Route path="/LeaveControl" element={<IsAUTH><LeaveControl /></IsAUTH>} />
          <Route path="/UserControl" element={<IsAUTH><UserControl /></IsAUTH>} />
          <Route path="/MyLeaves" element={<IsAUTH><MyLeaves /></IsAUTH>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

function IsAUTH({ children }){
  if(!localStorage.getItem("token")){
    return <Navigate to="/Login" />;
  }
  return children
}

export default App;
