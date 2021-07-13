import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Add } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import AdminPost from "../Components/AdminPost/AdminPost";
import Navbar from "../Components/Navbar/Navbar";
import { useBlogContext } from "../Context/Context";

const Admin = (props) => {
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useBlogContext();

    useEffect(() => {
        axios
            .get("/admin", { headers: { Authorization: "Bearer " + token } })
            .then((res) => {
                setUserPosts(res.data.posts);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [token]);

    const handleDelete = (id) => {
        const postId = {
            id: id
        }
        axios.post("/admin/delete-post", postId, {
            headers: {
                "Authorization": "Bearer "+ token
            }
        })
        .then((res) => {
           const posts= userPosts.filter(item => item._id !== id);
           setUserPosts(posts);
        })
        .catch(err => {
            console.log(err);
        })
    };

    return (
        <>
            <Navbar />
            <div className="admin-wrapper container">
                <div className="admin-header-wrapper">
                    <h2 className="admin-hdng">Your Posts</h2>
                    {userPosts.length > 0 && (
                        <Link to="/admin/edit-post">
                            <button className="new-post-btn">
                                <Add />
                            </button>
                        </Link>
                    )}
                </div>
                {!loading ? <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Published at</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                         {userPosts.map((post) => {
                            return (
                                <AdminPost
                                    key={post._id}
                                    id={post._id}
                                    title={post.title}
                                    content={post.content}
                                    createdAt={post.createdAt}
                                    author={post.author}
                                    onClick={handleDelete}
                                />
                            );
                        })}
                    </tbody>
                </table>: <div className="loading-admin"><CircularProgress/></div>}
                {!loading && !userPosts.length > 0 && (
                    <>
                        <h2
                            style={{
                                textAlign: "center",
                                color: "#737373",
                                marginTop: "2rem",
                            }}
                        >
                            No Post created!
                        </h2>
                        <Link to="/admin/edit-post" className="btn btn-new">
                            New Post
                        </Link>
                    </>
                )}
            </div>
        </>
    );
};

export default Admin;
