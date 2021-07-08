import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post/Post";
import "./Posts.css";

const Posts = (props) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const result = await axios.get("/");
                setPosts(result.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <>
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
                                imagePath={post.imagePath}
                                author={post.author}
                                createdAt={post.createdAt}
                            />
                        );
                    })
                )}
            </div>
            {!posts.length > 0 && (
                <h2
                    style={{
                        textAlign: "center",
                        color: "#737373",
                        marginTop: "10%",
                    }}
                >
                    No posts Found!
                </h2>
            )}
        </>
    );
};

export default Posts;
