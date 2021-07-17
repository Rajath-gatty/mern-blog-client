import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar/Navbar";

const ForgotPassword = (props) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post("/admin/forgot-password", { email })
            .then((res) => {
                console.log(res);
                setLoading(false);
                setSent(true);
            })
            .catch((err) => {
                setLoading(false);
                setError(err.response.data.error);
            });
    };
    return (
        <>
            <Navbar />
            <div className="container">
                {!sent ? (
                    <div className="form-wrapper">
                        <h2>Enter Email ID</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Email</label>
                            <br />
                            <input
                                type="email"
                                name="email"
                                className="input-form"
                                placeholder="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {error && <div className="error-msg">{error}</div>}
                            <input
                                type="submit"
                                value={loading ? "Sending..." : "Send"}
                                className="submit-btn btn"
                            />
                        </form>
                    </div>
                ) : (
                    <div className="forgot-pass-sent">
                        <h2 style={{ marginBottom: "0.5rem" }}>
                            Email sent successfully!
                        </h2>{" "}
                        <p>Check your inbox to Reset Password</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default ForgotPassword;
