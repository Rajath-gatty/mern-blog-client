import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Context } from "../../Context/Context";
import "./Navbar.css";

const Navbar = (props) => {
    const { pathname } = useLocation();
    const { isButtonDisabled, isLoggedIn } = useContext(Context);

    return (
        <div className="strech">
            <div className="container">
                <div className="nav-wrapper">
                    <Link to="/" className="main-hdng">
                        Blog
                    </Link>
                    {isLoggedIn ? (
                        <div className="nav-items">
                            {pathname !== "/" && <Link to="/">Home</Link>}
                            <Link to="/admin">Admin</Link>
                            <Link to="/admin/profile">
                                <AccountCircleIcon />
                            </Link>
                            {pathname === "/admin/edit-post" ? (
                                <button
                                    onClick={props.onClick}
                                    disabled={
                                        isButtonDisabled || props.publishing
                                    }
                                    className="btn btn-special"
                                >
                                    {props.publishing
                                        ? "Publishing..."
                                        : "Publish"}
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                    ) : (
                        <div className="nav-items">
                            {pathname !== "/" && <Link to="/">Home</Link>}
                            {pathname === "/auth/login" ? (
                                ""
                            ) : (
                                <>
                                    <Link to="/auth/login">Login</Link>
                                    <Link to="/auth/signup">Signup</Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
