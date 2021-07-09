import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import {LinearProgress} from "@material-ui/core";

import Navbar from "../Components/Navbar/Navbar";
import SinglePageRender from "../Components/SinglePage/SinglePageRender";

const SinglePage = (props) => {
    const params = useParams();
    const history = useHistory();
    const [singlePost, setSinglePost] = useState([]);
    const [loading, setLoading] = useState(true);

    const postId = params.postId;

    useEffect(() => {
        const fetchSinglePost = async () => {
            try {
                const result = await axios.get(`/posts/${postId}`);
                setSinglePost(result.data);
                setLoading(false);
            } catch (err) {
                history.goBack();
                setLoading(false);
            }
        };
        fetchSinglePost();
    }, [postId, history]);

    return (
        <>
        <Navbar />
        {loading ? <LinearProgress/>:
        <SinglePageRender
            title={singlePost.title}
            content={singlePost.content}
            imagePath={singlePost.image.url}
        />}
        </>
    );
};

export default SinglePage;
