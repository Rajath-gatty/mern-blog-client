import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const Signup = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [errors, setErrors] = useState([]);

    const history = useHistory();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await axios
                .post("/auth/signup", {
                    name: name,
                    email: email,
                    password: password,
                })
                .then(() => {
                    history.push("/auth/login");
                });
        } catch (err) {
            let errors = err.response.data.errors.map((err) => {
                return {
                    name: err.param,
                    msg: err.msg,
                };
            });
            setErrors(errors);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (name.length >= 5 && password.length >= 8 && email) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [name, password, email]);
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="form-wrapper">
                    <h2>Signup</h2>
                    <form onSubmit={handleSignup}>
                        <label htmlFor="name">Name</label>
                        <br />
                        <input
                            type="text"
                            name="name"
                            className="input-form"
                            placeholder="name"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
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
                        {errors.length > 0 && (
                            <div className="error-msg">{errors[0].msg}</div>
                        )}
                        <label htmlFor="password">Password</label>
                        <br />
                        <input
                            type="password"
                            name="password"
                            className="input-form"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Link to="/auth/login">
                            Already have an account? Login
                        </Link>
                        <input
                            type="submit"
                            value={isLoading ? "Signing in...." : "Signup"}
                            className="submit-btn btn"
                            disabled={isValid}
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
