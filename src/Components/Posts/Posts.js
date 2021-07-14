import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post/Post";
import Modal from "../UI/Modal";
import "./Posts.css";

const Posts = (props) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const result = await axios.get("/");
                setPosts(result.data);
                setLoading(true);
                setLoading(false);
            } catch (err) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <>
            {error && (
                <Modal bgColor="#ffe1e0" color="red" timer={3000}>
                    Something went wrong
                </Modal>
            )}
            <div className="posts-container">
                {loading ? (
                    <>
                        <Post loading={loading} />
                        <Post loading={loading} />
                        <Post loading={loading} />
                        <Post loading={loading} />
                        <Post loading={loading} />
                        <Post loading={loading} />
                    </>
                ) : (
                    posts.map((post) => {
                        return (
                            <Post
                                key={post._id}
                                id={post._id}
                                title={post.title}
                                content={post.content}
                                imagePath={post.image.url}
                                author={post.author}
                                createdAt={post.createdAt}
                            />
                        );
                    })
                )}
            </div>
            {!loading && !posts.length > 0 && (
                <h2
                    style={{
                        textAlign: "center",
                        color: "#737373",
                        marginTop: "10%",
                        fontSize: 15,
                    }}
                >
                    No posts Found!
                </h2>
            )}
        </>
    );
};

export default Posts;
