import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

import SinglePageRender from "../Components/SinglePage/SinglePageRender";

const SinglePage = (props) => {
    const params = useParams();
    const history = useHistory();
    const [singlePost, setSinglePost] = useState([]);

    const postId = params.postId;

    useEffect(() => {
        const fetchSinglePost = async () => {
            try {
                const result = await axios.get(`/posts/${postId}`);
                result.data.imagePath = `https://mern-blog12.herokuapp.com/${result.data.imagePath}`;
                setSinglePost(result.data);
            } catch (err) {
                history.goBack();
            }
        };
        fetchSinglePost();
    }, [postId, history]);

    return (
        <SinglePageRender
            title={singlePost.title}
            content={singlePost.content}
            imagePath={singlePost.imagePath}
        />
    );
};

export default SinglePage;
