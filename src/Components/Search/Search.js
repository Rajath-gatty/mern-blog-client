import React from "react";
import { Link } from "react-router-dom";

const Search = (props) => {
    return (
        <Link to={`/posts/${props.id}`}>
            <div className="single-result">
                <img
                    src={props.imagePath}
                    alt={props.title}
                />
                <h4>{props.title}</h4>
            </div>
        </Link>
    );
};

export default Search;
