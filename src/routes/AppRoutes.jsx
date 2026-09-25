import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import DashBoard from "../pages/DashBoard";
import Users from "../pages/Users";
import MailScheduler from "../pages/MailScheduler";
import MailTemplate from "../pages/MailTempalte";
import Settings from "../pages/Settings";
import Login from "../pages/Login";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {

    return (
        <BrowserRouter>

            <Routes>

                {/* Public Route */}
                <Route path="/login" element={<Login />}/>

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<MainLayout />}>
                    <Route index element={<Navigate  to="/admin/dashboard"  replace/>}/>
                    <Route path="admin/dashboard" element={<DashBoard />} />
                    <Route path="admin/users" element={<Users />}/>
                    <Route path="admin/mailscheduler" element={<MailScheduler />}/>
                    <Route path="admin/mailtemplate" element={<MailTemplate />}/>
                    <Route path="admin/settings" element={<Settings />}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;