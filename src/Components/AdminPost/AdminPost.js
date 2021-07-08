import React from "react";
import "./AdminPost.css";
import { Delete, Edit } from "@material-ui/icons";

const AdminPost = (props) => {
    const newDate = new Date(props.createdAt);
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

    return (
        <tr className="single-admin-post">
            <td>{props.title}</td>
            <td>{props.author}</td>
            <td>{date}</td>
            <td>{<Edit />}</td>
            <td onClick={() => props.onClick(props.id)}>{<Delete />}</td>
        </tr>
    );
};

export default AdminPost;
