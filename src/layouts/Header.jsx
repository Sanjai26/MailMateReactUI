import "../css/common.css";
import "../css/header.css";

function Header() {
    const notificationCount = 3;

    return (
        <header className="app-header">
            <a href="#" className="app-header-logo">
                <img
                    src="/images/logo.png"
                    alt="MailMate Logo"
                    width="28"
                    height="28"
                    className="app-header-logo-image"
                />
                <span className="app-header-logo-text">
                    Mail<span className="app-header-logo-accent">Mate</span>
                </span>
            </a>

            <div className="app-header-actions">

                <div className="dropdown">
                    <button
                        className="header-avatar-btn"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        aria-label="Account menu"
                    >
                        <img
                            src="/images/user.png"
                            alt="Profile"
                            width="32"
                            height="32"
                        />
                        <span className="header-online-dot"></span>
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end shadow-sm mt-2 p-1">
                        <li>
                            <a className="dropdown-item d-flex align-items-center gap-2 px-2 py-1" href="#">
                                <img src="/images/profile.png" alt="" width="18" height="18" />
                                <span>Profile</span>
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item d-flex align-items-center gap-2 px-2 py-1" href="#">
                                <img src="/images/settings.png" alt="" width="18" height="18" />
                                <span>Settings</span>
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider my-1" />
                        </li>
                        <li>
                            <a className="dropdown-item d-flex align-items-center gap-2 px-2 py-1 text-danger" href="#">
                                <img src="/images/logout.png" alt="" width="18" height="18" />
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
