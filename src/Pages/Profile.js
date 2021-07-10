import React, { useState, useEffect } from "react";
import { AccountCircle } from "@material-ui/icons";
import { LinearProgress } from "@material-ui/core";
import Navbar from "../Components/Navbar/Navbar";
import { useBlogContext } from "../Context/Context";
import { useHistory } from "react-router";
import axios from "axios";

const Profile = (props) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const { logoutUser, token } = useBlogContext();
    const history = useHistory();

    const newDate = new Date(user.createdAt);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const day = newDate.getDate();
    const month = months[newDate.getMonth()];
    const year = newDate.getFullYear();
    const date = `${day} ${month} ${year}`;

    useEffect(() => {
        axios
            .get("/admin/profile", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then((res) => {
                setUser(res.data.user);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [token]);

    const handleLogout = () => {
        logoutUser();
        history.replace("/auth/login");
    };

    const handleDeleteAccount = () => {
        if (user.posts.length > 0) {
            return alert(
                "You need to delete all posts First before deleting your account!"
            );
        }
        logoutUser();
        axios
            .delete("/admin/delete-account", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then((res) => {
                history.replace("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <Navbar />
            {!loading ? (
                <div className="profile-wrapper container">
                    <div className="profile">
                        <div className="profile-header">
                            <div className="profile-photo-wrapper">
                                <AccountCircle />
                            </div>
                            <h2 className="profile-hdng">{user.name}</h2>
                        </div>
                        <div className="profile-info">
                            <span className="info">
                                Total Posts : {user.posts.length}
                            </span>
                            <span className="info">Email: {user.email}</span>
                            <span className="info">Created on : {date}</span>
                            <div className="info danger-section">
                                <div
                                    className="delete-account"
                                    onClick={handleDeleteAccount}
                                >
                                    Delete account
                                </div>
                                <button
                                    className="btn btn-logout"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <LinearProgress />
            )}
            ;
        </>
    );
};

export default Profile;
