import React from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import Card from "../../UI/Card";
import "./Post.css";

const Post = (props) => {
    const { title, content, imagePath, author, createdAt, id, loading } = props;
    const newDate = new Date(createdAt);
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
        <Card>
            {loading ? (
                <div className="skeleton-wrapper">
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        width="50%"
                        height={180}
                    />
                    <div>
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            width={300}
                            height={30}
                        />
                        <div className="skeleton-para">
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                width={300}
                                height={15}
                                style={{ marginTop: 6 }}
                            />
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                width={300}
                                height={15}
                                style={{ marginTop: 6 }}
                            />
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                width={300}
                                height={15}
                                style={{ marginTop: 6 }}
                            />
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                width={300}
                                height={15}
                                style={{ marginTop: 6 }}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <Link to={"/posts/" + id}>
                    <div className="post-wrapper">
                        <img
                            className="img"
                            src={imagePath}
                            alt={Math.random().toString()}
                        />
                        <div className="content-wrapper">
                            <h2 className="hdng">{title.substring(0, 60)}</h2>
                            <p className="content">
                                {content.substring(0, 180)}....
                            </p>
                        </div>
                    </div>
                    <div className="post-info">
                        <span>Author - {author}</span>
                        <span>Posted on - {date}</span>
                    </div>
                </Link>
            )}
        </Card>
    );
};

export default Post;
