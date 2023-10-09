import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "../components/sideBar";
import Dashboard from "../components/dashboard";
import Manage from "../components/manage";
import Reports from "../components/reports";
import Schedule from "../components/schedule";
import Boards from "../components/Boards";
import NavBar from "../components/navBar";

const RoutesPages = () => {

    return (
        <>
            <BrowserRouter>
            <>
            <NavBar/>
                <SideBar>
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/dashboard' element={<Dashboard/>} />
                        <Route path='/manage' element={<Manage/>} />
                        <Route path='/reports' element={<Reports/>} />
                        <Route path='/schedule' element={<Schedule/>} />
                        <Route path='/boards' element={<Boards/>} />
                    </Routes>
                </SideBar>
        </>
            </BrowserRouter>
        </>
    )
}
export default RoutesPages;