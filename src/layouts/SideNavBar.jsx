import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/sidebar.css";
import dashboardIcon from "../assets/icons/dashboard.png";
import schedulerIcon from "../assets/icons/report-scheduler.png";
import mailTemplateIcon from "../assets/icons/mailtemplate.png";
import userIcon from "../assets/icons/user.png";
import settingsIcon from "../assets/icons/settings.png";

const navItems = [
    { label: "Dashboard", icon: dashboardIcon, path: "/admin/dashboard" },
    { label: "Mail Scheduler", icon: schedulerIcon, path: "/admin/mailscheduler" },
    { label: "Mail Templates", icon: mailTemplateIcon, path: "/admin/mailtemplate" },
    { label: "Users", icon: userIcon, path: "/admin/users" },
    { label: "Settings", icon: settingsIcon, path: "/admin/settings" },
];

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
                <button
                    className="menu-button"
                    onClick={() => setIsOpen((open) => !open)}
                    aria-label={isOpen ? "Close navigation" : "Open navigation"}
                >
                    <i
                        className={`bi ${isOpen ? "bi-chevron-left" : "bi-chevron-right"} menu-arrow`}
                        aria-hidden="true"
                    ></i>
                </button>

                {isOpen && (
                    <nav className="sidebar-nav">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                className={({ isActive }) =>
                                    `nav-item ${isActive ? "active" : ""}`
                                }
                                title={item.label}
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            >
                                <img
                                    className="nav-icon"
                                    src={item.icon}
                                    alt=""
                                    width="20"
                                    height="20"
                                />
                                <span className="nav-label">{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                )}
            </aside>

            {isOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}

export default Sidebar;
