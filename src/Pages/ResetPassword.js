import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar/Navbar";
import { useBlogContext } from "../Context/Context";
import { useParams, useHistory } from "react-router-dom";

const ResetPassword = (props) => {
    const { logoutUser } = useBlogContext();
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [error, setError] = useState("");
    const [errorReset, setErrorReset] = useState("");

    const params = useParams();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== cPassword) return setError("Passwords does not match");
        try {
            await axios.post(`/admin/reset-password/${params.paramToken}`, {
                password,
            });
            logoutUser();
            history.push("/auth/login");
        } catch (err) {
            if (err.response.data.error === "jwt expired") {
                return setErrorReset(err.response.data.error);
            }
            setError(err.response.data.error);
        }
    };
    return (
        <>
            <Navbar />
            <div className="container">
                {!errorReset ? (
                    <div className="form-wrapper">
                        <h2>Reset Password</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">New Password</label>
                            <br />
                            <input
                                type="password"
                                name="password"
                                className="input-form"
                                placeholder="new password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="email">Confirm Password</label>
                            <br />
                            <input
                                type="password"
                                name="cpassword"
                                className="input-form"
                                placeholder="confirm password"
                                onChange={(e) => setCPassword(e.target.value)}
                                required
                            />
                            {error && <div className="error-msg">{error}</div>}
                            <input
                                type="submit"
                                value="Reset"
                                className="submit-btn btn"
                            />
                        </form>
                    </div>
                ) : (
                    <div className="forgot-pass-sent">
                        <h2>Session expired!</h2>
                    </div>
                )}
            </div>
        </>
    );
};

export default ResetPassword;
