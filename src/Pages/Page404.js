import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import {Link} from "react-router-dom";

const Page404 = (props) => {
    return (
        <>
            <Navbar />
            <div className="error-404">
            <h1 className="error-page">404 Page not Found</h1>
            <Link to="/"><button className="btn">Return homePage</button></Link>
            </div>
        </>
    );
};

export default Page404;
