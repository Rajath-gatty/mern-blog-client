import React from "react";
import Navbar from "../Navbar/Navbar";

const SinglePageRender = (props) => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="single-page-wrapper">
                    <img
                        className="single-post-img"
                        src={props.imagePath}
                        alt=""
                    />
                    <div>
                        <h2 className="single-page-hdng">{props.title}</h2>
                        <span className="single-para">{props.content}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SinglePageRender;
