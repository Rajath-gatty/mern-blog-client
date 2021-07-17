import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar/Navbar";
import { useBlogContext } from "../Context/Context";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);

    const { loginUser, setCurrentUser } = useBlogContext();
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const result = await axios.post("/auth/login", {
                email: email,
                password: password,
            });
            setLoading(false);
            loginUser(result.data.token);
            setCurrentUser(result.data.user);
            localStorage.setItem("token", result.data.token);
            history.push("/");
        } catch (err) {
            setError(err.response.data.error);
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="form-wrapper">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input
                            type="email"
                            name="email"
                            className="input-form"
                            placeholder="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <div className="error-msg">{error}</div>}
                        <label htmlFor="password">Password</label>
                        <br />
                        <input
                            type="password"
                            name="password"
                            className="input-form"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Link to="/admin/forgot-password">
                            forgot password?
                        </Link>
                        <input
                            type="submit"
                            value={loading ? "Logging in..." : "Login"}
                            className="submit-btn btn"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
