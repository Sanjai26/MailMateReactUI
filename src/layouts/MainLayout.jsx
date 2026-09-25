import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./SideNavBar";

function MainLayout() {

    return (
        <>
            <div className='header'>
                <Header/>
            </div>
            <div className='side-nav-bar'>
                <Sidebar/>
            </div>
            <div className='main-content'>
                <Outlet/>
            </div>
        </>
    );
}

export default MainLayout;